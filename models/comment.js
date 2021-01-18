// Dependencies
const mongoose = require('mongoose')

// Create schema
const commentSchema = new mongoose.Schema({
    commenter: String,
    comment: String,
})

// Create collection
const Comment = mongoose.model('comments', commentSchema)

// Exports
module.exports = Comment
