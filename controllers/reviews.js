//controller for reviews

const Listing = require("../models/listing");
const Review = require("../models/review");

//create review route
module.exports.createReview = async(req, res)  => {
    let listing = await Listing.findById(req.params.id)
    let newReview = new Review(req.body.review);
    //author
    newReview.author = req.user._id;
    //pushing newreview in our review array
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();

    req.flash("success", "new review created");

    // console.log("new review saved");
    // res.send("new review saved");
    
    //redirect
    res.redirect(`/listings/${listing._id}`);
}

//delete review 
module.exports.destroyReview = async(req, res) => {
    let {id, reviewId}= req.params;
    //also delte in listings array by using mongo pull operator
    await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}})

    await Review.findByIdAndDelete(reviewId)

    req.flash("success", "review deleted");

    res.redirect(`/listings/${id}`)
}