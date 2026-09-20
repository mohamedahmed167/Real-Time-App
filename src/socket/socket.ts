import { Server } from "socket.io";
import jwt from "jsonwebtoken";

import UserModel from "../models/user.model";
import RoomModel from "../models/room.model";
import messageModel from "../models/message.model";

import { MyJWT } from "../middlewares/auth.middleware";

const onlineUser = new Set<string>();

const initializeSocket = (io: Server) => {
  io.on("connection", (socket) => {
    const token = socket.handshake.query.token as string;

    if (!token) {
      socket.emit("error", "Authentication error: No token provided");

      socket.disconnect();
      return;
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT__SECRET!) as MyJWT;

      UserModel.findById(decoded.userId)
        .then((user) => {
          if (!user) {
            socket.emit("error", "User Not found");
            socket.disconnect();
            return;
          }

          socket.data.userId = user._id.toString();
          socket.data.user = user;

          console.log("user Connected " + user.username);

          onlineUser.add(socket.data.userId);

          io.emit("user-online", {
            userId: socket.data.userId,
            username: user.username,
          });

          // =========================
          // JOIN ROOM
          // =========================

          socket.on("join-room", async (data) => {
            const roomId = data.roomId;

            if (!roomId) {
              socket.emit("error", "Room ID is required to join room");

              return;
            }

            if (!socket.data.userId) {
              socket.emit(
                "error",
                "Authentication error: user not Authenticated",
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
                  (m) => m.toString() === socket.data.userId,
                );

                if (!isMember) {
                  socket.emit(
                    "error",
                    "Access denied. You are not a member of this private room",
                  );

                  return;
                }
              }

              await socket.join(roomId);

              socket.emit("joined-room", {
                roomId,
              });

              console.log(
                `User ${socket.data.user.username} joined in private room ${room.name}`,
              );
            } catch (error) {
              if (error instanceof Error) {
                socket.emit(
                  "error",
                  "Error occurred while joining room: " + error.message,
                );
              }
            }
          });

          // =========================
          // SEND MESSAGE
          // =========================

          socket.on("send-message", async (data) => {
            const { roomId, text } = data || {};

            if (!roomId || !text?.trim()) {
              socket.emit("error", "Room id and text are Required");

              return;
            }

            if (!socket.data.userId) {
              socket.emit(
                "error",
                "Authentication error: user not Authenticated",
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
                socket.emit("error", "Error in send message: " + error.message);
              }
            }
          });

          // =========================
          // TYPING START
          // =========================

          socket.on("typing-start", (data) => {
            const roomId = data.roomId;

            if (!roomId || !socket.data.userId) {
              return;
            }

            socket.to(roomId).emit("user-typing", {
              userId: socket.data.userId,
              username: socket.data.user.username,
            });
          });

          // =========================
          // TYPING STOP
          // =========================

          socket.on("typing-stop", (data) => {
            const roomId = data.roomId;

            if (!roomId || !socket.data.userId) {
              return;
            }

            socket.to(roomId).emit("user-stop-typing", {
              userId: socket.data.userId,
              username: socket.data.user.username,
            });
          });
        })
        .catch((error) => {
          socket.emit("error", "Authentication error: " + error.message);

          socket.disconnect();
        });
    } catch (error: unknown) {
      if (error instanceof Error) {
        socket.emit("error", "Authentication error: " + error.message);
      }

      socket.disconnect();
    }

    // =========================
    // DISCONNECT
    // =========================

    socket.on("disconnect", () => {
      if (socket.data.userId) {
        onlineUser.delete(socket.data.userId);

        io.emit("user-offline", {
          userId: socket.data.userId,
        });
      }

      console.log("user is disconnect " + socket.id);
    });
  });
};

export default initializeSocket;
