const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { listingSchema } = require("../schema.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(async (req, res) => {
      try {
        const newListing = new Listing({ ...req.body.listing, rentalType: req.body.listing.rentalType });
        await newListing.save();
        res.redirect(`/listings/${newListing._id}`);
      } catch (err) {
        console.error(err);
        res.redirect("/listings/new");
      }
    })
  );

// New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);

router
  .route("/:id")
  .get(wrapAsync(listingController.showListing)) // Show Route
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(async (req, res) => {
      try {
        const { id } = req.params;
        const listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing, rentalType: req.body.listing.rentalType }, { new: true });
        res.redirect(`/listings/${listing._id}`);
      } catch (err) {
        console.error(err);
        res.redirect(`/listings/${req.params.id}/edit`);
      }
    })
  )
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

// Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

module.exports = router;

