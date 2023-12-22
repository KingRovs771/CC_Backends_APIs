const express = require('express');
const auth = require('./auth');
const verifikasi = require('./verifikasi');
const router = express.Router();

router.post('/api/v1/register', auth.registerUser);
router.post('/api/v1/login', auth.loginUser);
router.get('/api/v1/protected-route', verifikasi, auth.checkRoute);
router.get('/api/v1/ewallet', verifikasi, auth.eWallet);
router.post('/api/v1/topup', verifikasi, auth.topUpuser);
router.post('/api/v1/purchase', verifikasi, auth.purchaseUmkm);
router.get('/api/v1/getuserbyid', verifikasi, auth.getUserById);

//verifikasi
module.exports = router;
