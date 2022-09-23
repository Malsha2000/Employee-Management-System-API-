const router = require("express").Router();
const verifyToken = require("../verifyToken/VerifyToken");
const {login, logout} = require("../controllers/LoginController");

router.post("/", login);

module.exports = router;