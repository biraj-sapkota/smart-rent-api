const express = require('express')
require('dotenv').config()
const connectToMongo = require('./config/dbConnection')

connectToMongo();
const app = express()

app.get("/", (req, res) => {
    res.send("Welcome to Smart Rent API!!")
})

app.listen(process.env.port, () => {
    console.log(`App running at http://localhost:${process.env.port}`)
})