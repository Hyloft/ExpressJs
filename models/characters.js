const mongoose = require('mongoose');


const characterSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    subscribers:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Subscriber'
    }]
})

module.exports = mongoose.model('Character',characterSchema)