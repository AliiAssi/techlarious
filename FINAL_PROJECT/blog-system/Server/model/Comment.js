const mongoose = require('mongoose');
const Joi = require('joi');

const CommentSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", 
            required: true
        },
        postId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
            required: true
        },
        text: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Comment = mongoose.model("Comment", CommentSchema);

// Validate create Comment
function validateCreateComment(comment) {
    const schema = Joi.object({
        postId: Joi.string().required(), // Add appropriate validation for ObjectId
        text: Joi.string().required(),
    });

    return schema.validate(comment);
}

// Validate update Comment
function validateUpdateComment(comment) {
    const schema = Joi.object({
        text: Joi.string().required(),
    });

    return schema.validate(comment);
}

module.exports = {
    Comment,
    validateCreateComment,
    validateUpdateComment
};
