const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Building the friend request schema
const friendRequestSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    requestStatus: {
        type: String,
        enum: ['pending', 'accepted', 'rejected' , 'cancelled'],
        default: 'pending'
    }
}, {
    timestamps: true
});


const FriendRequest = mongoose.model('Comment', friendRequestSchema);
module.exports = {
    FriendRequest
};