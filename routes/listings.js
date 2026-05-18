const express = require('express');
const router = express.Router();
const ExpressError = require('../expressError.js');
const{listingSchema, reviewSchema} = require('../schema.js');
let listing = require('../models/listing.js');
let review = require('../models/review.js');
const{isLoggedIn,isOwner,validateListing,isReviewOwner} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer');
const{storage} = require("../cloudConfig.js");
const upload = multer({ storage });


function asyncWrap(fn){
return function(req,res,next){
fn(req,res,next).catch((err) => next(err));
};
};


router.get('/',asyncWrap(listingController.index));

router.get('/new',isLoggedIn, asyncWrap(listingController.liscreform));

router.post('/create', isLoggedIn, validateListing, upload.single('listing[image]'),asyncWrap( listingController.liscreated));

router.get('/view/:id',asyncWrap( listingController.lisview));

router.route('/edit/:id')
.get(isLoggedIn,isOwner, asyncWrap( listingController.liseditform))
.patch(isLoggedIn,isOwner, validateListing, asyncWrap( listingController.lisupdated));


router.delete('/delete/:id',isLoggedIn,isOwner, asyncWrap( listingController.lisdeleted)); 

router.get('/delete/:idL/review/:idR',isLoggedIn,isReviewOwner, asyncWrap( listingController.reviewdeleted)); 

 
module.exports = router;












 







