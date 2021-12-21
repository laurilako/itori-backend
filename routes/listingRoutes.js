const express = require('express');
const { getListings, newListing } = require('../controllers/listingControllers');
const router = express.Router();

// Routet (api/listing), listauksien hakuun ja tekoon

router.route('/').get(getListings);
router.route('/').post(newListing);

module.exports = router;