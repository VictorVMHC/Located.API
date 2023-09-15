const {Router} = require('express');
const {searchLocals, searchByTags} = require('../Controllers/SearchLocals')

const route = Router(); 

route.get('/byRange/:Latitude/:Longitude/:kilometers', searchLocals);

route.get('/byTags/:Latitude/:Longitude/:kilometers/:tags', searchByTags);

module.exports = route;