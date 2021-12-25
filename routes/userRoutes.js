const express = require('express');
const { registerUser, loginUser, getAll, getUser } = require('../controllers/userControllers');
const router = express.Router();

// Routet (api/user), tarvitaan rekisteröintiin ja sitten kirjautumiseen
router.route('/').post(registerUser);
router.route('/:id').get(getUser);
router.route('/all').get(getAll);
router.route('/login/').post(loginUser);

module.exports = router;