if(process.env.NODE_ENV != "production"){
require('dotenv').config();
}
 
const express = require('express');
const mongoose = require('mongoose');
const path = require('path')
const ejs = require('ejs');
const methodOverride = require('method-override')
ejsMate = require('ejs-mate');
const ExpressError = require('./expressError.js');
const session = require('express-session')
const MongoStore = require('connect-mongo').default;
// const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const passport = require("passport");
const localStrategy = require("passport-local");
const user = require("./models/user.js");

const userRouter = require('./routes/user.js');
const listingRouter = require('./routes/listings.js');
const reviewRouter = require('./routes/reviews.js');

const app = express();
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public')))
app.use(methodOverride('_method'))
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.engine('ejs', ejsMate);

const dbUrl =  process.env.ATLASDB_URL;

main();
async function main() {
    try{
    await mongoose.connect(dbUrl);
    console.log('connection successful');
    app.listen(3000,()=>{console.log("listening on server 3000")})
    }catch(err){console.log(err)};
};

const store = MongoStore.create({ 
mongoUrl: dbUrl,
crypto: {
secret: process.env.SECRET,
},
touchAfter: 24*3600,
});

store.on("error",()=> {
    console.log("ERROR in MONGO SESSION STORE", err);
});

const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave: false, 
    saveUninitialized:true,
    cookie: {
        expires: Date.now() + 7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly: true,
    },
};


app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(user.authenticate()));

passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());


app.use((req,res,next) => {
    res.locals.successMsg =  req.flash("success");
    res.locals.failureMsg =  req.flash("error");
    res.locals.currUser = req.user;
    next();
});


app.use('/',userRouter);
app.use('/listings/review',reviewRouter);
app.use('/listings',listingRouter);


// app.use((err,req,res,next)=>{
// console.log(err.name);
// next(err); 
// });

app.use((req,res,next)=>{
next(new ExpressError(404,'Page Not Found'));
});

app.use((err,req,res,next)=>{
let{status=405,message="errrrrrr"} = err;
res.status(status).send(message);
});


























































