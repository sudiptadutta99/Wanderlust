const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  listing: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Listing",
  },
  checkin: Date,
  checkout: Date,
  guests: Number,
  totalPrice: Number,
  paymentMethod: String, // "cash" or "upi"
  paymentStatus: {
    type: String,
    default: "pending", // "pending", "paid"
  },
  bookingId: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Booking", bookingSchema);
