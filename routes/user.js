const express = require('express');
const router = express.Router();
const ExpressError = require('../expressError.js');
const passport = require("passport");
let user = require('../models/user.js');
const { saveRedirectUrl } = require('../middleware.js');
const userController = require("../controllers/user.js");


function asyncWrap(fn){
    return function(req,res,next){
    fn(req,res,next).catch((err) => next(err));
   };
};


router.route('/signup')
.get(asyncWrap( userController.signupform))
.post((userController.signedup));

router.route('/signin')
.get(asyncWrap(userController.signinform))
.post(saveRedirectUrl, passport.authenticate("local",{failureFlash: true, failureRedirect: "/signin" }), (userController.signedin));


router.get("/signout", ( userController.signouted));


module.exports = router;




















