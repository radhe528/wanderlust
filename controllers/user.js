const ExpressError = require('../expressError.js');
let listing = require('../models/listing.js');
let review = require('../models/review.js');
let user = require('../models/user.js');
const passport = require("passport");



module.exports.signupform = async (req,res)=>{
     res.render('users/signup.ejs');
};



module.exports.signedup = async (req,res,next)=>{
try{
let{username,email,password} = req.body;
const newUser = new user({email,username});
let result = await user.register(newUser,password);
if(!result){
return next(new ExpressError(403,"error in mongodb can't add"));
};
req.login(result,(err) => {
    if(err){
    return next(err);
    }
req.flash("success","Welcome to Wanderlust");
res.redirect('/listings');
})
}catch(e){
req.flash("error",e.message);
res.redirect("/signup");
}
}


module.exports.signinform = async (req,res)=>{
     res.render('users/signin.ejs');
}


module.exports.signedin = async(req,res) => {
req.flash("success","Welcome back to Wanderlust you are loged in");

if(res.locals.redirectUrl?.includes("/listings/delete" && "/listings/review")){
let fullUrl = res.locals.redirectUrl;
let parts = fullUrl.split("/");
let idWithQuery = parts[parts.length - 1]; 
let id = idWithQuery.split("?")[0]; 
return res.redirect(`/listings/view/${id}`);
}
let redirectUrl = res.locals.redirectUrl || "/listings";
return res.redirect(redirectUrl);
}


module.exports.signouted = (req,res,next) => {
    req.logout((err) => {
        if(err){
        return next(err);
        }
        req.flash("success","you are logged out!");
        res.redirect("/listings");
    })
};





