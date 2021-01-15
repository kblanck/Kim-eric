// Dependencies
const express = require('express')
const Trip = require('../models/trip.js')

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
    Trip.create(req.body, (err, createdTrip) => {
        Trip.find({}, (err, foundTrips) => {
            res.json(foundTrips)
        })
    })
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
