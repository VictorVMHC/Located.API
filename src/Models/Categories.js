const {Schema, model} = require('mongoose');

const categories = Schema({
    category: {
        type: String, 
    }
});

module.exports = model('categories', categories );