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
function validateCommentPayLoad(obj) {
    const schema = Joi.object({
        content: Joi.string().trim().min(1).max(255).required(),
    });
    return schema.validate(obj);
}
const Comment = mongoose.model('Comment', commentSchema);
module.exports = {
    Comment,
    validateCommentPayLoad
};
