const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    isAdmin:{
        type: Boolean,
        required: true,
        default: false
    },
    joinDate:{
        type:Date,
        default : Date.now
    }
})

module.exports = mongoose.model('User',userSchema)