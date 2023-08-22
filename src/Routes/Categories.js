const { Router } = require('express');
const { check } = require('express-validator');
const { validationResults } = require('../Middleware/validationResult');
const { categoriesPost, categoriesGet } = require('../Controllers/Categories');
const router = Router();


router.post('/',
    [
        check('category', 'The category type is mandatory').notEmpty(),
        validationResults
    ], categoriesPost);

router.get('/',
    [
        check('page', "The page must not be empty").notEmpty(),
        validationResults
    ],categoriesGet);

module.exports = router; 