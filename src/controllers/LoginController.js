const bcryptjs = require("bcryptjs");
const Employee = require("../model/EmployeeModel");
const jwt = require("jsonwebtoken");
const LocalStorage = require("node-localstorage").LocalStorage;
localStorage = new LocalStorage('./scratch');
const {LoginValidation} = require("../validations/LoginValidation");

const login = async (req,res,next) => {
    const {error} = LoginValidation(req.body);

    if(error) {
        res.send({message: error["details"][0]["message"]});
    }

    const EmployeeExist = await Employee.findOne({email: req.body.email});

    
    //if user is an admin
    if(EmployeeExist) {
        
        if(EmployeeExist.isAdmin === true) {
            localStorage.setItem("isAdmin", true);
        }

        //decrypt the password
        const passwordValidation = await bcryptjs.compare(req.body.password, EmployeeExist.password);
        if(!passwordValidation) {
            res.status(400).send({message: "Wrong password"});
        }
        
        //generate json web token
        try{
            const token = await jwt.sign({_id: EmployeeExist.id}, process.env.TOKEN_SECRET);
            res.header("authToken", token).send({
                'authToken':token,
                'roleData': EmployeeExist
            });
        }
        catch(err) {
            res.status(400).send({message: err});
        }

    }

    else {
        try{
            return res.status(400).send({message: "User does not exist"});
        }
        catch(err) {
            return res.status(400).send({message: err});
        }
    }
};



module.exports = {login};