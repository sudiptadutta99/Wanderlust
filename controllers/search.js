const Listing = require('../models/listing');

// In controllers/search.js
module.exports.searchListings = async (req, res, next) => {
    try {
        const { query } = req.query;
        let results = [];
        if (query) {
            results = await Listing.find({
                title: { $regex: query, $options: 'i' } // Case-insensitive search for title
            });
        }
        const allListings = await Listing.find(); // Get all listings to handle no search results
        res.render('listings/index', { searchResults: results.length > 0 ? results : null, allListings });
    } catch (err) {
        next(err);
    }
};

