const foodpartnermodels = require('../models/foodParter.model')
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


module.exports={
    authFoodPartnerMiddleware
}