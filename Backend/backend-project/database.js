const mongoose = require('mongoose');
require("dotenv").config();

exports.connectToDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("._. succesfully connection to MongoDB ._.");
    }
    catch(err){
        console.error(err);
        process.exit(1);
    }
};