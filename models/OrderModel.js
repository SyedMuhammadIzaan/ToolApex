import mongoose from "mongoose";
const { Schema } = mongoose;

const OrderSchema = new Schema({
	cartItems: [
		{
			productName: {
				type: String,
				originalPrice: Number,
				discountPrice: Number,
				quantity: Number,
			},
		},
	],
	subTotal: {
		type: Number,
		required: true,
	},
	shipping: {
		type: String,
		required: true,
	},
	tax: {
		type: Number,
		required: true,
	},
	total: {
		type: Number,
		required: true,
	},
	contactInfo: {
		fullName: {
			type: String,
			required: true,
		},
		emailAddress: {
			type: String,
			required: true,
			unique: true,
		},
		phoneNo1: {
			type: Number,
			required: true,
		},
		phoneNo2: {
			type: Number,
			required: true,
		},
	},
	shippingAddress: {
		address1: {
			type: String,
			required: true,
		},
		address2: {
			type: String,
			required: true,
		},
		city: {
			type: String,
			required: true,
		},
		postalCode: {
			type: String,
			required: true,
		},
		nearestLandMark: {
			type: String,
			required: true,
		},
	},
	paymentResult:{
		id:{type:String},
		status:{type:String},
		payerName:{type:String},
		email:{type:String},
	},
},{timestamps:true});

const Order = mongoose.model("Order", OrderSchema);

export default Order;
