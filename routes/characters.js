const express = require('express');
const router = express.Router()
const Character = require('../models/characters')

//Get all
router.get('/',async(req,res)=>{
    try {
        const characters = await Character.find().populate('user subscribers')
        res.json(characters)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})
//Get one
router.get('/:id', getCharacter, (req,res)=>{
    res.json(res.character)
})
//Create one
router.post('/',async(req,res)=>{
    const character = new Character({
        name: req.body.name,
        user: req.body.user,
        subscribers: req.body.subscribers
    })
    try {
        console.log('tried')
        const newChr = await character.save()
        console.log('ok')
        res.status(201).json(newChr)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
})
//Update
router.patch('/:id',getCharacter, async (req,res)=>{
    if(req.body.name != null){
        res.character.name = req.body.name
    }
    if(req.body.user != null){
        res.character.user = req.body.user
    }
    try {
        const updatedChr = await res.character.save()
        res.json(updatedChr)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
})
//Delete
router.delete('/:id',getCharacter, async (req,res)=>{
    try {
        await res.character.remove()
        res.json({message:'deleted'})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})

//helper functions
async function getCharacter(req,res,next){
    let character
    try {
        character = await Character.findById(req.params.id)
        if(character == null){
            return res.status(404).json({message:'cannot find any'})
        }
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
    res.character = character
    next()
}

module.exports = router