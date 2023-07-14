const { Router } = require('express');
const {commentPost, commentGet,commentPut, commentDelete} = require('../Controllers/Comment')
const { check } = require('express-validator');
const { validationResults } = require('../Middleware/validationResult');
const router = Router();


router.post('/:_id/:_id2',
    [
        check('comments', 'The comments is mandatory').notEmpty(),
        check('like', 'The comments is mandatory').notEmpty(),
        check('dislike', 'The comments is mandatory').notEmpty(),  
        validationResults
    ],commentPost);

router.get('/:Id',
    [
        check('Id', "The Id must not be empty").notEmpty(),
        validationResults
    ],commentGet);

router.put('/:Id',[
    check('Id', 'The ID is mandatory').notEmpty(),
    validationResults
], commentPut);

router.delete('/:Id',[
    check('Id', 'The ID is mandatory').notEmpty(),
    validationResults
], commentDelete);




module.exports = router; 