const { required } = require('joi');
const mongoose = require('mongoose');
 

let{Schema} = mongoose;

let reviewSchema = new Schema({
    comment:{
    type:String,
    required: true,
    },
    rating:{
    type:Number,
    min: 1,
    max: 5
    },   
    createdAt:{
    type:Date,
    default: Date.now()
    },
    author: { 
    type: Schema.Types.ObjectId,
    ref:'user',
    },

});

let review = mongoose.model('review',reviewSchema);
module.exports = review;


















