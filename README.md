# Wanderlust 🌍

**LIVE AT**: [WanderLust](https://wanderlust-soyx.onrender.com/listings)

## Project Overview

Wanderlust is a comprehensive web-based platform designed to facilitate the exploration, review, and booking of accommodations worldwide. It offers users an intuitive interface to discover listings, read and write reviews, and securely pay for bookings using cryptocurrency. The platform integrates advanced location-based services to enhance the user experience.

---

## 🚀 Features

### 🔐 User Authentication & Authorization

* Secure login and registration using Passport.js
* Session management backed by MongoDB
* Users can log in, register, and manage their listings and reviews securely

### 🔍 Listings Management

* Browse all listings with filters and search
* Create, edit, and delete accommodations
* Each listing includes title, description, price, images, category, and geolocation
* Category filter UI includes **15 red-highlighted icons**

### 🌍 Map Integration

* Listings displayed on interactive map
* Powered by **Mapbox API** for geolocation and search suggestions

### 💳 Cryptocurrency Payments

* Integrated with **NOWPayments API** for crypto transactions
* Users can book listings and pay using cryptocurrencies like BTC, ETH, etc.

### 📝 Reviews System

* Logged-in users can add reviews (rating + comment)
* Reviews are editable and deletable by the review author

### 🧾 Validation & Error Handling

* Robust form validation using **Joi**
* Clean error messaging and fallbacks via custom Express error handler

### 📱 Responsive UI

* Clean layout built with **EJS**, **Bootstrap 5**, and custom **CSS**
* Optimized for mobile and desktop

---

## 🛠️ Tech Stack

**Frontend:**

* HTML, CSS, JavaScript
* Bootstrap 5, EJS Templating

**Backend:**

* Node.js, Express.js
* MongoDB, Mongoose
* Cloudinary (image uploads)
* Mapbox API (location search and maps)
* NOWPayments API (crypto payment processing)

**Authentication:**

* Passport.js (Local Strategy)
* MongoDB-based sessions using connect-mongo

**Validation:**

* Joi for form and schema validation

---

## 📁 Project Structure

```
wanderlust/
├── app.js                          # Main application entry point
├── cloudConfig.js                 # Cloud configuration (e.g., Cloudinary)
├── middleware.js                 # Custom middleware
├── package.json                  # Project metadata and dependencies
├── package-lock.json             # Dependency lock file
├── README.md                     # Project documentation
├── README_COMPREHENSIVE.md       # Extended project documentation
├── schema.js                    # Joi validation schemas
├── init/                        # Initialization scripts
│   ├── data.js
│   └── index.js
├── controllers/                 # Route controllers
│   ├── bookings.js
│   ├── listings.js
│   ├── reviews.js
│   └── users.js
├── models/                      # Mongoose models
│   ├── booking.js
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── routes/                      # Express route definitions
│   ├── bookings.js
│   ├── listing.js
│   ├── policies.js
│   ├── review.js
│   └── user.js
├── utils/                       # Utility modules
│   ├── ExpressError.js
│   └── wrapAsync.js
├── public/                      # Public static assets
│   ├── css/
│   │   ├── footer.css
│   │   ├── rating.css
│   │   ├── showListing.css
│   │   └── style.css
│   └── js/
│       ├── map.js
│       └── script.js
└── views/                       # EJS view templates
    ├── bookings/
    │   ├── confirmation.ejs
    │   └── index.ejs
    ├── error.ejs
    ├── includes/
    │   ├── flash.ejs
    │   ├── footer.ejs
    │   └── navbar.ejs
    ├── layouts/
    │   └── boilerplate.ejs
    ├── listings/
    │   ├── edit.ejs
    │   ├── index.ejs
    │   ├── new.ejs
    │   └── show.ejs
    ├── payments/
    │   └── razorpay.ejs
    ├── policies/
    │   ├── contactUs.ejs
    │   ├── privacyPolicy.ejs
    │   ├── refundPolicy.ejs
    │   ├── shippingPolicy.ejs
    │   └── termsAndConditions.ejs
    └── users/
        ├── login.ejs
        └── signup.ejs

```

---

## 🔧 Installation and Setup

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/wanderlust.git
cd wanderlust
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**
   Create a `.env` file in the root directory with:

```env
MAP_TOKEN=your_mapbox_token
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_KEY=your_api_key
CLOUDINARY_SECRET=your_api_secret
NOWPAYMENTS_API_KEY=your_nowpayments_key
STRIPE_SECRET_KEY=your_stripe_key
ATLASDB_URL=your_mongodb_url
SECRET=your_cookie_secret
NODE_ENV=development
```

4. **Run the application locally**

```bash
nodemon app.js
```

Visit: `http://localhost:8080/listings`

---

## 📦 Deployment

* Deployed on **Render** using manual GitHub deployment
* Push updates to the `main` branch and trigger redeployment on Render dashboard

---

## ✅ Usage Guide

* Visit `/listings` to view all listings
* Use the category filter to explore 15 themed listing types
* Log in to create, edit, delete listings and leave reviews
* Use the map to explore nearby stays
* Pay securely with crypto through the listing page

---

## 🧪 Testing

* Manual testing of key user flows (CRUD, payment, auth, review)
* Form validation using Joi
* Map coordinates and search tested using Mapbox

---

## ✨ Future Improvements

* Wishlist or favorites feature
* Admin dashboard for listing/user moderation
* Email verification and password reset
* Mobile UI enhancements and accessibility improvements

---

## 🧑‍💻 Developer

* Built by [Sudipta Dutta](https://github.com/sudiptadutta99)

Feel free to reach out for collaboration or questions!

---

## 📜 License

This project is licensed under the MIT License. See the LICENSE file for details.
