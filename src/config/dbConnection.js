const mongoose = require('mongoose')
require('dotenv').config()

mongoose.set('strictQuery', false);
const connectToMongo = () => {
    mongoose.connect(process.env.mongoURI, () => {
        console.log("Database connection successful.")
    })
}

module.exports = connectToMongo