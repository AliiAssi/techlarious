const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    picture: {
        type: String,
        default: 'https://th.bing.com/th/id/OIP.Y5AKy_ThdGknRFLuqJmdtwHaEo?rs=1&pid=ImgDetMain'
    },
    video: {
        type: String,
        default: ''
    },
    tags: {
        type: [String],
        default: []
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }]
}, {
    timestamps: true,
});

module.exports = mongoose.model('Post', postSchema);
