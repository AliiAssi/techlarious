const mongoose = require('mongoose');
const User = require('../models/User');
const Post = require('../models/Post');
const {Comment,validateCommentPayLoad} = require('../models/Comment');


/***     */
exports.createComment = async(req,res )=>{
    try{
        const user = await User.findById(req.body["user_id"]);
        if(!user){
            return res.status(404).json({message: "User not found in the database "});
        }

        const post = await Post.findById(req.params['post_id']);
        if(!post){
            return res.status(404).json({message: " Post not found in the database "});
        }

        const {error} = validateCommentPayLoad(req.body);
        if(error) {
            return res.status(error).json({message: error.details[0].message });
        }
        const owner = await User.findById(post.owner);
        if(! user._id.includes(owner.friends)){
            return res.status(error).json({message: "Owner not found  in the friends list."});
        }

        const newComment = await Comment.create({
            owner: user._id,
            post : post._id,
            content : req.body['content']
        });

        return res.status(200).json({message:" Comment created successfully" , newComment});
    }
    catch(err){
        console.error(err);
        res.status(501).json({message:err.message});
    }
};

exports.deleteComment  =  async(req, res)=>{
    try{
        const user = await User.findById(req.body['user_id']);
        if(!user){
            return res.status(500).json({message: 'User not found in the database ' });
        }

        const commentToDelete = await Comment.findById(req.params['comment_id']);
        if(!commentToDelete){
            return res.status(500).json({message: ' Comment not found in the database ' });
        }

        if(commentToDelete.owner !== user._id)  return res.status(500).json({message: ' Comment owner not allowed to delete' });

        await Comment.deleteOne({_id : commentToDelete._id});
        res.status(200).json({message: ' Comment deleted successfully '});
    }
    catch(err){
        console.error(err);
        res.status(500).json({message:err.message});
    }
}


exports.updateComment  =  async(req, res)=>{
    try{
        const user = await User.findById(req.body['user_id']);
        if(!user){
            return res.status(500).json({message: 'User not found in the database ' });
        }

        const commentToUpdate = await Comment.findById(req.params['comment_id']);
        if(!commentToUpdate){
            return res.status(500).json({message: ' Comment not found in the database ' });
        }

        if(commentToUpdate.owner !== user._id)  return res.status(500).json({message: ' Comment owner problem' });

        const {error} = validateCommentPayLoad(req.body);
        
        if(error) return res.status(error).json({message: error.details[0].message});

        commentToUpdate.content = req.body.content;
        await commentToUpdate.save();
        res.status(200).json({message: ' Comment updated successfully ',commentToUpdate});
    }
    catch(err){
        console.error(err);
        res.status(500).json({message:err.message});
    }
}

exports.getPostComments  = async(req, res)=>{
    try{
        const user = await User.findById(req.body['user_id']);
        if(!user){
            return res.status(500).json({message: 'User not found in the database ' });
        }
        
        const post = await Post.findById(req.params.post_id);

        if(!post){ return res.status(500).json({message: ' Post not found ' });}

        const comments = await Comment.find({
            post : post._id
        });//find comments where post  = post_id 

        return res.status(201).json({message: ' Comment found ', comments});

    }
    catch(err){
        console.error(err);
        res.status(500).json({message: err.message});
    }
};