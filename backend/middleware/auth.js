// import User from '../models/user.model.js';
// import jwt from 'jsonwebtoken';

// const JWT_SECRET = 'my_secret_key';
// export default async function authMiddleware(req,res,next){
//     // grabe the token
//     const authHeader = req.headers.authorization;
//     if(!authHeader || !authHeader.startsWith("Bearer ")){
//         return res.status(401).json({
//             success:false,
//             message:"Not authorized or token missing."
//         });
//     }
//     const token = authHeader.split(" ")[1];
//     // verify the token
//     try {
//         const payload = jwt.verify(token,JWT_SECRET);
//         const user = await User.findById(payload.id).select("-password");
//         if(!user){
//             return res.status(401).json({
//                 success:false,
//                 message:"User not found."
//             });
//         }
//         req.user = user;
//         next(); 
//     } catch (error) {
//         console.error("JWT verufication failed:", error);
//         return res.status(401).json({
//             success:false,
//             message:"Invalid token or token expired."
//         });
// }
// }

import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = "my_secret_key";

export default async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  console.log("AUTH HEADER:", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Not authorized or token missing.",
    });
  }

  const token = authHeader.split(" ")[1];

  console.log("TOKEN:", token);

  try {
    const payload = jwt.verify(token, JWT_SECRET);

    console.log("PAYLOAD:", payload);

    const user = await User.findById(payload.id).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found.",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error("JWT verification failed:", error);

    return res.status(401).json({
      success: false,
      message: "Invalid token or token expired.",
    });
  }
}