// connect DB to server

const mongoose = require('mongoose')

function connectDB(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("MongoDB Connected successfully")
    }).catch((err)=>{
        console.log("Database Connection Failed")
    })
}

module.exports = connectDB