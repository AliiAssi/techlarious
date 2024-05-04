const asyncHandler = require("express-async-handler");
const {
  Comment,
  validateCreateComment,
  validateUpdateComment,
} = require("../model/Comment");
const { User } = require("../model/User");

/***
 * ?description : create new comment
 * *route       : /api/comments
 * !method      : POST
 * ?access      : private || only logged in user
 */
module.exports.createCommentCtrl = asyncHandler(async (req, res) => {
  const { error } = validateCreateComment(req.body);
  if (error) {
    // Changed status code to 400 for a bad request
    res.status(400).send(error.details[0].message);
    return;
  }

  // Use findById to query for a user by ID
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  const comment = new Comment({
    username: user.username,
    postId: req.body.postId,
    text: req.body.text,
    user: req.user.id,
  });

  await comment.save();
  res.status(201).json(comment); // Changed status code to 201 for resource creation
});

/***
 * ?description : get all comments
 * *route       : /api/comments
 * !method      : Get 
 * ?access      : private || only adminstration
 */
module.exports.getAllCommentsCtrl = asyncHandler(async (req, res) => {
    const comments = await Comment.find().populate("user",['-password']);
    /*if(!req.user.isAdmin){
        return res.status(404).json({
            message: 'You do not have permission to access this page'
        });
    }*/
    res.status(200).json(comments);
});
/***
 * ?description : delete a comment
 * *route       : /api/comments/:id
 * !method      : DELETE
 * ?access      : private || only logged in user
 */
module.exports.deleteCommentCtrl = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.id);
  if (!comment) return res.status(403).json({ message: "Comment not found" });

  if (req.user.id !== comment.user.toString() || !req.user.isAdmin)
    return res
      .status(403)
      .json({ message: " Comment deleted permission denied" });
  // Correct method is deleteOne
  await comment.deleteOne();

  return res.status(200).json({ message: "Comment deleted" });
});

/***
 * ?description : update a comment
 * *route       : /api/comments/:id
 * !method      : PUT
 * ?access      : private || only owner of the comment
 */
module.exports.updateCommentCtrl = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.id);
  if (!comment) 
    return res.status(403).json({ message: "Comment not found" });

  if (req.user.id !== comment.user.toString())
    return res.status(403).json({ message: "permission denied !" });

  const { error } = validateUpdateComment(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const commentUpdated = await Comment.findOneAndUpdate(
    { _id: req.params.id }, // or whatever your unique identifier for comments is
    {
      $set: {
        text: req.body.text,
      },
    },
    { new: true } // to return the updated document
  );
  
  res.status(200).json(commentUpdated);
});
