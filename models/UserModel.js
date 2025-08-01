import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		currentPassword: {
			type: String,
			required: true,
		},
		isVerified: {
			type: Boolean,
			default: false,
		},
		resetToken: String,
		resetTokenExpires: Date,
	},
	{ timestamps: true }
);

UserSchema.pre("save",async function (next){
	if(!this.isModified("password")) return next();
	this.password=await bcrypt.hash(this.password,10);
})
const User = mongoose.model("User", UserSchema);
export default User;
