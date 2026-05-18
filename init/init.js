let{data} = require('./data.js');
const mongoose = require('mongoose');

main();
async function main() {
    try{
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
    console.log('connection successful');
    savetodb();
    }catch(err){console.log(err)};
};


let Schema = mongoose.Schema;
let listingSchema = new Schema({
    title:{
    type:String,
    },
    description:{
    type:String
    },   
    image:{
    type:String,
    // default:"https://www.cntraveler.com/story/airbnb-goes-luxe-with-promise-of-new-high-end-rentals" ,
    // set: (v) =>
    //   (v==="")
    //  ? "https://www.cntraveler.com/story/airbnb-goes-luxe-with-promise-of-new-high-end-rentals" 
    //  : v,
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
    owner: { 
      type: Schema.Types.ObjectId,
      ref:'user',
    },

});

let listing = mongoose.model('listing',listingSchema);
 
 
async function savetodb() {
try{
 let res = await listing.deleteMany({});
 console.log(res);
 console.log('data deleted')
 updateData = data.map((obj) => ({...obj,owner: new mongoose.Types.ObjectId('6a0705cad4a2cf457adddab4')}));
 await listing.insertMany(updateData);
 console.log('data initiazed')
}catch(err){
 console.log(err)
};
};
 










