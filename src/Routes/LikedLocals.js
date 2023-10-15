const {Router} = require('express');
const {likeLocalPost, likeLocalGet, likeLocalGetCount, likeLocalDelete} = require('../Controllers/LikedLocals');
const { check } = require('express-validator');
const { validationResults } = require('../Middleware/validationResult');
const router = Router();

    router.post('/',
    [
        check('userId', 'The user Id is mandatory').notEmpty(),
        check('localId', 'The local Id is mandatory').notEmpty(),
        validationResults
    ], likeLocalPost);

    router.get('/:idUser/:idLocal',
    [
        check('idUser', "The idUser must not be empty").notEmpty(),
        check('idLocal', "The idLocal must not be empty").notEmpty(),
        validationResults
    ], likeLocalGet);

    router.get('/count/:localId', likeLocalGetCount );

    router.delete('/:idUser/:idLocal',[
        check('idUser', 'The idUser is mandatory').notEmpty(),
        check('idLocal', 'The idLocal is mandatory').notEmpty(),
        validationResults
    ], likeLocalDelete);

module.exports = router; 