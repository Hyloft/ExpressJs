const mongoose = require('mongoose')

const subscriberSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    isSubscribed:{
        type: Boolean,
        required: true,
        default: true
    },
    subDate:{
        type:Date,
        default : Date.now
    }
})

module.exports = mongoose.model('Subscriber',subscriberSchema)