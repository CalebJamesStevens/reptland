const express = require("express")
const router = express.Router();
const User = require("../models/User");
const Pet = require("../models/Pet");
const flash = require('connect-flash')

//File upload stuff
const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)
const {awsUploadFile: awsUploadFile, awsGetFile: awsGetFile} = require('../s3')
const multer = require('multer')
const upload = multer({dest: 'uploads/'})

router.get('/users-pets', async (req, res) => {
    if (!res.locals.currentUser) {
        return res.json({error: 'No current user'})
    }
    await Pet.find({owner: res.locals.currentUser._id})
        .populate('owner')
        .exec((err, pets) => {
            return res.json({pets})
        })
})

router.post('/add', async (req, res) => {
    if (!res.locals.currentUser) {
        return res.json({error: 'No current user'})
    }
    
    if (Object.keys(req.body).length === 0) {
        console.table(req.body)
        return res.json({error: 'No body'})
    }

    let pet = req.body.newPet;
    console.log(pet)
    pet.owner = res.locals.currentUser._id 
    pet.recordedWeights = 
        [
            {
                weight: pet.weight,
                time: new Date()
            }
        ]
    pet.recordedLengths = 
        [
            {
                length: pet.length,
                time: new Date()
            }
        ]    
    
    const newPet = new Pet(pet)

    newPet.save()
    .then(pet => {
        User.updateOne({_id: res.locals.currentUser._id}, {$push: {pets: pet._id}})
        .then(() => {
            return res.json(pet)

        })
    })
    .catch(error => {
        console.error(error)
        return res.json({error})
    })
})

router.post ('/update', async (req, res) => {
    if (!res.locals.currentUser) {
        return res.json({error: 'No current user'})
    }

    const {_id, weight, length, lastFed} = req.body;
    console.log(req.body)
    if (weight) {
        Pet.updateOne({_id: _id}, {$set: {weight: weight}, $push: {recordedWeights: {weight: weight}}})
        .then((pet) => {
            return res.json({weight: pet.weight, recordedWeights: pet.recordedWeights})
        })
        .catch((error) => {
            return res.json({error: error})
        })
    }

    if (length) {
         Pet.updateOne({_id: _id}, {$set: {length}, $push: {recordedLengths: {length}}})
        .then((pet) => {
            return res.json({length: pet.length, recordedLengths: pet.recordedLengths})
        })
        .catch((error) => {
            return res.json({error: error})
        })
    }

    if (lastFed) {
        Pet.updateOne({_id: _id}, {$set: {lastFed}, $push: {recordedFeeds: {food: lastFed.food, time: lastFed.time, result: lastFed.result}}})
        .then((pet) => {
            return res.json({lastFed: pet.lastFed, recordedFeeds: pet.recordedFeeds})
        })
        .catch((error) => {
            return res.json({error: error})
        })
    }

})

module.exports = router;