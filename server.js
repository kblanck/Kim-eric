// Dependencies
const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

// Config
const app = express()
const PORT = process.env.PORT

// Middleware
app.use(express.json())
app.use(express.static('public'))

// Controllers

// Connect to DB
const MONGODB_URI = process.env.MONGODB_URI
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
mongoose.connection.on('error', (err) =>
    console.log(err.message,' is Mongod not running?/Problem with Atlas Connection?'))
mongoose.connection.on('connected', () =>
    console.log('mongo connected: ', MONGODB_URI))
mongoose.connection.on('disconnected', () =>
    console.log('mongo disconnected'))

// Listener
app.listen(PORT, () => {
    console.log("listening on port:" + PORT)
})
