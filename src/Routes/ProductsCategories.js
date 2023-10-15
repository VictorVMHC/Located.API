const { Router } = require('express');
const { check } = require('express-validator');
const { validationResults } = require('../Middleware/validationResult');
const { productsCategoriesPost,productsCategoriesGet   } = require('../Controllers/ProductsCategories');
const router = Router();


router.post('/',
    [
        check('category', 'The category type is mandatory').notEmpty(),
        validationResults
    ], productsCategoriesPost);

router.get('/',
    [
        check('page', "The page must not be empty").notEmpty(),
        validationResults
    ],productsCategoriesGet);

module.exports = router; 