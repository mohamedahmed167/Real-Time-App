import jwt from "jsonwebtoken"
import UserModel from "../models/user.model"
import { NextFunction, Request ,Response } from "express"
import { Types } from "mongoose"


export interface MyJWT {
  userId:string
}
export interface AuthRequest extends Request{
user?:{
  _id:Types.ObjectId
}
}

export const auth =async(req:AuthRequest ,res:Response,next:NextFunction)=>{
  try{
    const authHeader =req.headers.authorization
    if(!authHeader ||!authHeader.startsWith("Bearer ")){
      return res.status(401).json({message:"authorization header missing or maltformed"})
    }
    const token =authHeader.split(" ")[1]
    const decoded = jwt.verify(token!, process.env.JWT__SECRET!)as MyJWT;
    const user=await UserModel.findById(decoded.userId)
    if(!user){
      return res.status(401).json({message:"User not Found"})
    }
    req.user! =user
    next()
  }catch(error){
    console.log("error in middleware",error)
    return res.status(500).json({  success:false,message:"invaild token"})
  }
}
