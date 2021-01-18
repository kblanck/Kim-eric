// Dependencies
const mongoose = require('mongoose')
const Comment = require('./comment.js')

// Create schema
const tripSchema = new mongoose.Schema({
    name: String,
    date: String,
    description: String,
    image: String,
    comments: [Comment.schema],
})

// Create collection
const Trip = mongoose.model('trips', tripSchema)

// Exports
module.exports = Trip
