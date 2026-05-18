const express = require('express');
const router = express.Router({mergeParams: true});
const ExpressError = require('../expressError.js');
const{listingSchema, reviewSchema} = require('../schema.js');
let review = require('../models/review.js');
let listing = require('../models/listing.js');
const{isLoggedIn,validateReview} = require("../middleware.js");
const reviewController = require("../controllers/reviews.js");



function asyncWrap(fn){
   return function(req,res,next){
   fn(req,res,next).catch((err) => next(err));
   };
};

router.post('/:id',isLoggedIn, validateReview, asyncWrap(reviewController.revicreate));

 
module.exports = router;


 





















