import RoomModel from "../models/room.model";
import { Request ,Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
export const createRoom = async (req: AuthRequest, res: Response) => {
  try {
    const { name, description, isPrivate } = req.body;
    if (!name?.trim()) {
      return res.status(400).json({ message: "name is required" });
    }
    const room = await RoomModel.create({
      name: name.trim(),
      isPrivate: isPrivate === true,
      description: description?.trim(),
      createdBy: req.user!._id || undefined,
    });
    const populated =await RoomModel.findById(room._id).populate("createdBy","username displayName" )
    res.status(201).json(populated)
  } catch (error) {
    console.log(`error creating room`,error)
    return res.status(500).json({error:"error occurred while creating room"})
  }
};

export const getRooms =async(req:Request, res:Response)=>{
try{
const rooms =await RoomModel.find().populate('createdBy',"username displayName" ).sort({createdAt :-1}).lean()
res.json(rooms)
}catch(error){
    console.log(`error creating room`, error);
    return res
      .status(500)
      .json({ error: "error occurred while creating room" });
}
}
