import express from "express";
import { login, signup } from "../controller/AuthController.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
// router.post("/forgot-password", forgotPassword); // optional
// router.post("/reset-password/:token", resetPassword); // optional

export default router;
