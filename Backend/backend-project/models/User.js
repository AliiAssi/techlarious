const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
require('dotenv').config();

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        trim: true,
        maxLength: 50,
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true,
        maxLength: 50,
        minLength: 3
    },
    userName: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        trim: true,
        minLength: 3
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        trim: true,
    },
    passwordChangeAt: {
        type: Date
    },
    phoneNumber: {
        type: String,
        trim: true,
        unique: true
    },
    profilePicture: {
        type: String,
        trim: true,
        default: 'https://cdn.pixabay.com/photo/2018/03/27/21/43/startup-3267505_640.jpg'
    },
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    followedPages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Page'
    }]
}, {
    timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();

    try {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (error) {
        next(error);
    }
});


// Generate authentication token
userSchema.methods.generateAuthToken = function () {
    return jwt.sign({ _id: this._id }, process.env.SECRETKEY, { expiresIn: '30d' });
};

// Validation functions
function validateRegisterUser(user) {
    const schema = Joi.object({
        firstName: Joi.string().trim().min(3).max(50).required(),
        lastName: Joi.string().trim().min(3).max(50).required(),
        userName: Joi.string().trim().min(3).max(50).required(),
        email: Joi.string().trim().email().required(),
        password: Joi.string().trim().min(8).required(),
        phoneNumber: Joi.string().trim().pattern(/^\+961\d{8}$/).required()
    });
    return schema.validate(user);
}

function validateLoginUser(user) {
    const schema = Joi.object({
        email: Joi.string().trim().email().required(),
        password: Joi.string().trim().required()
    });
    return schema.validate(user);
}

const User = mongoose.model('User', userSchema);

module.exports = {
    User,
    validateRegisterUser,
    validateLoginUser
};
