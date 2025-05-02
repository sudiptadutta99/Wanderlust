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
├── app.js                      # Main Express app
├── .env                        # Environment variables
├── package.json               # NPM dependencies and scripts
├── schema.js                  # Joi validation schemas
├── middleware.js              # Custom middleware (auth, validation, etc.)
├── cloudConfig.js             # Cloudinary configuration
├── utils/
│   ├── ExpressError.js        # Custom error class
│   ├── catchAsync.js          # Async error wrapper
│   └── wrapAsync.js           # Middleware wrapper
├── controllers/
│   ├── listings.js            # Listing logic
│   └── payment.js             # Crypto/Stripe payment logic
├── models/
│   ├── listing.js             # Mongoose schema for listings
│   ├── review.js              # Mongoose schema for reviews
│   └── user.js                # Mongoose schema for users
├── routes/
│   ├── listing.js             # Listings routes
│   ├── review.js              # Review routes
│   ├── user.js                # Auth routes
│   └── payment.js             # Crypto payment route
├── views/
│   ├── includes/
│   │   ├── navbar.ejs
│   │   └── footer.ejs
│   ├── listings/
│   │   ├── index.ejs
│   │   ├── new.ejs
│   │   ├── edit.ejs
│   │   └── show.ejs
│   ├── reviews/
│   │   └── reviewForm.ejs
│   └── users/
│       ├── login.ejs
│       └── register.ejs
├── public/
│   ├── css/
│   │   ├── style.css
│   │   ├── showListing.css
│   │   └── footer.css
│   └── js/
│       ├── map.js
│       └── script.js
├── README.md
├── README_COMPREHENSIVE.md
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
