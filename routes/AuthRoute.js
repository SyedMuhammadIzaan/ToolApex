import express from "express";
import { login, signUp,forgotPassword, resetPassword } from "../controller/AuthController.js";
const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.post("/forgot-password", forgotPassword); 
router.post("/reset-password/:token", resetPassword); 

export default router;
