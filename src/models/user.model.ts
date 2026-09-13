import mongoose from "mongoose";
const userSchema =new mongoose.Schema({
  username:{
    type:String,
    required:true,
    unique:true,
    trim:true,
    minlength:3,
  },
  email :{
    type:String,
    unique:true,
    trim:true,
    lowercase:true,
    required:true
  },
  password:{
    type:String,
    required:true,
    minlength:6,
    trim:true
  },
  displayName:{
    type:String,
    trim:true,
    default:""
  },
  avatar:{
    type:String,
    default:""
  }
},{timestamps:true})
const UserModel =mongoose.model("user",userSchema)
export default UserModel
