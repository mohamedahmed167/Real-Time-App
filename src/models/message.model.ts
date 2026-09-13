import mongoose from "mongoose";
const messageSchema =new mongoose.Schema({
  room:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"room",
    required:true
  },
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user",
    required:true
  },
  text:{
    type:String,
    required:true,
    trim:true,
    maxlength:5000
  }
},{
  timestamps:true
})
const messageModel=mongoose.model("message",messageSchema)
export default  messageModel
