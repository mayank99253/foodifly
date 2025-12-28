// create the server in this app jsx

const express = require('express')
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes')

const app = express();
app.use(cookieParser()) // we use it to save the token in cookie but use it as a middleware
app.use(express.json())  // this middleware convert data in json format

app.get("/", (req, res) => {
    res.send("hello world") 
})
app.use('/api/auth',authRoutes)

module.exports = app