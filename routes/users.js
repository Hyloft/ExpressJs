const router = require('express').Router()
const User = require('../models/users')
const JWT = require('jsonwebtoken')
require('dotenv').config()

const skey = process.env.JWT_SECRET

const signToken = user=>{
    return JWT.sign({
        iss:'myweb',
        sub: user.id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() +1)
    },skey)
}

function ensureToken(req,res,next){
    const bearerHeader = req.headers['authorization']
    console.log(req.headers)
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(" ")
        const bearerToken = bearer[1]
        req.token = bearerToken;
        next()
    }else{
        res.sendStatus(403)
    }
}



router.post('/signup' , async (req , res)=>{
    const {name,password,isAdmin} = req.body

    const foundUser = await User.findOne({name})
    if (foundUser){
        return res.status(403).json({error:'name is taken'})
    }
    const newUser = new User({name,password,isAdmin});
    try {
        await newUser.save()
        const token = signToken(newUser)
        res.status(200).json(token)
    } catch (error) {
        res.status(400).json({message:error})   
    }
})

router.post('/signin',ensureToken,(req,res)=>{
    JWT.verify(req.token,skey,(err,data)=>{
        if(err){
            res.status(404).json({err})
        }else{
            res.json({data})
        }
    })
})


router.get('/' , async (req , res)=>{
    const users = await User.find();
    res.json(users)
})

module.exports  = router