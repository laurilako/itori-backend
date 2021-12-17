const express = require('express');
const { registerUser, loginUser } = require('../controllers/userControllers');
const router = express.Router();

// Routet (api/user), tarvitaan rekisteröintiin ja sitten kirjautumiseen
router.route('/').post(registerUser);

router.route('/login/').post(loginUser);

module.exports = router;