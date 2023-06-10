const { Router } = require('express');
const {check} = require('express-validator');
const {validationResults } = require('../Middleware/validationResult');
const {existLocal} = require('../helpers/DbValitations');
const { localsPost, localsPut, localDelete} = require('../Controllers/Locals');
const router = Router();

/**
 * crear registro de un local
 * @route GET api/locals/
 * @param {json property} localId -> Identificador del local
 * @param {json property} name -> nombre del local
 * @param {json property} adress -> direción del local 
 * @param {json property} isVerify -> verificacion del local
 * @param {json property} products -> productos del local
 * @param {json property} schedules -> horario del local
 * @param {json property} rate -> Rango
 * @param {json property} quantityRate -> Cantidad a establecer de rango
 * @param {json property} tags -> etiqueta para el local
 * @returns {locals} 200->  si el local ha sido creado y sus parametrso estan bien
 * @throws {information}  si los formatos no estan correctos o si el local ya fue creado
 */

router.post('/',[
        check('localId', 'The Id is mandatory').notEmpty(),
        check('name', 'The name of your local is mandatory').notEmpty(),
        check('name', 'The name of your local is mandatory').custom(existLocal),
        check('adress', 'The adress of your local is mandatory').notEmpty(),
        check('products', 'you must provide products o services').notEmpty(),
        check('schedules', 'The schedule of your local is mandatory').notEmpty(),
        check('rate', 'The rate is mandatory').notEmpty(),
        check('quantityRate', 'This field is required').notEmpty(),
        check('tags', 'A tag for your local it is required').notEmpty(),
        validationResults
], localsPost);


router.put('/:localId',[
        check('name', 'The name of your local is mandatory').notEmpty(),
        check('adress', 'The adress of your local is mandatory').notEmpty(),
        check('products', 'you must provide products o services').notEmpty(),
        check('schedules', 'The schedule of your local is mandatory').notEmpty(),
        check('rate', 'The rate is mandatory').notEmpty(),
        check('quantityRate', 'This field is required').notEmpty(),
        check('tags', 'A tag for your local it is required').notEmpty(),
        validationResults
], localsPut);

router.delete('/:localId',[
        check('localId', 'The Id is mandatory').notEmpty(),
        validationResults
], localDelete );


module.exports = router;

