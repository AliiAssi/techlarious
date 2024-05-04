const mongoose = require('mongoose');
const Joi = require('joi');

// Category Schema
const categorySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
}, {
    timestamps: true,
});

const Category = mongoose.model('Category', categorySchema);

// Validation function for creating a category
function validateCategory(category) {
    const schema = Joi.object({
        title: Joi.string().required().trim(),
    });

    return schema.validate(category);
}

module.exports = {
    Category,
    validateCategory,
};
