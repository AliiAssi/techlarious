const jwt = require('jsonwebtoken');

// Verify the token  validation function:   https://github                                                                      
function verifyToken(req, res, next) {
    const authToken = req.headers.authorization;
    if (!authToken) {
        return res.status(401).json({ message: "No token provided" });
    }

    const token = authToken.split(' ')[1];

    try {
        const decodedPayload = jwt.verify(token, process.env.SECRETKEY);
        req.user = decodedPayload;
        next();
    } catch (e) {
        return res.status(401).json({ message: "Error caught, access denied" });
    }   
}

function verifyTokenAndAdmin(req, res, next) {
    verifyToken(req, res, () => {
        // Check if req.user exists before accessing isAdmin
        if (req.user && req.user.isAdmin) {
            next();
        } else {
            console.log(req.user)
            return res.status(403).json({ message: "You are not allowed to access this." , userName : req.user + "" });
        }
    });
}

function verifyTokenAndOnlyUserHimself(req, res, next) {
    verifyToken(req, res, () => {
        // Check if req.user exists before accessing isAdmin
        if (req.user.id === req.params.id) {
            next();
        } else {
            return res.status(403).json({ message: "You are not allowed to access this" });
        }
    });
}

function verifyTokenAndOnlyUserHimselfOrAdmin(req, res, next) {
    verifyToken(req, res, () => {
        // Check if req.user exists before accessing isAdmin
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            return res.status(403).json({ message: "You are not allowed to access this" });
        }
    });
}

module.exports = {
    verifyToken,
    verifyTokenAndAdmin,
    verifyTokenAndOnlyUserHimself,
    verifyTokenAndOnlyUserHimselfOrAdmin
};
