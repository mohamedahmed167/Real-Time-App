import mongoose from "mongoose"
const connectDB =async()=>{
  try {
    await mongoose.connect(process.env.MongoDB_URI as string);
    console.log("MongoDB is connected")

  } catch (error) {
    console.log("error in connection in database",error)
  }
}

export default connectDB
