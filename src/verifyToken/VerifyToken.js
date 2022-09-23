const jwt = require("jsonwebtoken");

const auth = (req,res,next) => {
    const token = req.header("authToken");

    if(!token) {
        return res.status(401).send({message: "Access Denied"});
    }

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    }
    catch(err) {
        return res.status(401).send({message: "Access denied"});
    }
}

module.exports = auth;