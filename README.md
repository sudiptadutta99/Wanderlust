# Wanderlust 🌍

**LIVE AT**: [WanderLust](https://wanderlust-soyx.onrender.com/listings)

## Project Overview

Wanderlust is a full-stack booking platform allowing users to explore global listings, book stays, post reviews, and pay securely using **crypto**, **UPI (Razorpay)**, or **cash**. It features interactive maps, robust validation, and responsive design for seamless travel planning.

---

## 🚀 Features

### 🔐 User Authentication & Authorization
- Secure login/signup via Passport.js (Local Strategy)
- MongoDB-backed session management
- Logged-in users can manage bookings, listings, and reviews

### 🏠 Listings Management
- Browse, filter, and search all accommodations
- Add, edit, delete listings with title, images, price, location
- Category filter with 15 themed icons
- Integrated **Mapbox** for location tagging and suggestions

### 📅 Bookings System
- Users can book listings with selected check-in/check-out dates
- Booking confirmation page with details
- View all personal bookings on **My Bookings** page

### 💳 Unified Payment Integration
- Select between **Cash**, **UPI**, or **Crypto** on checkout
- UPI payments processed securely via **Razorpay**
- Crypto payments handled using **NOWPayments API**

### 📝 Reviews System
- Add, edit, or delete reviews with rating & comment
- Reviews visible on each listing’s detail page

### 🧾 Validation & Error Handling
- Joi used for backend validation of forms
- Centralized custom error handling via Express middleware

### 🌐 Responsive UI
- Clean layout using **EJS**, **Bootstrap 5**, and custom CSS
- Fully responsive on mobile and desktop devices

---

## 🛠️ Tech Stack

**Frontend:**
- HTML, CSS, JavaScript
- Bootstrap 5, EJS Templating

**Backend:**
- Node.js, Express.js
- MongoDB, Mongoose
- Cloudinary (image hosting)
- Mapbox API (location services)
- Razorpay (UPI payments)
- NOWPayments API (crypto payments)

**Authentication:**
- Passport.js (Local Strategy)
- connect-mongo for session storage

**Validation:**
- Joi for form & data schema validation

---

## 📁 Project Structure

```

majorproject/
├── app.js                      # Main Express app
├── cloudConfig.js             # Cloudinary configuration
├── middleware.js              # Auth, validation, error middleware
├── schema.js                  # Joi schemas
├── package.json               # Project metadata & dependencies
├── README.md                  # Main project README
├── README\_COMPREHENSIVE.md    # Extended documentation
├── init/                      # Seed data & init scripts
│   ├── data.js
│   └── index.js
├── controllers/               # Route logic
│   ├── bookings.js
│   ├── listings.js
│   ├── payment.js
│   ├── reviews.js
│   └── users.js
├── models/                    # Mongoose schemas
│   ├── booking.js
│   ├── listing.js
│   ├── review\.js
│   └── user.js
├── routes/                    # Express routes
│   ├── bookings.js
│   ├── listing.js
│   ├── payment.js
│   ├── policies.js
│   ├── review\.js
│   └── user.js
├── utils/
│   ├── ExpressError.js
│   └── wrapAsync.js
├── public/                    # Static assets
│   ├── css/
│   │   ├── footer.css
│   │   ├── rating.css
│   │   ├── showListing.css
│   │   └── style.css
│   └── js/
│       ├── map.js
│       └── script.js
└── views/                     # EJS templates
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
    │   ├── new\.ejs
    │   └── show\.ejs
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

````

---

## 🔧 Installation and Setup

1. **Clone the repo**
```bash
git clone https://github.com/sudiptadutta99/Wanderlust.git
cd wanderlust
````

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**

Create a `.env` file in the root directory with:

```
MAP_TOKEN=your_mapbox_token
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_KEY=your_api_key
CLOUDINARY_SECRET=your_api_secret
NOWPAYMENTS_API_KEY=your_nowpayments_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
ATLASDB_URL=your_mongodb_url
SECRET=your_cookie_secret
NODE_ENV=development
```

4. **Run the app**

```bash
nodemon app.js
```

Visit: [http://localhost:8080/listings](http://localhost:8080/listings)

---

## ✅ Usage Guide

* Browse all listings at `/listings`
* Use filters or map to find accommodations
* Click a listing to book — choose Cash, UPI, or Crypto
* View all your bookings at `/bookings`
* Leave reviews for listings you stayed at

---

## 🧪 Testing

* Manual testing of major flows (auth, bookings, payments)
* Backend validation via Joi
* Payment success/failure simulation using Razorpay test mode

---

## ✨ Future Improvements

* Wishlist & favorites feature
* Admin dashboard for user/listing moderation
* Email OTP verification and password reset
* Booking cancellation & refund workflows
* Unit testing for routes & models

---

## 🧑‍💻 Developer

Made with ❤️ by [Sudipta Dutta](https://github.com/sudiptadutta99)

---

## 📜 License

MIT License – see `LICENSE` for full details.

```

---

Would you like a matching update for `README_COMPREHENSIVE.md` as well?
```
