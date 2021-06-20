const { request, json } = require('express');
const express = require('express');
const router = express.Router()
const Subscriber = require('../models/subscriber')

//Get all
router.get('/',async(req,res)=>{
    try {
        const subscribers = await Subscriber.find()
        res.json(subscribers)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})
//Get one
router.get('/:id', getSubscriber, (req,res)=>{
    res.json(res.subscriber)
})
//Create one
router.post('/',async(req,res)=>{
    const subscriber = new Subscriber({
        name: req.body.name,
        isSubscribed: req.body.isSubscribed
    })
    try {
        const newSubscriber = await subscriber.save()
        res.status(201).json(newSubscriber)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
})
//Update
router.patch('/:id',getSubscriber, async (req,res)=>{
    if(req.body.name != null){
        res.subscriber.name = req.body.name
    }
    if(req.body.isSubscribed != null){
        res.subscriber.isSubscribed = req.body.isSubscribed
    }
    try {
        const updatedSub = await res.subscriber.save()
        res.json(updatedSub)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
})
//Delete
router.delete('/:id',getSubscriber, async (req,res)=>{
    try {
        await res.subscriber.remove()
        res.json({message:'deleted'})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})

//helper functions
async function getSubscriber(req,res,next){
    let subscriber
    try {
        subscriber = await Subscriber.findById(req.params.id)
        if(subscriber == null){
            return res.status(404).json({message:'cannot find any'})
        }
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
    res.subscriber = subscriber
    next()
}

module.exports = router