const {Router} = require('express');
const {search} = require('../Controllers/SearchLocals');

const route = Router(); 

route.get('/:coleccion/:termino/:termino2', search)

module.exports = route;