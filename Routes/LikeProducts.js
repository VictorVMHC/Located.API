const {Router} = require('express');
const {likeProductPost, likeProductGet,likeProductDelete} = require('../Controllers/LikeProducts')
const { check } = require('express-validator');
const { validationResults } = require('../Middleware/validationResult');
const router = Router();

router.post('/',
    [
        check('userId', 'The user Id is mandatory').notEmpty(),
        check('productId', 'The product Id is mandatory').notEmpty(),
        validationResults
    ],likeProductPost);

    router.get('/:Id',
    [
        check('Id', "The Id must not be empty").notEmpty(),
        validationResults
    ],likeProductGet);

    router.delete('/:Id',[
        check('Id', 'The Id is mandatory').notEmpty(),
        validationResults
    ], likeProductDelete);

module.exports = router; 