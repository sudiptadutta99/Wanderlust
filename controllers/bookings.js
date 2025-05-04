const Booking = require("../models/booking");
const Listing = require("../models/listing");
const Razorpay = require("razorpay");

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

module.exports.createBooking = async (req, res) => {
    const { listingId, checkin, checkout, guests, paymentMethod } = req.body;
    const listing = await Listing.findById(listingId);

    const checkinDate = new Date(checkin);
    const checkoutDate = new Date(checkout);

    if (checkoutDate <= checkinDate) {
        req.flash("error", "Checkout must be after check-in.");
        return res.redirect(`/listings/${listingId}`);
    }

    // ❗ Prevent double bookings
    const overlapping = await Booking.findOne({
        listing: listingId,
        $or: [
            {
                checkin: { $lt: checkoutDate },
                checkout: { $gt: checkinDate }
            }
        ]
    });

    if (overlapping) {
        req.flash("error", "This listing is already booked for the selected dates.");
        return res.redirect(`/listings/${listingId}`);
    }

    const nights =
        (checkoutDate.getTime() - checkinDate.getTime()) / (1000 * 60 * 60 * 24);

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
        paymentStatus: "pending",
        bookingId,
    });

    await newBooking.save();

    if (paymentMethod === "upi") {
        const payment = await razorpay.orders.create({
            amount: totalPrice * 100,
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
};

module.exports.bookingConfirmation = async (req, res) => {
    const booking = await Booking.findById(req.params.id).populate("listing");
    res.render("bookings/confirmation", { booking });
};

module.exports.getAllBookings = async (req, res) => {
    const bookings = await Booking.find({ user: req.user._id }).populate("listing");
    res.render("bookings/index", { bookings });
};
