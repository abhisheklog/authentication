const jwt = require('jsonwebtoken');
const User = require("./userModel")

const protect = (req, res, next) => {
    const headers = req.headers[`authorization`];
    const token = headers.split(" ")[1];
    if(!token) {
        res.status(404).json({message: "no token found"})
    }
    jwt.verify(String(token), 'secret123', (err, user) => {
        if(err) {
            res.status(400).json({message: "invalid token"})
        }
        req.id = user.id;
        console.log(user.id);
    })
    next();
}

const getUser = async(req, res, next) => {
    const userId = req.id;
    let displayUser;
    try {
        displayUser = await User.findById(userId).select("-password");
    } catch (error) {
        console.log("error")
    }
    if(!displayUser) {
        res.status(400).json({message: "user not found"})
    }
    return res.status(200).json({message: "User display", displayUser})
}


module.exports = {protect, getUser};