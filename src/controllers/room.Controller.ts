import RoomModel from "../models/room.model";
import { Request ,Response } from "express";
const createRoom =async(req:Request ,res:Response)=>{
  try{
    const { name, description ,  isPrivate} =req.body;
    if(!name?.trim()){
      return res.status(400).json({message:"name is required"})
    }

  }catch(error){

  }

}
