let listing = require('./models/listing.js');
const ExpressError = require('./expressError.js');
const{listingSchema, reviewSchema} = require('./schema.js');
let review = require('./models/review.js');
 
module.exports.isLoggedIn = (req,res,next) => {
     if(!req.isAuthenticated()){
       req.session.redirect = req.originalUrl;
       req.flash("error","you must be logged in to create listing!"); 
       return res.redirect("/signin");
    }
    next();
};

module.exports.saveRedirectUrl = (req,res,next) => {
    if(req.session.redirect){
    res.locals.redirectUrl = req.session.redirect;
    }
    next();
};

module.exports.isOwner = async(req,res,next) => {
    let{id} = req.params;
    let getlisting = await listing.findById(id);
    if(!(res.locals.currUser && getlisting.owner.equals( res.locals.currUser._id))){
    req.flash("error","you are not the owner of this listing");
    return res.redirect(`/listings/view/${id}`);
    } 
    next();
};   

module.exports.validateListing = (req,res,next)=>{
let {error} = listingSchema.validate(req.body);
if(error){
let errMsg = error.details.map((el) => el.message).join(",");   
return next(new ExpressError(405,errMsg));
}else{
next();
}};

 

module.exports.validateReview = (req,res,next)=>{
let {error} = reviewSchema.validate(req.body);
if(error){
let errMsg = error.details.map((el) => el.message).join(",");   
return next(new ExpressError(405,errMsg));
}else{
next();
}};



module.exports.isReviewOwner = async(req,res,next) => {
    let{idL,idR} = req.params;
    let getReview = await review.findById(idR);
    if(!(res.locals.currUser && getReview.author.equals( res.locals.currUser._id))){
    req.flash("error","you are not the author of this review");
    return res.redirect(`/listings/view/${idL}`);
    } 
    next();
}; 


















