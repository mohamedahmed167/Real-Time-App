import UserModel from "../models/user.model";
import bcrypt from "bcrypt"
import { Response ,Request} from "express";

export const register=async(req:Request,res:Response)=>{
  try{
    const {username,email,password}=req.body;
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
    const userObject=user.toObject()
    const {password ,...safeuser} =userObject
    res.status(200).json({message:"user register successfully",user:safeuser})
  }catch(error){

  }
}
