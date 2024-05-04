const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Building the page schema
const pageSchema = new Schema({
    name: {
        type: String,
        trim: true,
        minLength: 2
    },
    description: {
        type: String,
        trim: true
    },
    website: {
        type: String,
        trim: true
    },
    category: {
        type: String,
        trim: true
    },
    profilePicture: {
        type: String,
        default: ''
    },
    coverPhoto: {
        type: String,
        default: ''
    },
    followers: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }],
    isVerified: {
        type: Boolean,
        default: false
    },
    contactEmail: {
        type: String,
        trim: true,
        lowercase: true
    },
    address: {
        type: String,
        trim: true
    },
    phoneNumber: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Page', pageSchema);
