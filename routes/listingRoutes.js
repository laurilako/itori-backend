const express = require('express');
const { getListings, newListing, removeListing } = require('../controllers/listingControllers');
const router = express.Router();

// Routet (api/listing), listauksien hakuun ja tekoon ja muokkaukseen

router.route('/').get(getListings);
router.route('/').post(newListing);
router.route('/:id').delete(removeListing);

module.exports = router;