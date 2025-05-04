if(process.env.NODE_ENV != "production") {
    require('dotenv').config()
}


const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const mongoose = require('mongoose');
const Listing  = require("./models/listing.js")
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require('ejs-mate');
const wrapAsync = require("./utils/wrapAsync.js")
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema, reviewSchema } = require('./schema.js');
const Review = require("./models/review.js");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStratergy = require("passport-local");
const User = require("./models/user.js")

//Routes
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const bookingRoutes = require("./routes/bookings");



const dbUrl = process.env.ATLASDB_URL;

main()
    .then( () => {
        console.log("connection successful");
    })
    .catch ((err) => {
        console.log(err);
});
async function main() {
  await mongoose.connect(dbUrl);
}

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

//mongosession store
const store = MongoStore.create ({
    mongoUrl: dbUrl,
    crypto: {
        secret: process.env.SECRET,
        
    },
    touchAfter: 24* 3600,
});

//error
store.on("error", ()=> {
    console.log("error in mongo session store", err);
})
//session options
const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 *24 * 60 * 60 * 1000,
        maxAge: 7 *24 * 60 * 60 * 1000,
        httpOnly: true
    }
};

app.get("/", (req, res) => {
    res.redirect("/listings"); // or render a homepage: res.render("home");
  });
  


//root path
// app.get("/", (req,res) => {
//     res.send("root");
// });

app.use(session(sessionOptions));
app.use(flash());

//pa
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStratergy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
})

//policy routes
const policyRoutes = require('./routes/policies');
app.use('/', policyRoutes);

//lsitings route
app.use("/listings", listingRouter);
//review route
app.use("/listings/:id/reviews", reviewRouter);
//user Route
app.use("/", userRouter)
//payment routes
app.use("/bookings", bookingRoutes);



//a standard response for other routes
app.all("*", (req, res, next)=> {
    next(new ExpressError(404, "Page not found "));
});

//middleware for custom error handling
app.use((err, req, res,next) => {
    const { statusCode = 500, message = "Something went wrong", stack: trace } = err;
    //using error.ejs for the all types of error handling
    res.status(statusCode).render("error.ejs", { err: { message } });
    // res.status(statusCode).send(message);
})


app.listen(8080, () => {
    console.log("server is listening to port 8080");
});