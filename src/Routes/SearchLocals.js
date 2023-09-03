const {Router} = require('express');
const {searchLocals} = require('../Controllers/SearchLocals');

const route = Router(); 

route.get('/:coleccion/:termino', searchLocals)

module.exports = route;