const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middleware");
const bookingController = require("../controllers/bookings");
const Booking = require("../models/booking");

router.post("/create", isLoggedIn, bookingController.createBooking);

router.get("/:id/confirmation", isLoggedIn, bookingController.bookingConfirmation);

// Show all bookings for the logged-in user
router.get("/", isLoggedIn, bookingController.getAllBookings);

router.put("/:id", isLoggedIn, bookingController.cancelBooking);

module.exports = router;
