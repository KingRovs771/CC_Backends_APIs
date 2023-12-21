const express = require('express');
const auth = require('./auth');
const verifikasi = require('./verifikasi');
const router = express.Router();

router.post('/api/v1/register', auth.registerUser);
router.post('/api/v1/login', auth.loginUser);
router.get('/api/v1/protected-route', verifikasi, auth.checkRoute);
//verifikasi
module.exports = router;
