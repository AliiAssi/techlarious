const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Building the comment schema
const commentSchema = new Schema(
    {
        content: {
            type: String,
            required: true,
            trim: true,
            maxLength : 255
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        post:{
            type : Schema.Types.ObjectId,
            ref : "Post"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Comment', commentSchema);
