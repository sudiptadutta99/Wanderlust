

    if (overlapping) {
        req.flash("error", "This listing is already booked for the selected dates.");
        return res.redirect(`/listings/${listingId}`);
    }

    const nights =
        (checkoutDate.getTime() - checkinDate.getTime()) / (1000 * 60 * 60 * 24);

        if (nights > 28) {
            req.flash("error", "Cannot book for more than 28 nights.");
            return res.redirect(`/listings/${listingId}`);
        }
        

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
    } else if (paymentMethod === "crypto") {
        const axios = require('axios');
        const response = await axios.post(
            'https://api.nowpayments.io/v1/invoice',
            {
                price_amount: totalPrice,
                price_currency: 'inr',
                pay_currency: 'eth',
                order_description: 'Payment for Wanderbnb Booking',
            },
            {
                headers: {
                    'x-api-key': process.env.NOWPAYMENTS_API_KEY,
                    'Content-Type': 'application/json',
                }
            }
        );
    
        const paymentUrl = response.data.invoice_url;
        res.redirect(paymentUrl);
    }
    else {
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


//cancel boooking
module.exports.cancelBooking = async (req, res) => {
    const { id } = req.params;
    const booking = await Booking.findById(id);
  
    if (!booking) {
      req.flash("error", "Booking not found.");
      return res.redirect("/bookings");
    }
  
    if (!booking.user.equals(req.user._id)) {
      req.flash("error", "Unauthorized cancellation.");
      return res.redirect("/bookings");
    }
  
    booking.status = 'cancelled';
    await booking.save();
  
    if (booking.paymentMethod === "upi" || booking.paymentMethod === "crypto") {
      req.flash("success", "Booking cancelled. Refund will be initiated within 7-8 business days.");
    } else {
      req.flash("success", "Booking cancelled successfully.");
    }
  
    res.redirect("/bookings");
  };
  
