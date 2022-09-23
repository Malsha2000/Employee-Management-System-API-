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
router.get("/all", verifyToken, getEmployee);
router.put("/update/:id", updateEmployee);
router.delete("/delete/:id", verifyToken, deleteEmployee);
router.get("/:id",   getoneEmployee);

module.exports = router;
