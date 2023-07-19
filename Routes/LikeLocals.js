const {Router} = require('express');
const {likeLocalPost, likeLocalGet, likeLocalDelete} = require('../Controllers/LikeLocals');
const { check } = require('express-validator');
const { validationResults } = require('../Middleware/validationResult');
const router = Router();

router.post('/',
    [
        check('userId', 'The user Id is mandatory').notEmpty(),
        check('localId', 'The local Id is mandatory').notEmpty(),
        validationResults
    ],likeLocalPost);

    router.get('/:Id',
    [
        check('Id', "The Id must not be empty").notEmpty(),
        validationResults
    ],likeLocalGet);

    router.delete('/:Id',[
        check('Id', 'The Id is mandatory').notEmpty(),
        validationResults
    ], likeLocalDelete);

module.exports = router; 