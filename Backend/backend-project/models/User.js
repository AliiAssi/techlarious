const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Building the user schema
const userSchema = new Schema({
    firstName: {
        type: String,
        required: [true, "First Name is required"],
        trim: true,
        maxLength: 50,
        minLength: 3
    },
    lastName: {
        type: String,
        required: [true, "Last Name is required"],
        trim: true,
        maxLength: 50,
        minLength: 3
    },
    userName: {
        type: String,
        required: [true, "User Name is required"],
        unique: true,
        trim: true,
        minLength: 3
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email address']
    },
    phoneNumber: {
        type: String,
        trim: true,
        unique : true
    },
    profilePicture: {
        type: String,
        trim: true,
        default: ''
    },
    following : [{
        type : Schema.Types.ObjectId,
        ref : " User"
    }],
    followers : [{
        type : Schema.Types.ObjectId,
        ref : " User"
    }],
    friends : [{ 
        type : Schema.Types.ObjectId,
         ref : " User"
    }],
    followedPages : [{
        type : Schema.Types.ObjectId,
        ref : "Page"
    }]

},
{
    timestamps : true   
}
);

module.exports = mongoose.model('User', userSchema);
