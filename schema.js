const joi = require('joi');
const review = require('./models/review.js');
const listing = require('./models/listing.js');
const user = require('./models/user.js');

 
module.exports.listingSchema = joi.object({
    listing: joi.object({
        title: joi.string().required(),
        description: joi.string().required(),
        image: joi.string().required(),
        country: joi.string().required(),
        price: joi.number().required(),
        location: joi.string().required(),
        image: joi.string().allow("",null),
      }).required()
});

module.exports.reviewSchema = joi.object({
    review: joi.object({
        comment: joi.string().required(),
     }).required()
});


 




