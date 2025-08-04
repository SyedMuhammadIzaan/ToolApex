import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import User from "../models/UserModel.js";
import serverConfig from "../config/serverConfig.js";
import {
	forgotPasswordValidation,
	loginValidation,
} from "../validators/UserValidation.js";
import sendEmail from "../utils/sendMail.js";

// Signup
export const signUp = async (req, res) => {
  try {
    const { name, email, password,currentPassword } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "Email already exists" });

    const newUser = await User.create({ name, email, password,currentPassword });
    res.status(201).json({ message: "Registered successfully", user: newUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Login
export const login = async (req, res) => {
  try {
    console.log("req bofy",req.body)
	const {error,value}=loginValidation.validate(req.body);
  console.log("Value",value)
	if (error) return res.status(400).json({ error: error.details[0].message });
    const user = await User.findOne({email:value.email});
    if (!user || !(await bcrypt.compare(value.password, user.password))) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign({ userId: user._id }, serverConfig.jwtSecret, { expiresIn: "1d" });
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const forgotPassword = async (req, res) => {
	try {
		const { error, value } = forgotPasswordValidation.validate(req.body);
		if (error) return res.status(400).json({ error: error.details[0].message });
		const user = await User.findOne({ email:value.email });
		console.log("User",user)
    	if (!user) return res.status(404).json({ message: "User not found" });

    	const resetToken = crypto.randomBytes(32).toString("hex");
    	user.resetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    	user.resetTokenExpires = Date.now() + 15 * 60 * 1000; // 15 minutes
    	await user.save();

    	const resetUrl = `http://localhost:3005/auth/reset-password/${resetToken}`;
    	await sendEmail(value.email, "Reset Password", `Reset here: ${resetUrl}`);

    	res.status(200).json({ message: "Reset link sent to email" });
	} catch (error) {
		res.status(500).json({ error: "Server error", details: error.message });
	}
};


export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
	// console.log("Token",token)
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({
      resetToken: hashedToken,
      resetTokenExpires: { $gt: Date.now() },
    });
	console.log("User",user)
    if (!user) return res.status(400).json({ message: "Token is invalid or expired" });

    user.password = password;
    user.resetToken = undefined;
    user.resetTokenExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};