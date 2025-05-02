# Wanderlust 🌍

**LIVE AT**: [WanderLust](https://wanderlust-soyx.onrender.com/listings)

## Project Overview

Wanderlust is a comprehensive web-based platform designed to facilitate the exploration, review, and booking of accommodations worldwide. It offers users an intuitive interface to discover listings, read and write reviews, and securely pay for bookings using cryptocurrency. The platform integrates advanced location-based services to enhance the user experience.

## Features

- **User Authentication & Authorization**  
  Secure login and registration using Passport.js with session management backed by MongoDB. Users can create accounts, log in, and manage their sessions securely.

- **Listings Management**  
  Users can browse, create, edit, and delete accommodation listings. Each listing includes detailed information such as location, description, and images.

- **Review System**  
  Authenticated users can add reviews to listings, providing ratings and comments to help other users make informed decisions.

- **Payment Integration**  
  Supports cryptocurrency payments through the NOWPayments API, enabling users to pay for bookings securely and conveniently.

- **Map Integration**  
  Utilizes Mapbox API to display listings on an interactive map, allowing users to explore accommodations based on geographic location.

- **Robust Error Handling**  
  Custom error classes and middleware provide meaningful feedback and maintain application stability.

- **Responsive UI**  
  Built with EJS templating and styled with CSS to provide a clean, responsive, and user-friendly interface.

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript, EJS templating  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB with Mongoose ODM  
- **Authentication:** Passport.js (Local Strategy)  
- **Payment API:** NOWPayments API  
- **Map API:** Mapbox API  
- **Session Management:** MongoDB session storage via connect-mongo

## Project Structure

```
MAJORPROJECT/
├── app.js                      # Main application entry point and setup
├── README.md                   # Original project README
├── README_COMPREHENSIVE.md     # This detailed README file
├── controllers/                # Business logic for listings, payments, reviews, users
│   ├── listings.js
│   ├── payment.js
│   ├── reviews.js
│   └── users.js
├── init/                      # Initialization scripts and data
│   ├── data.js
│   └── index.js
├── middleware.js              # Custom middleware (if any)
├── models/                    # Mongoose schemas for data models
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── package.json               # Project dependencies and scripts
├── package-lock.json
├── public/                    # Static assets (CSS, JS, images)
│   ├── css/
│   │   ├── footer.css
│   │   ├── rating.css
│   │   ├── showListing.css
│   │   └── style.css
│   └── js/
│       ├── map.js
│       └── script.js
├── routes/                    # Express route definitions
│   ├── listing.js
│   ├── payment.js
│   ├── review.js
│   └── user.js
├── schema.js                  # Joi validation schemas
├── utils/                     # Utility modules
│   ├── ExpressError.js        # Custom error class
│   └── wrapAsync.js           # Async wrapper for route handlers
└── views/                     # EJS templates for UI rendering
    ├── error.ejs
    ├── includes/              # Partial views like navbar, footer, flash messages
    │   ├── flash.ejs
    │   ├── footer.ejs
    │   └── navbar.ejs
    ├── layouts/               # Layout templates
    │   └── boilerplate.ejs
    ├── listings/              # Listing related views
    │   ├── edit.ejs
    │   ├── index.ejs
    │   ├── new.ejs
    │   └── show.ejs
    └── users/                 # User related views
        ├── login.ejs
        └── signup.ejs
```

## Installation and Setup

1. **Clone the repository**

```bash
git clone <repository-url>
cd MAJORPROJECT
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory with the following variables:

```
ATLASDB_URL=<Your MongoDB connection string>
SECRET=<Your session secret>
NOWPAYMENTS_API_KEY=<Your NOWPayments API key>
NODE_ENV=development
```

4. **Run the application**

```bash
node app.js
```

The server will start on port 8080. Access the app at `http://localhost:8080/listings`.

## Usage

- Browse listings at `/listings`
- Register and login to create listings and add reviews
- Use the payment feature to pay for bookings via cryptocurrency
- Explore listings on the map integrated with Mapbox

## Contributing

Contributions are welcome! Feel free to fork the repository, submit issues, or create pull requests.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Developed by

[Sudipta dutta](https://github.com/sudiptadutta99)

Feel free to reach out for any queries or collaboration opportunities!
