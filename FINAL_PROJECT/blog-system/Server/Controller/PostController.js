const asyncHandler = require("express-async-handler");
const fs = require("fs");
const path = require("path");
const { Post, validateCreatePost, validateUpdatePost } = require("../model/Post");
const {Comment} = require("../model/Comment");
// insert a new post in the database
module.exports.createPostCtrl = asyncHandler(async (req, res) => {
  const { error } = validateCreatePost(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  if (!req.file) {
    return res.status(404).json({ message: "file not found" });
  }

  const imagePath = path.join(
    __dirname,
    `../assets/postsPhoto/${req.file.filename}`
  );

  const createdPost = await Post.create({
    title: req.body.title,
    category: req.body.category,
    description: req.body.description,
    image: {
      url: imagePath,
      isNew: true,
    },
    user: req.user.id,
  });
  res.status(200).json({ message: "post created successfully", createdPost });
});

// get all posts from the database
module.exports.getAllPostsCtrl = asyncHandler(async (req, res) => {
  const POST_PER_PAGE = 3; // 3 posts per page
  const { pageNumber, category } = req.query;

  let query = {};

  if (category) {
    query = { category: category };
  }

  let allPosts;

  if (pageNumber) {
    allPosts = await Post.find(query)
      .skip((pageNumber - 1) * POST_PER_PAGE)
      .sort({ created_at: -1 })
      .populate("user", ["-password"])
      .limit(POST_PER_PAGE);
  } else {
    allPosts = await Post.find(query)
    .sort({ created_at: -1 })
    .populate("user", ["-password"])
    .populate({
        path: 'comment',  // Use the correct virtual field name
        model: 'Comment',  // Specify the model for the virtual field
    });

  }

  res.status(200).json(allPosts);
});

// get number of post here
module.exports.getPostsCountCtrl = asyncHandler(async (req, res) => {
  const postNumber = await Post.countDocuments();
  return res.status(200).json(postNumber);
});

// get single post here
module.exports.getPostCtrl = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const post = await Post.findById(id).populate("user", ["-password"]);

  if (!post) {
    return res.status(404).json({ message: "Not Found " + id });
  }

  const relatedComments = await Comment.find({ postId: post._id });

  // Include related comments inside the post object
  const response = {
    post: {
      ...post.toObject(),
      "comments":relatedComments,
    },
  };

  return res.status(200).json(response);
});

// delete post from the user himself or an admin
module.exports.deletePostCtrl = asyncHandler(async (req, res) => {
  const postId = req.params.id;
  const post = await Post.findById(postId);
  ;

  // 1. validation
  if (!post) {
    return res.status(404).json({ message: "post not found" });
  }

  // 2. delete all comments
  await Comment.deleteMany({postId:post._id});
  // 3. unlink the image from the folder
  if (post.image.isNew) {
    const oldFilePath = post.image.url;
    fs.stat(oldFilePath, (err, stats) => {
      if (err) {
        if (err.code === "ENOENT") {
          return res.status(404).send("File not found");
        } else {
          return res.status(500).send("Internal Server Error");
        }
      }

      // Unlink the file
      fs.unlink(oldFilePath, (unlinkErr) => {
        if (unlinkErr) {
          return res.status(500).send("Error deleting file");
        }
      });
    });
  }

  // 4. delete the post document
  if (req.user.isAdmin || req.user.id == post.user.toString()) {
    await post.deleteOne();
    return res.status(200).json({ message: "Success deleting post" });
  } else {
    res.status(403).send("Error deleting post, private");
  }
});

// update post
module.exports.updatePostCtrl = asyncHandler(async (req, res) => {
  const { error } = validateUpdatePost(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const post = await Post.findById(req.params.id);

    // Validation
    if (!post) {
      return res
        .status(404)
        .json({ message: "No post found for id " + req.params.id });
    }

    // Verification
    if (req.user.id != post.user.toString()) {
      return res
        .status(403)
        .json({ message: "Cannot update post. User not authorized." });
    }

    const postUpdated = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          title: req.body.title,
          category: req.body.category,
          description: req.body.description,
        },
      },
      { new: true } // This ensures that you get the updated document as the result
    ).populate("user", ["-password"]);
    const relatedComments = await Comment.find({ postId: req.params.id });


    // If everything is successful, send a success message and the updated post
    return res
      .status(200)
      .json({ message: "Success updating post", postUpdated:
        {...postUpdated.toObject(),
          "comments":relatedComments
        }  
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// update the photo of the post
module.exports.updatePostPictureCtrl = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(404).json({ message: "Couldn't find post" });
  }

  if (!req.file) {
    return res.status(400).json({ message: "Couldn't find file" });
  }

  if (post.image.isNew) {
    const oldFilePath = post.image.url;
    fs.stat(oldFilePath, (err, stats) => {
      if (err) {
        if (err.code === "ENOENT") {
          return res.status(404).send("File not found");
        } else {
          return res.status(500).send("Internal Server Error");
        }
      }

      // Unlink the file
      fs.unlink(oldFilePath, (unlinkErr) => {
        if (unlinkErr) {
          return res.status(500).send("Error deleting file");
        }
      });
    });
  }

  const imagePath = path.join(
    __dirname,
    `../assets/postsPhoto/${req.file.filename}`
  );

  const postUpdated = await Post.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        image: {
          url: imagePath,
          isNew: true,
        },
      },
    },
    { new: true } // This ensures that you get the updated document as the result
  );

  try {
    return res
      .status(200)
      .json({ message: "Success updating post picture", postUpdated });
  } catch (saveError) {
    console.error(saveError);
    return res
      .status(500)
      .json({ message: "Error saving post after updating picture" });
  }
});

// toggle like
module.exports.toggleLikeCtrl = asyncHandler(async (req, res) => {
  let post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  let likes = post.likes;

  if (likes.length === 0) {
    likes.push(req.user.id);
  } else {
    // Use includes to check if user.id is in the array
    const index = likes.indexOf(req.user.id);

    if (index !== -1) {
      // If user.id is in the array, remove it using splice
      likes.splice(index, 1);
    } else {
      // If user.id is not in the array, add it
      likes.push(req.user.id);
    }
  }

  // Save the updated post
  await post.save();

  // You may want to send a response indicating success
  res.status(200).json({
    message: "Like toggled successfully",
    likes: post.likes,
  });
});
