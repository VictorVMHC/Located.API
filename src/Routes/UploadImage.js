const { Router } = require('express');
const { uploadImage } = require('../Controllers/UploadImage');
const router = Router();

router.post('/', uploadImage);

module.exports = router;