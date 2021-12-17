const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
      minlength: 5
    },
    content: {
     type: String,
     required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
})


const Listing = mongoose.model('Listing', listingSchema)

module.exports = Listing