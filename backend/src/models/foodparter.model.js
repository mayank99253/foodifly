const mongoose = require('mongoose')

const foodpartnerSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    }
})

const foodPartermodel = mongoose.model('foodpartner', foodpartnerSchema)

module.exports = foodPartermodel