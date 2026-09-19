import  express  from "express";
import { createRoom, getRoomById, getRoomMessage, getRooms } from "../controllers/room.Controller";
import { auth } from "../middlewares/auth.middleware";
const router =express.Router()

router.post("/createRoom",auth,createRoom)
router.get("/Rooms",auth,getRooms)
router.get("/Room/:id",auth,getRoomById)
router.get("/RoomMessage/:id/messages",auth,getRoomMessage)
export default router
