//contains all the middlewares
const Listing = require("./models/listing");
const Review = require("./models/review.js");
const { listingSchema, reviewSchema } = require("./schema.js");
const ExpressError = require("./utils/ExpressError");

module.exports.isLoggedIn = (req, res, next) =>{
    //checking is user is logged in
    if(!req.isAuthenticated()) {
        //redirect url
        req.session.redirectUrl = req.originalUrl;
        
        req.flash("error", "You must be Logged into create listing")
        return res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectUrl = (req, res, next) => {
    if(req.session.redirectUrl) {
        res.locals.redirectUrl= req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner = async(req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id)

    if(!listing.owner.equals(res.locals.currUser._id)) {
        req.flash("error", "You are not the owner of this listing")
        return res.redirect(`/listings/${id}`);
    }
    next();
}

//validate for schema (middleware) function
module.exports.validateListing = (req, res, next) => {
    
    let {error} = listingSchema.validate(req.body);
    if(error) {
        //to find all the details from the error obejct
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else{
        next();
    }
}

//validate for reviewschema (middleware) function
module.exports.validateReview = (req, res, next) => {
    
    let {error} = reviewSchema.validate(req.body);
    if(error) {
        //to find all the details from the error obejct
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else{
        next();
    }
}

module.exports.isReviewAuthor = async(req, res, next) => {
    let { id, reviewId } = req.params;
    let review = await Review.findById(reviewId)

    if(!review.author.equals(res.locals.currUser._id)) {
        req.flash("error", "You are not the author of this review")
        return res.redirect(`/listings/${id}`);
    }
    next();
}