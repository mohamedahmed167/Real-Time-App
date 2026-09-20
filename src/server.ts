import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import http from "http";
import Authrouter from "./routes/user.route";
import RoomRouter from "./routes/room.routes"
import { Server } from "socket.io";
import initializeSocket from "./socket/socket";
import { errorHandler } from "./middlewares/apiError.middlewars";


dotenv.config();
const app = express();
const server = http.createServer(app);
// create server from http



const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const PORT = process.env.PORT || 5000;
connectDB();

// Middlewares
app.use(express.json());
app.use(cors());
app.use("/api", Authrouter);
app.use("/api",RoomRouter)
app.get("/", (req, res) => {
  res.send("hello world");
});
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

//  API ERROR HANDLER
app.use(errorHandler)

// Socket server
initializeSocket(io)
app.set("io",io)


server.listen(PORT, () => {
  console.log(`the server is running in the port ${PORT}`);
});
