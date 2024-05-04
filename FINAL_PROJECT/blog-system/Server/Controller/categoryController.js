const asyncHandler = require('express-async-handler');
const { Category,validateCategory } = require('../model/Category');

/***
 * ?route /api/category
 * !method post
 * access private \\ only admin
 */

module.exports.createCategoryCtrl = asyncHandler(async (req, res) => {
    // Validate the request data
    const { error } = validateCategory(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    try {
        // Create a new category using the provided data
        const category = await Category.create({
            user: req.user.id, // Assuming the user ID is sent in the request body
            title: req.body.title,
        });

        // Send a successful response
        return res.status(201).json({
            category,
        });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
/***
 * ?route /api/category
 * !method get
 * access public
 */

module.exports.getAllCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find();
    res.status(200).json(categories);
});

/***
 * ?route /api/category/:id
 * !method delete
 * access private // ONLY ADMIN 
 */

module.exports.deleteCategoryCtrl = asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);
    if(!category){
        return res.status(404).json({ message : '   Category not found  '});
    }
    await  category.deleteOne();
    res.status(200).json({message  : 'Category deleted successfully'});
});
