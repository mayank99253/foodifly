// user model code write/read here 
const express = require('express')
const { default: mongoose } = require('mongoose')

const userSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required:true
    },
    email:{
        type:String,
        required:true, 
        unique:true
    },
    password:{
        type:String,
        required:true
    }
},{
    timestamps:true // timestrap maintain the that when is user created or what is the last time of user edit its details 
})

const userModel = mongoose.model("user",userSchema)
module.exports = userModel