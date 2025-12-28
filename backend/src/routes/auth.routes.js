// creating router 

const express = require('express')
const authcontroller = require('../controllers/auth.controller')


const router = express.Router()

router.post('/user/register',/*controller*/authcontroller.registerUser) 
router.post('/user/login',/*controller*/authcontroller.loginUser) 
router.get('/user/logout',/*controller*/authcontroller.logoutUser) 

// User = here user is a model , basically it is schema 
//(req,res)=>{} = controller we don't write the code of this controller here , for read/write the code of controller , go in controller file 

router.post('/food-partner/register',/*controller*/authcontroller.registerFoodPartner) 
router.post('/food-partner/login',/*controller*/authcontroller.loginFoodPartner) 
router.get('/food-partner/logout',/*controller*/authcontroller.logoutFoodPartner) 

module.exports = router 