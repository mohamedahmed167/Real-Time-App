import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import http from "http";
import { Server } from "socket.io";
import Authrouter from "./routes/user.route";
import jwt from "jsonwebtoken";
import UserModel from "./models/user.model";
import { MyJWT } from "./middlewares/auth.middleware";
dotenv.config();
const app = express();
const server = http.createServer(app);
// create server from http

// create io  from Server
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

app.get("/", (req, res) => {
  res.send("hello world");
});
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});
app.set("io", io);
io.on("connection", (socket) => {
  const token = socket.handshake.query.token as string;
  if (!token) {
    socket.emit("error", "Authentication error  :No token provided ");
    socket.disconnect();
    return;
  }
  try {
    const decoded = jwt.verify(token!, process.env.JWT__SECRET!) as MyJWT;
    UserModel.findById(decoded.userId).then((user) => {
      if (!user) {
        socket.emit("error", " User Not found ");
        socket.disconnect();
        return;
      }
    });
  } catch (error) {}

  socket.on("disconnect", () => {
    console.log("user is disconnect  " + socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`the server is running in the port ${PORT}`);
});
