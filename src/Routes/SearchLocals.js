const {Router} = require('express');
const {searchLocals, searchByTags,searchPopularLocals, searchByUser, searchLocalsAndLikes} = require('../Controllers/SearchLocals');
const {validationResults } = require('../Middleware/validationResult');
const { check } = require('express-validator');
const { verifyToken} = require('../Middleware/VerifyToken');

const route = Router(); 

route.get('/byRange/:Latitude/:Longitude/:kilometers', searchLocals);

route.get('/byTags/:Latitude/:Longitude/:kilometers/:tags/:userId', searchByTags);

route.get('/localsPopular/:Latitude/:Longitude/:kilometers/:userId',[
    validationResults
], searchPopularLocals);

route.get('/byUser',[
    check('x-token', 'Token is require').notEmpty(),
    check('x-token', 'Token is not a JWT').isJWT(),
    check('x-token', 'Token validation').custom(async (value, { req }) => await verifyToken(value, req)),
    validationResults,
], searchByUser);

route.get('/searchLocalsAndLikes/:Latitude/:Longitude/:kilometers/:userId',[
    validationResults
], searchLocalsAndLikes);

module.exports = route;
