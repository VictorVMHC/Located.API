const { Router } = require('express');
const { check } = require('express-validator');
const { validationResults } = require('../Middleware/validationResult');
const { businessTypesGet, businessTypesPost } = require('../Controllers/BusinessTypes');
const router = Router();


router.post('/',
    [
        check('businessType', 'The business type is mandatory').notEmpty(),
        validationResults
    ], businessTypesPost);

router.get('/',
    [
        check('page', "The page must not be empty").notEmpty(),
        validationResults
    ],businessTypesGet);

module.exports = router; 