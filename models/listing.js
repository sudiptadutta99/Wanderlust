const mongoose  = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
    title: {
       type: String,
       required: true 
    },
    description: String,
    image: {
       url: String,
       filename: String
    },
    location: String,
    country: String,
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    price: Number, // Base price (for reference)

    // New Rental Options Field
    rentalOptions: {
        type: [
            {
                type: String,
                enum: ["hourly", "daily", "weekly", "subscription"], 
                required: true
            }
        ],
        default: ["daily"] // Default rental type is daily
    },
    rentalPrices: {
        hourly: { type: Number, default: null },
        daily: { type: Number, default: null },
        weekly: { type: Number, default: null },
        subscription: { type: Number, default: null }
    },

    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        },
    ],
});

// Middleware to delete associated reviews when a listing is deleted
listingSchema.post("findOneAndDelete", async(listing) => {
    if(listing) {
        await Review.deleteMany({_id: {$in: listing.reviews}});
    }
});

const Listing  = mongoose.model("Listing", listingSchema);
module.exports = Listing;

