const mongoose  = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js")

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
    price: Number,
    location: String,
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        },
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    geometry: {
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true
          },
          coordinates: {
            type: [Number],
            required: true
          }
    },
    category: {
        type: String,
        enum: ["Beds", "Cities", "Mountains", "Castles", 
            "Pools", "Camps", "Farms", "Arctic", "Domes", "Boats", "Cabins", 
            "Lakes", "Hotels", "Beaches", "Apartments"],

        required: true, // Ensure this is set if you want to make it mandatory
    }
      

      
});

//post mongoose middle ware for deleteing listing from db
listingSchema.post("findOneAndDelete", async(listing) => {
    if(listing) {
        await Review.deleteMany({_id: {$in: listing.reviews}});
    }
})

const Listing  = mongoose.model("Listing", listingSchema);
module.exports = Listing;
