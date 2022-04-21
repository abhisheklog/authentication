
const express = require('express');
const User = require('./userModel');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {protect, getUser} = require('./authMiddleware');
//const generateToken = require('./generateToken');

router.post('/register', async(req, res) => {
    const {name, email, password} = req.body;
   
  /*  if(!name || !email || !password) {
        res.status(400)
        throw new Error('please add fields')
    }  */
    
    try {
        const userExist = await User.findOne({email})
        if(userExist) {
            return res.status(400).json({message: "user already exist"});
        
        }
    } catch (error) {
        console.log(error)
    }

    try {
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        const user = await User.create({
            name,
            email,
            password: hashPassword
        })
        if(user) {
            return res.status(201).json({
            message: "New User Registered",
            user
        })
    
        } else {
            return res.status(400);
            throw new Error('user exist')
        } 
        
    } catch (error) {
        console.log(error)
    }
 
})

router.post('/login', async(req, res) => {
    const {email, password} = req.body;
    
    try {
        const user = await User.findOne({email})
        if(!user) {
            res.status(400).json({message:"please register first"})
        }
        if(user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign({id: user._id}, 'secret123')
            res.json({
                message: "successfully logged in",
                user,
                token
            })
        } else {
            res.status(400).json({message: "invalid email or password"})
        }


    } catch (error) {
        console.log('login error')
    }
})

/* router.get('/verifyuser', async(req, res) => {
    const token = req.headers[`authorization`];
    console.log(token)
})  */

router.get('/verifyuser', protect, getUser)



module.exports = router;