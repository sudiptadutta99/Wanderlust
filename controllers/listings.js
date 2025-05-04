const Listing = require("../models/listing");
const mbxGeocoding= require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

//controller for listings
module.exports.index = async (req, res) => {
    const { search, category } = req.query;
    let filter = {};

    if (search) {
        filter.$or = [
            { title: new RegExp(search, "i") },
            { location: new RegExp(search, "i") }
        ];
    }

    if (category) {
        filter.category = category;
    }

    const allListings = await Listing.find(filter);
    res.render("listings/index", { allListings, selectedCategory: category });
};



module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
}

//show route 
module.exports.showListing = async(req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
        .populate({
            path: "reviews",
            populate: {
                path: "author",
            },
        })
        .populate({
            path: "owner",
            select: "username email"
        });

    if (!listing) {
        req.flash("error", "Listing you requested does not exist");
        return res.redirect("/listings");
    }

    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD format

    res.render("listings/show.ejs", { listing, today }); // Pass `today` to the view
}


//post
module.exports.createListing = async (req, res, next) => {

    //  // 🟨 Log the incoming data
    //  console.log(req.body.listing);

    let response = await geocodingClient
        .forwardGeocode({
            query: req.body.listing.location,
            limit: 1,
        })
        .send();

    let url = req.file.path;
    let filename = req.file.filename;

    // Create the new listing and include category
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url, filename };
    newListing.geometry = response.body.features[0].geometry;

    try {
        let savedListing = await newListing.save();
        req.flash("success", "New listing created");
        res.redirect("/listings");
    } catch (err) {
        next(err);
    }
};


//edit
module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    //if our listing was deleted or do not exits currently
    if(!listing) {
        req.flash("error", "Listing you requested does not exist");
        res.redirect(("/listings"))
    }
    let originalImageUrl = listing.image.url;
    originalImageUrl= originalImageUrl.replace("/upload", "/upload/w_250");
    res.render("listings/edit.ejs", { listing, originalImageUrl });
}

//update listing
module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

    if(typeof req.file !== 'undefined') {
        let url = req.file.path;
        let filename  = req.file.filename;
        listing.image = {url, filename};
        await listing.save();
    }
    req.flash("success", "Listing updated");
    res.redirect(`/listings/${id}`);
}

//delete listing
module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "listing deleted");
    res.redirect("/listings");
}