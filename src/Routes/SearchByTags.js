const {Router} = require('express');
const {searchByTags} = require('../Controllers/SearchByTags');

const route = Router(); 

route.get('/:Latitude/:Longitude/:kilometers/:tags', searchByTags)

module.exports = route;