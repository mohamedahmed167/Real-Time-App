import RoomModel from "../models/room.model";
import { Request, Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import messageModel from "../models/message.model";
import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError";

export const createRoom = async (req: AuthRequest, res: Response) => {
  try {
    const { name, description, isPrivate } = req.body;

    if (!name?.trim()) {
      throw new ApiError(400, "name is required");
    }

    const room = await RoomModel.create({
      name: name.trim(),

      isPrivate: isPrivate === true,

      description: description?.trim(),

      createdBy: req.user!._id || undefined,
    });

    const populated = await RoomModel.findById(room._id).populate(
      "createdBy",
      "username displayName",
    );

    res.status(201).json(populated);
  } catch (error) {
    console.log(`error creating room`, error);

    throw error;
  }
};

export const getRooms = async (req: Request, res: Response) => {
  try {
    const rooms = await RoomModel.find()
      .populate("createdBy", "username displayName")
      .sort({ createdAt: -1 })
      .lean();

    res.json(rooms);
  } catch (error) {
    console.log(`error getting rooms`, error);

    throw error;
  }
};

export const getRoomById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const room = await RoomModel.findById(id)
      .populate("createdBy", "username displayName")
      .lean();

    res.json(room);
  } catch (error) {
    console.log(`error get room by id`, error);

    throw error;
  }
};

export const getRoomMessage = async (req: Request, res: Response) => {
  try {
    const { roomId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(roomId as string)) {
      throw new ApiError(400, "Invalid room ID");
    }

    const Query = req.query.limit as string;

    const limit = Number(Math.min(parseInt(Query) || 50, 100));

    const skip = parseInt(req.query.skip as string) || 0;

    const message = await messageModel
      .find({
        room: new mongoose.Types.ObjectId(roomId as string),
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .populate("user", "username displayName")
      .lean();

    res.json(message);
  } catch (error) {
    console.log("error in getRoom message", error);

    throw error;
  }
};
