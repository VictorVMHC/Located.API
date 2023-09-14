const {Router} = require('express');
const {searchLocals} = require('../Controllers/SearchLocals')

const route = Router(); 

route.get('/:Latitude/:Longitude/:kilometers', searchLocals)

module.exports = route;
