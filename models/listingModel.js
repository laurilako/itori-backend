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
    pic: {
      type: String,
      required: false,
      default: "https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png"
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
})

listingSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Listing = mongoose.model('Listing', listingSchema)

module.exports = Listing