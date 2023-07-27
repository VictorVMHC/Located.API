const mongoose = require('mongoose');
const GuestUser = require('../Models/GuestUser');

const dbConnection = () => {
    console.log(process.env.MONGO_CONNECTION);
        mongoose.connect(process.env.MONGO_CONNECTION, {
            dbName: process.env.MONGO_DBNAME,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => console.log('Connection Successful'))
        .catch((err) => console.error('Error connecting to MongoDB:', err));

        GuestUser.createIndexes({ logDate: 1 }, { expireAfterSeconds: 86400 })
            .then(() => {
                console.log('Index TTL for guest user successfully created.');
            })
            .catch((err) => {
                console.error('Error when creating index TTL for guest user:', err);
            });
} 

module.exports = dbConnection;