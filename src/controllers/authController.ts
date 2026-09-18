import UserModel from "../models/user.model";
import bcrypt from "bcrypt"
import { Response ,Request} from "express";
import jwt from "jsonwebtoken"
export const register=async(req:Request,res:Response)=>{
  try{
    const { username, email, password } = req.body;
    if(!username || !email || !password){
      return res.status(400).json({message:"All fields are required"})
    }
    if(password.length <6){
      return res.status(400).json({message:"password must be at least 6 characters"})
    }
    const existEmail =await UserModel.findOne({$or:[{username: username.trim()} ,{email:email.trim().toLowerCase()}]})
    if(existEmail){
      return res.status(400).json({message:"username or email already exists"})
    }
    const hashedPassword =await bcrypt.hash(password,10)
    const user =await UserModel.create({
      username:username.trim(),
      email:email.trim().toLowerCase(),
      password:hashedPassword
    })
      const userObject = user.toObject();
      delete (userObject as Partial<typeof userObject>).password
    res.status(200).json({message:"user register successfully",user:userObject})
  }catch(error){
    console.log("Registration error",error);
    res.status(500).json({message:"Server error"})
  }
}
export const login=async(req:Request,res:Response)=>{
  try{
    const {email, password}=req.body
    if(!email.trim() || !password.trim()){
      return res.status(404).json({message:"email and password are required"})
    }
    const user =await UserModel.findOne({email:email.trim().toLowerCase()})
  if(!user){
    return res.status(404).json({message:"user is not found"})
  }
const isMatch = await bcrypt.compare(password,user.password);
  if(!isMatch){
    return res.status(400).json({message:"password or email is uncorrect"})
  }
  const token = jwt.sign(
    { email: user.email, userId: user._id },
    process.env.JWT__SECRET as string,
    {expiresIn:"7d"}
  );
const userObject =user.toObject()
delete (userObject as Partial <typeof userObject>).password
res.status(200).json({ sucess:true  ,message:"successfully Login in Real time app" ,user:userObject ,token:token })
  }catch(error){
    console.log("error in login", error)
    res.status(500).json({success:false, message:"error in login "})
  }
}
