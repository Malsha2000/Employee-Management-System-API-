const Employee = require("../model/EmployeeModel");
const { employeeValidation } = require("../validations/employeeValidation");
const bcryptjs = require("bcryptjs");

//add employee function
const addEmployee = async (req, res) => {
	const validate = localStorage.getItem("isAdmin");

	if (validate === "true") {
		//validate the employee input fields
		const { error } = employeeValidation(req.body.data);
		if (error) {
			res.send({ message: error["details"][0]["message"] });
		}

		//to check employee already exist
		const employeeExist = await Employee.findOne({
			empID: req.body.empID,
		});
		if (employeeExist) {
			return res
				.status(400)
				.send({ message: "Employee already exist" });
		} 

		//encrypt the password
		const salt = await bcryptjs.genSalt(5);
        const hashPassword = await bcryptjs.hash(
            req.body.password,
            salt,
        );


		//assign data to the model
		const employee = new Employee({
			empID: req.body.empID,
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			phoneNumber: req.body.phoneNumber,
			NIC: req.body.NIC,
            address: req.body.address,
            position: req.body.position,
			password: hashPassword,
			isAdmin: req.body.isAdmin,
		});

		try {
			//save the data in the database
			const savedEmployee = await employee.save();
			res.send(savedEmployee);
		} catch (error) {
			//error handling
			res.status(400).send({ message: error });
		}
	} else {
		return res
			.status(403)
			.json("You do not have permission to access this");
	}
};

const getEmployee = async (req, res) => {
	try {
		const employee = await Employee.find();
		res.send(employee);
	} catch (error) {
		res.status(400).send({ message: error });
	}
};

const updateEmployee = async (req, res) => {
		const employeeId = req.params.id;

		try {
			const employee = await Employee.findById(employeeId);
			if (!employee) {
				res.status(404).json("No Employee Found");
			}

			const {
				
				firstName,
				lastName,
				email,
				phoneNumber,
				NIC,
                address,
                position,
				
			} = req.body;
			const updatedEmployee = await Employee.findByIdAndUpdate(employeeId, {
				
				firstName,
				lastName,
				email,
				phoneNumber,
				NIC,
                address,
                position,
				
			});

			res.status(200).json(updatedEmployee);
		} catch (err) {
			res.status(400).send({ message: err });
		}
};

const deleteEmployee = async (req, res) => {
	const validate = localStorage.getItem("isAdmin");

	if (validate === "true") {
		const employeeId = req.params.id;

		try {
			const employee = await Employee.findById(employeeId);

			if (!employee) {
				res.status(404).json("Employee Not Found");
			}

			const deletedEmployee = await Employee.findByIdAndDelete(employeeId);
			res.status(200).json(deletedEmployee);
		} catch (err) {
			res.status(400).json(err.message);
		}
	} else {
		return res
			.status(403)
			.json("You do not have permission to access this");
	}
};

const getoneEmployee = async (req, res) => {
	try {
		const employee = await Employee.findOne({ _id: req.params.id });

		if (!employee) {
			res.status(404).json("Employee Not Found");
		}
		res.status(200).json(employee);
	} catch (err) {
		res.status(400).json(err.message);
	}
};

module.exports = {
	addEmployee,
	getEmployee,
	updateEmployee,
	deleteEmployee,
	getoneEmployee,
}; //export functions
