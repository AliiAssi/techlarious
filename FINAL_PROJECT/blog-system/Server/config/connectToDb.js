const mongoose = require('mongoose');


module.exports = async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to mongodb ^_^');
    }
    catch(err) {
        console.log("Connection to mongoDb failed ! :",err);
    };
}