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
import RoomModel from "./models/room.model";
import messageModel from "./models/message.model";
import RoomRouter from "./routes/room.routes"




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
app.use("/api",RoomRouter)
app.get("/", (req, res) => {
  res.send("hello world");
});
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});
app.set("io", io);

const onlineUser =new Set() // تخزين الاونلاين


io.on("connection", (socket) => {
  const token = socket.handshake.query.token as string;
  if (!token) {
    socket.emit("error", "Authentication error  :No token provided ");
    socket.disconnect();
    return;
  }
  try {
    const decoded = jwt.verify(token!, process.env.JWT__SECRET!) as MyJWT;
    UserModel.findById(decoded.userId)
      .then((user) => {
        if (!user) {
          socket.emit("error", " User Not found ");
          socket.disconnect();
          return;
        }
        socket.data.userId = user._id.toString();
        socket.data.user = user;
        console.log("user Connected " + user.username);
        onlineUser.add(socket.data.userId)
        io.emit("user-online",{userId:socket.data.userId ,username:user.username})

        socket.on("join-room", async (data) => {
          const roomId = data.roomId;
          if (!roomId) {
            socket.emit("error", "Room ID is required to join room");
            return;
          }
          if (!socket.data.userId) {
            socket.emit(
              "error",
              "Authentication error : user not Authenticated",
            );
            return;
          }
          try {
            const room = await RoomModel.findById(roomId);
            if (!room) {
              socket.emit("error", "Room not found");
              return;
            }
            if (room.isPrivate) {
              const isMember = room.members?.some(
                (m) => m.toString() == socket.data.userId,
              );
              if (!isMember) {
                socket.emit(
                  "error",
                  "Access denied you are not a members of this private room  ",
                );
                return;
              }
              await socket.join(roomId);
              socket.emit("joined-room", { roomId });
              console.log(
                `User ${socket.data.user.username} joined in private room ${room.name}  `,
              );
              socket.emit("");
            }
          } catch (error) {
            if (error instanceof Error) {
              socket.emit(
                "error",
                "error occurred while joining room  " + error.message,
              );
            }
          }
        });
        socket.on("send-message", async (data) => {
          const { roomId, text } = data || {};
          if (!roomId || !text?.trim()) {
            socket.emit("error", "Room id and text are Required");
            return;
          }
          if (!socket.data.userId) {
            socket.emit(
              "error",
              "Authentication error :user not Authenticated",
            );
            return;
          }
          try {
            const message = await messageModel.create({
              room: roomId,
              user: socket.data.userId,
              text: text.trim(),
            });
            const populated = await messageModel
              .findById(message._id)
              .populate("user", "username displayName")
              .lean();

            io.to(roomId).emit("new-message", populated);
          } catch (error) {
            if (error instanceof Error) {
              socket.emit("error", "error in send message", error.message);
            }
          }
        });
      })
      .catch((error) => {
        socket.emit("error", "Authentication error", error.message);
        socket.disconnect();
      });
  } catch (error: unknown) {
    if (error instanceof Error) {
      socket.emit("error", "Authentication error", error.message);
    }
    socket.disconnect();
  }

  socket.on("disconnect", () => {
    if(socket.data.userId){
      onlineUser.delete(socket.data.userId);
      io.emit("user-offline",{userId:socket.data.userId})
    }
    console.log("user is disconnect  " + socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`the server is running in the port ${PORT}`);
});
