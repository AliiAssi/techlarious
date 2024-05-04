const Post = require("../models/Post");
const {User} = require("../models/User.js");

exports.createPost = async(req,res)=>{
    try{
        const postOwner = await User.findById(req.user._id).select('-password');
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
        const post = await Post.findById(req.params['id']);
        if(!post)
            return res.status(404).json({message: 'POST NOT Found'});
        if(post.author._id.toString() !== req.user._id.toString())
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
        const post = await Post.findById(req.params.id);
        if (!post)
            return res.status(404).json({ message: 'Post not found' });

        if (post.likes.includes(req.user._id)) {
            const index = post.likes.indexOf(req.user._id);
            post.likes.splice(index, 1);
        } else {
            post.likes.push(req.user._id);
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
        //user 
        const user  =  req.user;
        // Get posts that belong to the user and the users they are following, ordered by date and time
        const posts = await Post.find({
            $or: [
                { author: user._id }, // Posts of the user
                { author: { $in: user.friends } }, // Posts of users the current user is friend with
                { author : { $in: user.followedPages}}
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

exports.updatePost = async (req, res) => {
    try {
        const user = req.user;
        const post = await Post.findById(req.params.id);
        if (!post)
            return res.status(404).json({ message: 'Post not found' });

        if (post.author._id.toString() !== user._id.toString()) {
            return res.status(404).json({ message: 'Owner not found',userId : user._id ,postAuthorId : post.author._id });
        }

        await Post.updateOne({
            _id: req.params.id // Use _id instead of post.owner
        }, {
            $set: {
                content: req.body.content,
                title: req.body.title
            }
        });

        return res.status(200).json({ message: 'Post updated successfully',post });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};
