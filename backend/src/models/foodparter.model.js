const mongoose = require('mongoose')

const foodSchema = new mongoose.Schema({
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

const foodpartermodel = mongoose.model('foodpartner', foodSchema)

module.exports = foodpartermodel