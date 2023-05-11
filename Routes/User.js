const { Router } = require('express');
const { userPost } = require('../Controllers/User');

const router = Router();

router.post('/', userPost);

/**
 * Get the information of the user by username
 *
 * @route GET api/users/:username
 * @param {string} username - unique username of the user
 * @returns {object} User information
 * @throws {Error} If the user doesn't exist
 */
//router.get('/:username', userGet);

//router.delete('/:id');

//router.put('/',);

module.exports = router; 