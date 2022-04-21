const express = require('express')
const mongoose = require('mongoose');

const connectDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }); 
        Console.log(`mongodb connected`)
    } catch (error) {
        console.log('mongodb not connected')
        process.exit();
    
    }
}

//module.exports = connectDB;