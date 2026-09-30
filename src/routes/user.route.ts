import { getCurrnetUser, login, register } from "../controllers/authController";
import express from "express";
import { auth } from "../middlewares/auth.middleware";
 const router =express.Router()
router.post("/register" ,register)
router.post("/login",login)
router.get("/me", auth, getCurrnetUser);
export default router
