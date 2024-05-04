const mongoose = require('mongoose');
const Joi = require('joi');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 200,
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 200,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    category: {
        type: String,
        required: true,
        trim: true,
    },
    image: {
        type: Object,
        default: {
            url: "https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg?auto=compress&cs=tinysrgb&w=400",
            isNew: false,
        },
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
}, {
    timestamps: true,
    toJSON : {virtual: true},
    toObject : {virtual: true}
});

postSchema.virtual(
    "comment", {
        ref: "Comment",
        foreignField: "postId",
        localField: "_id",
    }
);


const Post = mongoose.model("Post", postSchema);

// Validate create post
function validateCreatePost(post) {
    const schema = Joi.object({
        title: Joi.string().trim().min(1).max(200).required(),
        description: Joi.string().trim().min(5).max(200).required(),
        category: Joi.string().trim().required(),
    });

    return schema.validate(post);
}

// Validate update post 
function validateUpdatePost(post) {
    const schema = Joi.object({
        title: Joi.string().trim().min(1).max(200),
        description: Joi.string().trim().min(5).max(200),
        category: Joi.string().trim(),
    });

    return schema.validate(post);
}

module.exports = {
    Post,
    validateCreatePost,
    validateUpdatePost,
};
