// utils/sendEmail.js
import nodemailer from "nodemailer";

const sendEmail = async (to, subject, text) => {
	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: process.env.EMAIL_USER, // Your Gmail address
			pass: process.env.EMAIL_PASS, // App password, not your real Gmail password
		},
	});

	const mailOptions = {
		from: process.env.EMAIL_USER,
		to,
		subject,
		text,
	};

	await transporter.sendMail(mailOptions);
};

export default sendEmail;
