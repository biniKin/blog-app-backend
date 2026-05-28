// handles auth with JWT
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try{

        
        const authHeader = req.headers.authorization;
        if(!authHeader){
            // we return because we don't want to allow this kind of req from reaching controller
            return res.status(401).json({
                error:"Missing token"
            });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET); // verified ? returns decoded payload : throw exception []

        req.user = decoded;

        next();
    }catch(e){
        console.log(e);
        if(e.name === "TokenExpiredError"){
            return res.status(401).json({
                error: "Token expired!"
            });
        }

        return res.status(401).json({
            error: "Authentication failed."
        })
    }
}

module.exports = {authMiddleware};