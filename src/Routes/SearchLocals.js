const {Router} = require('express');
const {search} = require('../Controllers/SearchLocals');

const route = Router(); 

route.get('/:collection/:var1/:var2/:var3', search)

route.get('/:collection/:var1/:var2/:var3/:var4', search)

module.exports = route;