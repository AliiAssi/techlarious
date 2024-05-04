const asyncHandler = require('express-async-handler');
const {User, validateUpdateUser} = require('../model/User');
const bcrypt = require('bcryptjs');
const path = require('path');
const fs = require('fs');
const {Comment} = require('../model/Comment');
const {Post}    = require('../model/Post');

//for getting all the users
module.exports.getAllUsersCtrl = asyncHandler(
    async (req, res) =>
    {
        /*if(!req.user.isAdmin) // access mode specified
        return res.status(403).json({message:"you are not allowed to access this"});*/
        /* OR  in the route file */
        const users = await User.find().select('-password')
        .populate('posts');
        res.status(200).json(users)
    }
);

//for getting one user by id 
module.exports.getUserProfileCtrl = asyncHandler(
    async (req, res) => {
        try {
            const user = await User.findById(req.params.id).select('-password')
            .populate('posts');
            
            if (!user) {    
                return res.status(404).json({ message: "User not found" });
            }

            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
);

// update user profile
module.exports.updateUserProfileCtrl = asyncHandler(
    async(req, res) =>
    {
        // 1. validation
        const {error} = validateUpdateUser(req.body);
        if(error) {
            return res.status( 404 ).json({message: error.details[0].message});
        }

        //2. hashing a password if it exists in the request -> if the user wont to update it
        if(req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password,salt);
        }

        //3.find it and update it:we have usnig the $set{} to update the username or the password or the bio or all depending on the user request
        const userUpdated = await User.findByIdAndUpdate(req.params.id,
        {
          $set:
          {
            username : req.body.username,
            password : req.body.password,
            bio      : req.body.bio
          }  
        },{new : true}).select('-password');

        //4. return the response
        res.status(200).json(userUpdated);
    }
);


//get users number : counting all users
module.exports.getUsersCountCtrl = asyncHandler(
    async(req,res)=>{
        const count = await User.countDocuments();
        res.status(200).json(count);
    }
);

//upload the profile picture 
module.exports.profilePhotoUploadCtrl = asyncHandler(
    async (req, res) => {
        if(!req.file){
            return res.status(404).json({message: "no file privided"});
        }
        const user = await User.findById(req.user.id);
        if(!user){
            return res.status(404).json({message: " no user privided"});
        }

        
        if(user.profilePhoto.publicId) {
            const oldFilePath = user.profilePhoto.url;
            fs.stat(oldFilePath, (err, stats) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    return res.status(404).send('File not found');
                } else {
                    return res.status(500).send('Internal Server Error');
                }
            }
    
            // Unlink the file
            fs.unlink(oldFilePath, (unlinkErr) => {
                if (unlinkErr) {
                    return res.status(500).send('Error deleting file');
                }
            });
            });
        }
        
        const filePath = path.join(__dirname,`../assets/usersPhoto/${req.file.filename}`);
        user.profilePhoto  = {
            url : filePath,
            publicId : true
        }
        await user.save();
    
        return res.status(200).json({
            message: 'Upload profile picture successfully ',
            profilePhoto : {
                url : filePath,
                publicId: true
            }
        });
    }
);

//delete profile photo
module.exports.deleteProfilePhotoCtrl = asyncHandler(
    async(req, res) => {
        const id = req.user.id;
        const user = await User.findById(id);

        if(user.profilePhoto.publicId) {
            const oldFilePath = user.profilePhoto.url;
            fs.stat(oldFilePath, (err, stats) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    return res.status(404).send('File not found');
                } else {
                    return res.status(500).send('Internal Server Error');
                }
            }
    
            // Unlink the file
            fs.unlink(oldFilePath, (unlinkErr) => {
                if (unlinkErr) {
                    return res.status(500).send('Error deleting file');
                }
            });
            });
        }


        user.profilePhoto={
            url: "https://cdn.pixabay.com/photo/2018/03/27/21/43/startup-3267505_640.jpg",
            publicId : false
        }
        await user.save();
        return res.status(200).json(
            {
                message : "Success message ",
            }
        );
    }
);


module.exports.deleteUserProfileCtrl = asyncHandler(async (req, res) => {
    const userId = req.params.id;

    const user = await User.findById(userId).select('-password');
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    // Unlink the user profile picture from the server
    if (user.profilePhoto.publicId) {
        const oldFilePath = user.profilePhoto.url;
        try {
            await fs.promises.unlink(oldFilePath);
        } catch (unlinkErr) {
            return res.status(500).json({ message: 'Error deleting file' });
        }
    }

    // Delete all its posts and remove user's ID from the 'likes' array
    const posts = await Post.find({ user: userId });

    for (const post of posts) {
        if (post.image.isNew) {
            fs.unlink(post.image.url, (unlinkErr) => {
                if (unlinkErr) {
                    return res.status(500).send('Error deleting file');
                }
            });
        }
    }

    await Post.deleteMany({ user: user.id });

    await Post.updateMany(
        { likes: user.id },
        { $pull: { likes: user.id } }
    );

    // Delete all comments related to the user
    await Comment.deleteMany({ user: user.id });

    // Delete the user
    await user.deleteOne();

    return res.status(200).json({
        message: 'Success: User profile deleted',
    });
});

