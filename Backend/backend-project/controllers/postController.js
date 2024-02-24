const Post = require("../models/Post");
const User = require("../models/User");



exports.createPost = async(req,res)=>{
    try{
        const postOwner = await User.findById(req.body["postOwner"]);
        if(!postOwner)  
            return res.status(401).json({message : "User not found"});
        const newPost = await Post.create(
            {
                author: postOwner,
                title: req.body['title'],
                content: req.body['content']
            }
        );
        return res
        .status(201)
        .json(
            {
                message : "post created successfully",
                data: newPost
            }
        );
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message : err.message
        });
    }
};

exports.deletePost = async(req,res)=>{
    try{
        const userTryingToDelete = await User.findById(req.body['postOwner']);
        if(!userTryingToDelete)
            return res.status(404).json({message: 'USER Not Found'});
        const post = await Post.findById(req.params['postId']);
        if(!post)
            return res.status(404).json({message: 'POST NOT Found'});
        if(post.author._id.toString() !== userTryingToDelete._id.toString())
            return res.status(404).json({message:"author does not appear as owner"});
        await post.deleteOne();
        return res.status(200).json({message: 'DELETED SUCCESSFULLY'});
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message : err.message
        });
    };
};

exports.likePost = async (req, res) => {
    try {
        const userTryingToLike = await User.findById(req.body.userId);
        if (!userTryingToLike)
            return res.status(404).json({ message: 'User not found' });

        const post = await Post.findById(req.params.postId);
        if (!post)
            return res.status(404).json({ message: 'Post not found' });

        if (post.likes.includes(userTryingToLike._id)) {
            const index = post.likes.indexOf(userTryingToLike._id);
            post.likes.splice(index, 1);
        } else {
            post.likes.push(userTryingToLike._id);
        }

        await post.save();

        res.status(201).json({
            message: 'Post liked/unliked successfully',
            data: post
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};

exports.getTimeLinePosts = async (req, res) => {
    try {
        // Find the user
        const user = await User.findById(req.params.userId);
        if (!user)
            return res.status(404).json({ message: 'User not found' });

        // Get posts that belong to the user and the users they are following, ordered by date and time
        const posts = await Post.find({
            $or: [
                { author: user._id }, // Posts of the user
                { author: { $in: user.friends } } // Posts of users the current user is friend with
            ]
        }).sort({ createdAt: -1 }); // Sort by descending order of createdAt timestamp

        if(posts.length == 0)
            return res.status(201).json({ message:'no posts found yet' });

        res.status(201).json({ message: 'Timeline posts retrieved successfully', data: posts });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};
