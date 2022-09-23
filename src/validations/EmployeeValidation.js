const joi = require("joi");

//Employee validation
const employeeValidation = (data) => {
	const schemaValidation = joi.object({
		empID: joi.string().required(),
		firstName: joi.string().required(),
		lastName: joi.string().required(),
		email: joi.string().required(),
		phoneNumber: joi.string().required(),
		NIC: joi.string().required(),
        address: joi.string().required(),
        position: joi.string().required(),
		password: joi.string().required(),
	});

	return schemaValidation.validate(data);
};

module.exports.employeeValidation = employeeValidation; //export functions
