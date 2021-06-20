require('dotenv').config()

const express = require('express');
const app = express()
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser:true})

const db = mongoose.connection

db.on('error',(error)=>{console.error(error)})
db.once('open',()=>{console.log('connected database')})

app.use(express.json())

const subscribersRouter = require('./routes/subscribers')
app.use('/subscribers',subscribersRouter)

const userRouter = require('./routes/users')
app.use('/users',userRouter)

const characterRouter = require('./routes/characters')
app.use('/characters',characterRouter)

app.listen(3000,()=> console.log('started'))