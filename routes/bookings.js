const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
const Booking = require("../models/booking");
const Listing = require("../models/listing");
const { isLoggedIn } = require("../middleware");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

router.post("/create", isLoggedIn, async (req, res) => {
  const { listingId, checkin, checkout, guests, paymentMethod } = req.body;
  const listing = await Listing.findById(listingId);
  const nights = 5; // you can calculate this using checkout - checkin
  const totalPrice = listing.price * nights;
  const bookingId = `BOOK-${Math.floor(100000 + Math.random() * 900000)}`;

  const newBooking = new Booking({
    user: req.user._id,
    listing: listingId,
    checkin,
    checkout,
    guests,
    totalPrice,
    paymentMethod,
    paymentStatus: paymentMethod === "cash" ? "pending" : "initiated",
    bookingId,
  });

  await newBooking.save();

  if (paymentMethod === "upi") {
    const payment = await razorpay.orders.create({
      amount: totalPrice * 100, // in paise
      currency: "INR",
      receipt: bookingId,
    });

    res.render("payments/razorpay", {
      key_id: process.env.RAZORPAY_KEY_ID,
      amount: totalPrice,
      order_id: payment.id,
      bookingId: newBooking._id,
    });
  } else {
    res.redirect(`/bookings/${newBooking._id}/confirmation`);
  }
});

router.get("/:id/confirmation", isLoggedIn, async (req, res) => {
  const booking = await Booking.findById(req.params.id).populate("listing");
  res.render("bookings/confirmation", { booking });
});

module.exports = router;
