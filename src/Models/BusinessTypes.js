const {Schema, model} = require('mongoose');

const BusinessTypes = Schema({
    businessType: {
        type: String, 
    }
});

module.exports = model('BusinessTypes', BusinessTypes );