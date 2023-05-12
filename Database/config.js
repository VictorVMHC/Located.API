const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_CONNECTION)
        console.log('Connection Successfull');
    } catch(err) {
        throw new Error("Error trying to connect to the database")
    }
} 

module.exports = dbConnection;