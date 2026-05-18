const mongoose = require('mongoose');
let review = require('./review.js');


let{Schema} = mongoose;

let listingSchema = new Schema({
    title:{
    type:String,
    },
    description:{
    type:String
    },   
    image:{
    url: String,
    filename: String,
    },
    price:{
    type:Number
    },
    location:{
    type:String
    },
    country:{
    type:String,
    },
    reviews: [
    { 
      type: Schema.Types.ObjectId,
      ref:'review',
    },
  ],
    owner: { 
      type: Schema.Types.ObjectId,
      ref:'user',
    },
  
});

listingSchema.post("findOneAndDelete", async(listing) =>{
  if(listing.reviews.length){
  await review.deleteMany({ _id: {$in: listing.reviews}});  
  }
});

let listing = mongoose.model('listing',listingSchema);
module.exports = listing;
















































