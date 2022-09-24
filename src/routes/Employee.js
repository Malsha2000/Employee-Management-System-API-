const router = require("express").Router();
const verifyToken = require("../verifyToken/verifyToken");
const {
    addEmployee,
    getEmployee,
    updateEmployee,
    deleteEmployee,
    getoneEmployee,
} = require("../controllers/EmployeeController");
const Employee = require("../model/EmployeeModel");

//define user routes
router.post("/add",verifyToken, addEmployee);
router.post("/all", verifyToken, getEmployee);
router.put("/update/:id", updateEmployee);
router.delete("/delete/:id", deleteEmployee);
router.get("/:id",   getoneEmployee);

module.exports = router;
