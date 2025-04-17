module.exports.createListing = async (req, res, next) => {
    // Geocoding the location to get latitude and longitude
    let response  = await geocodingClient
        .forwardGeocode({
            query: req.body.listing.location,
            limit: 1,
        })
        .send()

    let url = req.file.path;
    let filename  = req.file.filename;

    // Creating a new listing with the data from the form
    const newListing = new Listing(req.body.listing);
    
    // Adding the owner (logged-in user) to the new listing
    newListing.owner = req.user._id;
    newListing.image = { url, filename };
    newListing.geometry = response.body.features[0].geometry;

    // Add rentalType and pricePerUnit from the form data
    newListing.rentalType = req.body.listing.rentalType; // rental type (e.g., hourly, daily, etc.)
    newListing.pricePerUnit = req.body.listing.pricePerUnit; // price for the rental type

    // Save the new listing to the database
    let savedListing = await newListing.save();

    // Flash success message and redirect to the listings page
    req.flash("success", "New listing created");
    res.redirect("/listings");
}
