const mongoose = require('mongoose');

const dbConnection = () => {
    console.log(process.env.MONGO_CONNECTION);
        mongoose.connect(process.env.MONGO_CONNECTION, {
            dbName: process.env.MONGO_DBNAME,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => console.log('Connection Successful'))
        .catch((err) => console.error('Error connecting to MongoDB:', err));
} 

module.exports = dbConnection;