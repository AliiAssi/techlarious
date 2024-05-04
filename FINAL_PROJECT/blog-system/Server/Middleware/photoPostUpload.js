const path = require('path');
const multer = require('multer');

// photo Storage 
const photoStorage1 = multer.diskStorage(
    {
        destination : function (req,file,cb)
        {
            cb(null, path.join(__dirname,'../assets/postsPhoto'))
        },
        filename    : function(req,file,cb)
        {
            if(file)
            {
                cb(null,new Date().toISOString().replace(/:/g,'-') + file.originalname);
            }
            else{
                cb(null,false);
            }
        }
    }
);
//photo upload middleware
const photoUpload1 = multer({
    storage:    photoStorage1,
    fileFilter : function(req,file,cb){
        if(file.mimetype.startsWith('image')){
            cb(null,true);
        }else{
            cb({message: 'Uploading image failed with unsspected file format'},false);
        }
    },
    limits:{fileSize:1024 * 1024 *5} // maximuim 5 megabytes
});

module.exports = photoUpload1;