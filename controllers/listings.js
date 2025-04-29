const Listing = require("../models/listing");
const mbxGeocoding= require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

//controller for listings
module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index", { allListings });
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
            populate : {
                path: "author",
            },
        })
        .populate({
            path: "owner",
            select: "username email"
        });

    if(!listing) {
        req.flash("error", "Listing you requested does not exist");
        return res.redirect("/listings");
    }

    res.render("listings/show.ejs", { listing });
}

//post
module.exports.createListing = async (req, res, next) => {
    let response  = await geocodingClient
        .forwardGeocode({
            query: req.body.listing.location,
            limit: 1,
        })
        .send()
        

    let url = req.file.path;
    let filename  = req.file.filename;

    // Removed the unnecessary commented code for clarity
    const newListing = new Listing(req.body.listing);
    //adding owner to new Listing
    newListing.owner = req.user._id;
    newListing.image = {url, filename};
    newListing.geometry = response.body.features[0].geometry;

    let savedListing = await newListing.save();
    req.flash("success", "new listing Created");
    res.redirect("/listings");
}

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