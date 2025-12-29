const foodpartnermodels = require('../models/foodParter.model')
const usermodels = require("../models/User.model")
const jwt = require("jsonwebtoken")

async function authFoodPartnerMiddleware(req, res, next) {
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({message :"Please login First "})
    }

    try {
    const decoded = jwt.verify(token,process.env.JWT_SECRET)

    const foodPartner = await foodpartnermodels.findById(decoded.id)

    req.foodPartner = foodPartner

    next()
        
    } catch (error) {
        return res.status(401).json({message:"invalid token"})
    }
}

async function authUserMiddleware(req,res,next) {
    const token = req.cookies.token

    if(!token){
        return res.status(401).json({message:"Please Login First"})
    }

    try {
        
        const decoded  = jwt.verify(token, process.env.JWT_SECRET)

        const user =await usermodels.findById(decoded.id)

        req.user = user 

        next()

    } catch (error) {
        return res.status(401).json({
            message : "Invalid Token "
        })
    }
}

module.exports={
    authFoodPartnerMiddleware,
    authUserMiddleware
}