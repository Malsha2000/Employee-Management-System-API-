const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
//const bodyParser = require("body-parser");

const app = express();
dotenv.config();

app.use(cors());

mongoose
    .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("DB Connection successful"))
    .catch((err) => {
    console.log(err);
});

//Middleware
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to SyncTax");
    console.log(process.env.PORT);
});




const employeeRoute = require("./src/routes/Employee");
app.use("/api/employee", employeeRoute);

const LoginRoute = require("./src/routes/Login");
app.use("/api/login", LoginRoute);


app.listen(process.env.PORT || 5000, () =>
    console.log(`Server is up and running on PORT ${process.env.PORT}`)
);

