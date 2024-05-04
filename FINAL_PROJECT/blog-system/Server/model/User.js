const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Define the User schema
const UserSchema = new mongoose.Schema(
{
    username: {
        type: String,
        required: true,
        trim: true,
        minlength : 2,
        maxlength : 255,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength : 2,
        maxlength : 255,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength : 2,
        maxlength : 255,
    },
    profilePhoto: {
        type : Object,
        default:{
            url : "https://cdn.pixabay.com/photo/2018/03/27/21/43/startup-3267505_640.jpg",
            publicId : false,
        },
    },
    bio: {
        type: String,
        default: "no bio created yet"
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    isAccountVerified:{
        type: Boolean,
        default: false
    }
}
,
{
    timestamps : true,
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
});

// populate posts that belongs to this user when he/she get his/her profile
UserSchema.virtual("posts",{
    ref : "Post",
    foreignField : "user"
    ,localField : "_id"
})

// genrate auth token
UserSchema.methods.generateAuthToken = function(){
    return jwt.sign(
        { id: this._id,
          isAdmin:this.isAdmin
        }, process.env.SECRETKEY, 
        { expiresIn: '30d' }
    );
}

// Create a User model based on the schema
const User = mongoose.model('User', UserSchema);

function validateRegisterUser(obj) {
    const schema = Joi.object({
        username: Joi.string().trim().min(2).max(100).required(),
        email: Joi.string().trim().min(2).max(100).required().email(),
        password: Joi.string().trim().min(8).required(), // Updated password constraint
    });

    return schema.validate(obj);
}


function validateLoginUser(obj) {
    const schema = Joi.object({
        email: Joi.string().trim().min(2).max(100).required().email(),
        password: Joi.string().trim().min(8).required(), // Updated password constraint
    });

    return schema.validate(obj); 
}

function validateUpdateUser(obj) {
    const schema = Joi.object({
        username: Joi.string().trim().min(2).max(100),
        password: Joi.string().trim().min(8),
        bio: Joi.string()
    });

    return schema.validate(obj); 
}

// Export the User model
module.exports = {
    User,
    validateRegisterUser,
    validateLoginUser,
    validateUpdateUser
};
