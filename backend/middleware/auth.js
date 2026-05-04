import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'my_secret_key';
export default function authMiddleware(req,res,next){
    // grabe the token
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({
            success:false,
            message:"Not authorized or token missing."
        });
    }
    const token = authHeader.split(" ")[1];
    // verify the token
    try {
        const payload = jwt.verify(token,JWT_SECRET);
        const user = User.findById(payload.id).select("-password");
        if(!user){
            return res.status(401).json({
                success:false,
                message:"User not found."
            });
        }
        res.user = user;
        next(); 
    } catch (error) {
        console.error("JWT verufication failed:", error);
        return res.status(401).json({
            success:false,
            message:"Invalid token or token expired."
        });
}
}