const express = require('express');
const { login, register, getCaptcha } = require('../controllers/authController');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/captcha', getCaptcha);

module.exports = router;