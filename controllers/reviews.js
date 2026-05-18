const ExpressError = require('../expressError.js');
let listing = require('../models/listing.js');
let review = require('../models/review.js');


module.exports.revicreate = async (req,res,next)=>{
let{id} = req.params;
let newReviews = new review(req.body.review);
newReviews.author = req.user._id;
let result = await newReviews.save();
if(!result){
return next(new ExpressError(403,"error in mongodb can't add review"));
};
let resu = await listing.findByIdAndUpdate(id,{$push: {reviews: result}},{returnDocument:'after'});
if(!resu){
return next(new ExpressError(403,"error in mongodb can't add review"));
};
req.flash("success","New Review Added!");
res.redirect(`/listings/view/${id}`);
};