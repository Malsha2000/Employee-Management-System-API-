const { date, boolean } = require("joi");
const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema(
	{
		empID: {
			type: String,
			required: true,
		},

		firstName: {
			type: String,
			required: true,
		},

		lastName: {
			type: String,
			required: true,
		},

		email: {
			type: String,
			required: true,
		},

		phoneNumber: {
			type: String,
			required: true,
		},

		NIC: {
			type: String,
			required: true,
		},

		address: {
			type: String,
			required: true,
		},

		position: {
			type: String,
			required: true,
		},
		// add a password field here 

		password: {
			type:String,
			required:true,
		},
		isAdmin: {
			type: Boolean,
			required: true,
			default: false,
		}
	},
	{ timestamps: true },
);

module.exports = mongoose.model("Employee", EmployeeSchema);
