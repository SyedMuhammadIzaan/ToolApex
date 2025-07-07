import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";
import { loginValidation, signupValidation } from "../validators/UserValidation.js";

// Signup
export const signup = async (req, res) => {
  const { error, value } = signupValidation.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const userExist = await User.findOne({ email: value.email });
  if (userExist) return res.status(400).json({ error: "Email already exists" });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(value.password, salt);

  const user = new User({ ...value, password: hashedPassword });
  await user.save();

  // Email verification logic can go here

  res.status(201).json({ message: "User registered successfully" });
};

// Login
export const login = async (req, res) => {
  const { error, value } = loginValidation.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const user = await User.findOne({ email: value.email });
  if (!user) return res.status(400).json({ error: "Invalid email or password" });

  const validPass = await bcrypt.compare(value.password, user.password);
  if (!validPass) return res.status(400).json({ error: "Invalid email or password" });

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

  res.status(200).json({ message: "Login successful", token });
};
