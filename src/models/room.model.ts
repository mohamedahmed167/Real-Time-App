import mongoose from "mongoose";
const roomSchema =new mongoose.Schema({
  name:{
    type:String,
    required:true,
    trim:true,
    minlength:3,
  },
  description:{
    type:String,
    trim:true,
    default: ""
  },
  createdBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user",
    required:true
  },
  isPrivate:{
    type:Boolean,
    default:false
  },
  members:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user"
  }],

},{
  timestamps:true
})
const RoomModel =mongoose.model("room",roomSchema)
export default RoomModel
