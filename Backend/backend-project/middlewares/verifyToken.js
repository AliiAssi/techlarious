const jwt = require('jsonwebtoken');

//verifying token middleware
function verifyTokenMiddleware (req,res,next) {
    const authToken = req.headers.authorization;
    if(!authToken){
        return res.status(401).json({message : "authorization required" });
    }

    const token = authToken.split(' ')[1];
    try{
        const decodedPayload  = jwt.verify(token, process.env.SECRETKEY);
        req.user = decodedPayload;
        next();
    }
    catch(e){
        return res.status(401).json({message : " error occurred " });
    }
}


module.exports ={
    verifyTokenMiddleware
}
