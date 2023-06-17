const { Router } = require('express');
const { producsPost, producsGet } = require('../Controllers/Producs');
const { check } = require('express-validator');
const { validationResults } = require('../Middleware/validationResult');
const { existEmail, existPhone } = require('../helpers/DbValitations');
const router = Router();

router.post('/',
    [
        check('producName', 'The productName is mandatory').notEmpty(),
        check('price', 'The price is mandatory').notEmpty(),
        check('img', 'The price is mandatory').notEmpty(),
        check('punctation', 'The punctation is mandatory').notEmpty(),
        check('descripcion', 'The descripcion is mandatory').notEmpty(),
        check('tags', 'The tags is mandatory').notEmpty(),
        validationResults
    ],
    producsPost);

router.get('/:Id',
    [
    check('Id', "The Id must not to be empty").notEmpty(),
    validationResults
    ], 
    producsGet);

    module.exports = router; 