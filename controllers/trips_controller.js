// Dependencies
const express = require('express')
const Trip = require('../models/trip.js')
const cloudinary = require('cloudinary').v2

// Router & Routes
const trips = express.Router()

// Index Route
trips.get('/', (req, res) => {
    Trip.find({}, (err, foundTrips) => {
        res.json(foundTrips)
    })
})

// Create Route
trips.post('/', (req, res) => {
    console.log(req.files)
    console.log(req.body)
    if (!req.files) {
        req.body.image = 'https://www.silverkris.com/wp-content/uploads/2018/05/Nature-and-Adventure-1920x1069-960x530.jpg'
        Trip.create(req.body, (err, newTrip) => {
            if (err) {
                console.log(err)
            } else {
                Trip.find({}, (err, foundTrips) => {
                    res.json(foundTrips)
                })
            }
        })
    } else {
        const img = req.files.image
        cloudinary.uploader.upload(img.tempFilePath, (err, data) => {
            if (err) {
                console.log(err)
            } else {
                req.body.image = data.url
                Trip.create(req.body, (err, newTrip) => {
                    if (err) {
                        console.log(err)
                    } else {
                        Trip.find({}, (err, foundTrips) => {
                            res.json(foundTrips)
                        })
                    }
                })
            }
        })
    }
})

// Edit Route
trips.put('/:id', (req, res) => {
    Trip.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedTrip) => {
        Trip.find({}, (err, foundTrips) => {
            res.json(foundTrips)
        })
    })
})

// Delete Route
trips.delete('/:id', (req, res) => {
    Trip.findByIdAndRemove(req.params.id, (err, deletedTrip) => {
        Trip.find({}, (err, foundTrips) => {
            res.json(foundTrips)
        })
    })
})

// Exports
module.exports = trips
