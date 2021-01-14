// Dependencies
const mongoose = require('mongoose')

// Create schema
const tripSchema = new mongoose.Schema({
    name: String,
    date: String,
    description: String,
    image: String
})

// Create collection
const Trip = mongoose.model('trips', tripSchema)

// Exports
module.exports = Trip
