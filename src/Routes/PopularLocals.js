const {Router} = require('express');
const {getPopularLocals} = require('../Controllers/PopularLocals');
const { check } = require('express-validator');
const { validationResults } = require('../Middleware/validationResult');
const router = Router();

    router.get('/:Latitude/:Longitude/:kilometers',
    [
        
        validationResults
    ], getPopularLocals);

module.exports = router; 