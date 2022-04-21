const dotenv = require('dotenv');
const express = require('express');
const mongoose = require("mongoose")
const connectDB = require('./config/db');
dotenv.config({path: "./config.env"});
const router = require('./router')
const cors = require("cors")
//connectDB();


const server = express();
server.use(cors());
server.use(express.json());


mongoose.connect('mongodb+srv://abhi:abhi123@cluster0.ge6tc.mongodb.net/crudtask?retryWrites=true&w=majority', 
() => console.log(`mongodb sucessfull`))

server.use('/api/user', router);


const port = process.env.PORT || 5000;

server.listen(port, () => console.log(`server is running on port ${port}`))
