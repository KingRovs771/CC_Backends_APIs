const express = require('express');
const auth = require('./auth');
const verifikasi = require('./verifikasi');
const router = express.Router();
const users = require('../controller/UsersController');
router.post('/api/v1/register', auth.registerUser);
router.post('/api/v1/login', auth.loginUser);

//verifikasi
module.exports = router;
