const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const Joi = require('joi');

// Building the user schema
const userSchema = new Schema({
    firstName: {
        type: String,
        required: [true, "First Name is required"],
        trim: true,
        maxLength: 50,
        minLength: 3
    },
    lastName: {
        type: String,
        required: [true, "Last Name is required"],
        trim: true,
        maxLength: 50,
        minLength: 3
    },
    userName: {
        type: String,
        required: [true, "User Name is required"],
        unique: true,
        trim: true,
        minLength: 3
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        trim: true,
        lowercase: true
    },
    passwordChangeAt:{
        type: Date
    }
    ,
    phoneNumber: {
        type: String,
        trim: true,
        unique : true
    },
    profilePicture: {
        type: String,
        trim: true,
        default: ''
    },
    following : [{
        type : Schema.Types.ObjectId,
        ref : " User"
    }],
    followers : [{
        type : Schema.Types.ObjectId,
        ref : " User"
    }],
    friends : [{ 
        type : Schema.Types.ObjectId,
         ref : " User"
    }],
    followedPages : [{
        type : Schema.Types.ObjectId,
        ref : "Page"
    }]

},
{
    timestamps : true   
}
);

// genrate auth token
UserSchema.methods.generateAuthToken = function(){
    return jwt.sign(
        { id: this._id,
        }, process.env.SECRETKEY, 
        { expiresIn: '30d' }
    );
}

// Define pre-save middleware to hash the password before saving
userSchema.pre('save', async function(next) {
    try {
        // Check if the password field has been modified
        if (!this.isModified('password')) {
            return next(); // Exit early if the password is not modified
        }
        
        // Hash the password with a salt factor of 12
        this.password = await bcrypt.hash(this.password, 12);
        
        next(); // Proceed to the next middleware or save operation
    } catch (err) {
        next(err); // Pass any errors to the next middleware or error handler
    }
});

function validateRegisterUser(obj) {
    const schema = Joi.object({
        firstName: Joi.string().trim().min(3).max(50).required(),
        lastName: Joi.string().trim().min(3).max(50).required(),
        userName: Joi.string().trim().min(3).max(50).required(),
        email: Joi.string().trim().min(2).max(100).required().email(),
        password: Joi.string().trim().min(3).required(), // Updated password constraint
    });
    return schema.validate(obj);
}

function validateLoginUser(obj) {
    const schema = Joi.object({
        email: Joi.string().trim().min(2).max(100).required().email(),
        password: Joi.string().trim().min(8).required(), // Updated password constraint
    });
    return schema.validate(obj); 
}


const User = mongoose.model('User', userSchema);
module.exports = {
    User,
    validateRegisterUser,
    validateLoginUser
};