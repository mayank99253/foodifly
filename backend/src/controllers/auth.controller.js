const userModel = require('../models/User.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const foodPartermodel = require('../models/foodParter.model');

async function registerUser(req, res) {
    const { fullName, email, password } = req.body;
    // but by default express can not read data which comes from body so that's why we use middleware in app.js

    const isUserAlreadyExists = await userModel.findOne({ email })

    if (isUserAlreadyExists) {
        return res.status(400).json({ message: "User Already Exists" })
    }

    // now create/use jwt and cookie parsor 
    // 1. use hashedPassword - why , when your database leaked then that's time we use hashedPassword for protecting the user information 

    const hashedPassword = await bcrypt.hash(password, 10) // 10 means how much round you want to bcryt your password , you can increase it but it is enough 

    // finally create a user 

    const user = await userModel.create({
        fullName,
        email,
        password: hashedPassword
    })

    // use token - why ? bcz when user req on our server then we know where is the req comes from ?
    // ok good but where we save the our token , we save the token in cookies 

    // for creating token - npm i jsonwebtoken
    // for creating cookies - npm i cookie-parser

    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET)

    res.cookie('token', token)  // save the token in cookie

    res.status(201).json({
        message: "User Registered Successfully",
        user: {
            _id: user._id,
            email: user.email,
            fullName: user.fullName
        }
    })


}

async function loginUser(req, res) {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email })

    if (!user) {
        return res.status(400).json({ message: "Invalid Email or Password" })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid Email or Password" })
    }

    const token = jwt.sign({
        _id: user._id,
    }, process.env.JWT_SECRET)
    res.cookie('token', token)

    res.status(200).json({
        message: "User Logged in Successfully",
        user: {
            id: user._id,
            email: user.email,
            fullName: user.fullName
        }
    })
}

function logoutUser(req, res) {
    res.clearCookie("token")
    res.status(200).json({ message: "User Logged Out Successfully" })
}

async function registerFoodPartner(req, res) {
    const { fullName, email, password } = req.body;

    const isEmailAlreadyExists = await foodPartermodel.findOne({ email })

    if (isEmailAlreadyExists) {
        return res.status(400).json({ message: "Email already Existed" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const foodpartner = await foodPartermodel.create({
        fullName,
        email,
        password: hashedPassword
    })

    const token = jwt.sign({
        id: foodpartner._id
    }, process.env.JWT_SECRET)

    res.cookie('token', token)

    res.status(201).json({
        messgae: "Food Partner User Register Successfully",
        foodpartner: {
            id: foodpartner._id,
            email: foodpartner.email,
            fullName: foodpartner.fullName
        }
    })
}

async function loginFoodPartner(req, res) {
    const { email, password } = req.body

    // if (!email || !password) {
    //     return res.status(400).json({ message: "Email and password are required" });
    // }

    const foodpartner = await foodPartermodel.findOne({ email })

    if (!foodpartner || !foodpartner.password) {
        return res.status(400).json({ message: "Invalid email or password" });
    }

    // if (!foodpartner) {
    //     return res.status(400).json({ message: "invalid email or password" })
    // }

    const isPasswordValid = await bcrypt.compare(password, foodpartner.password);

    if (!isPasswordValid) {
        return res.status(400).json({ messgae: "invalid email or password" })
    }

    const token = jwt.sign({
        id: foodpartner._id
    }, process.env.JWT_SECRET)

    res.cookie("token", token)

    res.status(200).json({
        message: "Food Partner Logged in Successfully",
        foodpartner: {
            id: foodpartner._id,
            email: foodpartner.email,
            fullName: foodpartner.fullName
        }
    }
    )
}

function logoutFoodPartner(req, res) {
    res.clearCookie("token")
    res.status(200).json({ messgae: "Food Parter Log Out Successfully" })
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    registerFoodPartner,
    loginFoodPartner,
    logoutFoodPartner
}