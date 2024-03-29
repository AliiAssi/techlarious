const mongoose = require('mongoose');

module.exports = (req,res , next )  => {
    if(! mongoose.Types.ObjectId.isValid(req.params.id)){
        return res.status(404).json({message : 'Invalid id provided in request ' + req.params.id});
    }
    next();
}