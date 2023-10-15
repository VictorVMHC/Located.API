const { Router } = require('express');
const { productsPost, productsGet, productsPut, productsDelete, getProductsByLocalId } = require('../Controllers/Products');
const { check } = require('express-validator');
const { validationResults } = require('../Middleware/validationResult');
const router = Router();

router.post('/',
    [
        check('productName', 'The name of the product is mandatory').notEmpty(),
        check('localId', 'The name of the product is mandatory').notEmpty(),
        check('price', 'The price is mandatory').notEmpty(),
        check('description', 'The description is mandatory').notEmpty(),
        validationResults
    ],
    productsPost);

router.get('/:Id',
    [
    check('Id', "The Id must not be empty").notEmpty(),
    validationResults
    ], 
    productsGet);

router.get('/byLocalId/:localId',[
    check('localId', "The Id must not be empty").notEmpty(),
    validationResults
], 
getProductsByLocalId);


/**
 * Actualizar la informacion del producto
 * @route PUT api/products/Id
 * @param {json property} Id -> Id  del producto
 * @param {json property} productName -> nombre del producto
 * @param {json property} price -> precio del producto 
 * @param {json property} img -> imagen del producto
 * @param {json property} punctuation -> puntuación del producto
 * @param {json property} description -> descripcion del producto
 * @param {json property} tags -> etiqueta para el producto
 * @returns {object} product information
 * @throws {Error} if the product doesn't exist
 */
router.put('/:Id',[
    check('Id', 'The ID is mandatory').notEmpty(),
    validationResults
], productsPut);


/**
 * Elimina la informacion del producto
 * @route Delete api/locals/Id
 * @param {json property} Id -> Id  del producto
 * @returns {object} product information
 * @throws {Error} if the product doesn't exist
 */
router.delete('/:Id',[
    check('Id', 'The ID is mandatory').notEmpty(),
    validationResults
], productsDelete);


    module.exports = router; 