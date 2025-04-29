const axios = require('axios');
require('dotenv').config();

const apiKey = process.env.NOWPAYMENTS_API_KEY;

module.exports.createPayment = async (req, res) => {
    const { amount } = req.body;  // User will send the amount to pay (e.g., 200 USD)

    try {
        const response = await axios.post('https://api.nowpayments.io/v1/invoice', {
            price_amount: amount,
            price_currency: 'inr',
            pay_currency: 'eth',
            order_description: 'Payment for wanderlust Booking'
        }, {
            headers: {
                'x-api-key': apiKey,
                'Content-Type': 'application/json'
            }
        });

        const paymentUrl = response.data.invoice_url;
        res.redirect(paymentUrl);

    } catch (error) {
        console.error('Error creating payment:', error.response.data);
        res.status(500).send('Payment creation failed.');
    }
};
