import express from "express";
import dotenv from "dotenv"
import cors from "cors"
import connectDB from "./config/db";
import http from "http"
import {Server} from "socket.io"
dotenv.config()
const app =express()
const server =http.createServer(app)
// create server from http


// create io  from Server
const io =new Server(server,{
   cors:{
    origin:"*"
   }
})
const PORT =process.env.PORT || 5000
connectDB()


// Middlewares
app.use(express.json())
app.use(cors())



app.get("/",(req,res)=>{
  res.send("hello world")
})
app.get("/health",(req,res)=>{
  res.status(200).json({status:"ok"})
})
app.set("io",io)
io.on("connection",(socket)=>{
  console.log(" a user connected   " + socket.id)
  socket.on("disconnect",()=>{
    console.log("user is disconnect  " + socket.id)
  })
})

server.listen( PORT,()=>{
  console.log(`the server is running in the port ${PORT}`)
})
