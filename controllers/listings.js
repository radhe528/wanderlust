const ExpressError = require('../expressError.js');
let listing = require('../models/listing.js');
let review = require('../models/review.js');


module.exports.index =  async (req,res,next)=>{
   let listings = await listing.find();
   if(!listings){
   return next(new ExpressError(403,"error in mongodb can't find all data"));
   };
   res.render('listings/home.ejs',{listings});
};

module.exports.liscreform = async (req,res)=>{
   res.render('listings/create.ejs');
};


module.exports.liscreated = async (req,res,next)=>{
let url = req.file.path;
let filename = req.file.filename;
let newListing = new listing(req.body.listing);
newListing.owner = req.user._id;
newListing.image = {url, filename};
let result = await newListing.save();
if(!result){
return next(new ExpressError(403,"error in mongodb can't add"));
};
req.flash("success","New Listing Created!");
res.redirect('/listings');
};


module.exports.lisview = async (req,res,next)=>{
    let{id} = req.params;
    let list = await listing.findById(id)
    .populate({path:'reviews', populate: {path:"author"}})
    .populate("owner");
    if(!list){
    req.flash("error","Listing that you are tring to access does not exit!");
    return res.redirect('/listings');
    };   
    res.render('listings/view.ejs',{list});
};


module.exports.liseditform = async (req,res,next)=>{
    let{id} = req.params;
    let list = await listing.findById(id);
    if(!list){
    req.flash("error","Listing that you are tring to edit does not exit!");
    return res.redirect('/listings');
    };
    res.render('listings/edit.ejs',{list});
}


module.exports.lisupdated = async (req,res,next)=>{
    let{id} = req.params;
    let result = await listing.findByIdAndUpdate(id,req.body.listing);
    if(!result){
    return next(new ExpressError(403,"error in mongodb can't add"));
    };
    req.flash("success","Listing Edited!");
    res.redirect(`/listings/view/${id}`);
}

module.exports.lisdeleted = async (req,res,next)=>{
    let{id} = req.params;
    let result = await listing.findByIdAndDelete(id);
    if(!result){
    return next(new ExpressError(403,"error in mongodb can't add"));
    };
    req.flash("success","Listing Deleted!");
    res.redirect('/listings');
}


module.exports.reviewdeleted = async (req,res,next)=>{
    let{idL,idR} = req.params;
    let result = await review.findByIdAndDelete(idR);
    if(!result){
    return next(new ExpressError(403,"error in mongodb can't add"));
    };
    let resu = await listing.findByIdAndUpdate(idL,{$pull: {reviews: idR}},{returnDocument:'after'});
    if(!resu){
    return next(new ExpressError(403,"error in mongodb can't add"));
    };
    req.flash("success","Review Deleted!");
    res.redirect(`/listings/view/${idL}`);
}




















