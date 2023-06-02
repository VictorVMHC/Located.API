const mongoose = require('mongoose');

const dbConnection = () => {
        mongoose.connect(process.env.MONGO_CONNECTION, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => console.log('Connection Successfull'))
        .catch((err) => console.error('Error connecting to MongoDB:', err));
} 

module.exports = dbConnection;