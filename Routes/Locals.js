const { Router } = require('express');
const {check} = require('express-validator');
const {validationResults } = require('../Middleware/validationResult');
const {existLocal} = require('../helpers/DbValitations');
const { localsPost, localsPut, localDelete, localsGet} = require('../Controllers/Locals');
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
        check('name', 'The name of your local is mandatory').notEmpty(),
        check('adress', 'The adress of your local is mandatory').notEmpty(),
        check('products', 'you must provide products o services').notEmpty(),
        check('schedules', 'The schedule of your local is mandatory').notEmpty(),
        check('tags', 'A tag for your local it is required').notEmpty(),
        validationResults
], localsPost);

/**
 * Obtención de la infmacion del local
 * @route GET api/locals/:localname
 * @param {string} Id -unique local name 
 * @returns {object} local information
 * @throws {Error} if teh local doesn't exist
 */
router.get('/:Id',[
        check('Id', "The Id of the local must not be empty").notEmpty(),
        validationResults
], localsGet);


/**
 * Actualizar la informacion del local
 * @route PUT api/locals/Id
 * @param {json property} Id -> Id  del local
 * @param {json property} name -> nombre del local
 * @param {json property} adress -> direción del local 
 * @param {json property} isVerify -> verificacion del local
 * @param {json property} products -> productos del local
 * @param {json property} schedules -> horario del local
 * @param {json property} rate -> Rango
 * @param {json property} quantityRate -> Cantidad a establecer de rango
 * @param {json property} tags -> etiqueta para el local
 * @returns {object} local information
 * @throws {Error} if teh local doesn't exist
 */
router.put('/:Id',[
        check('Id', 'The ID is mandatory').notEmpty(),
        validationResults
], localsPut);

/**
 * Elimina la informacion del local
 * @route Delete api/locals/Id
 * @param {json property} Id -> Id  del local
 * @returns {object} local information
 * @throws {Error} if the local doesn't exist
 */
router.delete('/:Id',[
        check('Id', 'The ID is mandatory').notEmpty(),
        validationResults
], localDelete );


module.exports = router;

