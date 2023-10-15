const {Schema, model} = require('mongoose');

const productsCategories = Schema({
    category: {
        type: String, 
    }
});

module.exports = model('productsCategories', productsCategories );