import { Request ,Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";
 export const errorHandler=async(err:ApiError, req:Request ,res:Response ,next:NextFunction)=>{
res.status(err.statusCode ||500).json({message:err.message || "Internal Server ERROR"})
}
