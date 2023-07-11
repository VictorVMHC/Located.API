const { Router } = require('express');
const {check} = require('express-validator');
const {validationResults } = require('../Middleware/validationResult');
const { AuthLogin } = require('../Controllers/Auth');

const router = Router();

router.post('/login',[
    check('email', 'The email is mandatory').notEmpty(),
    check('password', 'The password is mandatory').notEmpty(),
    validationResults,
], AuthLogin);

module.exports = router;