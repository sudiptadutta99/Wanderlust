const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    listing: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Listing",
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    checkin: {
        type: Date,
        required: true,
    },
    checkout: {
        type: Date,
        required: true,
    },
    guests: {
        type: Number,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    paymentMethod: {
        type: String,
        enum: ['cash', 'upi', 'card', 'crypto'],  
        required: true
      },
    
    paymentStatus: {
        type: String,
        enum: ["pending", "initiated", "paid", "failed"],
        default: "pending",
    },
    bookingId: {
        type: String,
        required: true,
        unique: true,
    },
    status: {
        type: String,
        enum: ['confirmed', 'cancelled'],
        default: 'confirmed',
      }
      
});

module.exports = mongoose.model("Booking", bookingSchema);
