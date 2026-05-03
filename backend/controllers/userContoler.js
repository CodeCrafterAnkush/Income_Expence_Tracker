import { response } from 'express';
import '../models/userModel.js';
import validator from 'validator';
import bcrypt from 'bcryptjs';

const JWT_SECRET = 'my_secret_key';
const TOKEN_EXPIRE = '24h';

const createToken = (userId)=>{
    jwt.sign({id: userId},JWT_SECRET,{expiresIn:TOKEN_EXPIRE});
}

// Register User
 export async function registerUser(req,res) {
    const {name,email,password} = req.body;
    if(!name || !email || !password ){
        return res.status(400).json({
            success:false,
            message:"All fields are required."
        });
    }
    if(!validator.isEmail(email)){
        return res.status(400).json({
            success:false,
            message:"Invalid email."
        });
    }
    if(password.length < 8){
        return res.status(400).json({
            success:false,
            message:"Password must be atlist of 8 characters."
        });
    }
    try {
        if(await User.findOne({emai})){
            return res.status(400).json({
                success:false,
                message:"User already present."
            });
        }

        const hashed = await bcrypt.hash(password,10);
        const user = await User.create({name,email,password:hashed});
        const token  = createToken(user._id);
        res.status(201).json({
            success:true,
            message:"User register successfully.",
            token,
            user:{id:user._id,name:user.name,email:user.email}
        });
    }
    catch (error) {
        return res.status(500).json({
            success:false,
            message:"Server Error."
        });
    }
    
 }

 // LOGIN user
 export async function loginUser(req,res) {
    const {email,password}= req.body;
    if(!email || !password){
        return res.status(400).jeson({
            success:false,
            message:"Both fields are required."

        })
    }
    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({
                success:false,
                message:"User not found."
            });
        }

        const match = await bcrypt.compare(password,user.password)
        if(!match){
            return res.status(401).json({
                success:false,
                message:"Invalid Password"
            })
        }

        const token = createToken(user._id);
        res.json({
            success:true,
            token,
            user:{
                id:user._id,
                name:user.name,
                emai:user.email;
            }
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Server Error."
        });
    }
    
 }

 // Get User

 export async function getCurrentUser(req,res) {
    try {
        const user = await User.findById(req.user.id).select("name email");
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found"
        })}
        res.jeson({
            success:true,user 
        })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Server Error."
        });
    }
 }

 // to update user profile
 export async function updsteProfile(req,res){
    const {name.email} = req.body;
    if(!email || !name || !validator.isEmail(email)){
        return res.status(400).json({
            success:false,
            message:"Valid Email and Name are required."
        })
    }
    try {
        const exist = await User.findOne({email, _id:{$ne:req.user.id}});
        if(exist){
            return res.status(409).json({
                success:false,
                message:"Email already in use by another user."
            })
        }
        const user = await User.findByIdAndUpdate(
            req.user.id,
            {name,email},
            {new:true, runValidators:true,select:"name email"}
        );

        res.jeson({
            success:true,
            user
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Server Error."
        });
    }
 }