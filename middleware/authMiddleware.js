import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";
import serverConfig from "../config/serverConfig.js";

const protect = async (req, res, next) => {
	try {
		const authHeader = req.headers.authorization;

		if (!authHeader || !authHeader.startsWith("Bearer ")) {
			return res.status(401).json({ message: "Not authorized, no token" });
		}

		const token = authHeader.split(" ")[1];

		const decoded = jwt.verify(token, serverConfig.jwtSecret);

		// Attach user to request
		req.user = await User.findById(decoded.userId).select("-password");

		if (!req.user) {
			return res.status(401).json({ message: "User not found" });
		}

		next();
	} catch (error) {
		res.status(401).json({ message: "Not authorized", details: error.message });
	}
};

export default protect;
