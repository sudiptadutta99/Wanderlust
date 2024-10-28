const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controllers/users.js")

router.route("/signup")
    //sign up - GET
    .get(userController.renderSignupFrom)
    //POST
    .post( wrapAsync(userController.signup))


router.route("/login")
    //login
    .get( userController.renderLoginForm)

    //login back 
    .post(
        saveRedirectUrl,
        passport.authenticate('local', { 
            failureRedirect: '/login', 
            failureFlash: true,
        }),
        userController.login
    )


//logout 
router.get("/logout", userController.logout)


module.exports = router;