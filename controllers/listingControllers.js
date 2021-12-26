const asyncHandler = require('express-async-handler');
const Listing = require('../models/listingModel');
const User = require('../models/userModel');

const updateListing = asyncHandler(async (req, res) => {
    const body = req.body
    const nListing = {
        title: body.title,
        content: body.content
    }
    const updatedListing = await Listing.findByIdAndUpdate(req.params.id, nListing)
    res.json(updatedListing);
})

const removeListing = asyncHandler(async (req, res) => {
    const listingToDelete = await Listing.findById(req.params.id)
    
    if(listingToDelete){
        await listingToDelete.remove()
        res.status(204).end()
    } else {
        res.status(401).end()
    } 
})

const getListings = asyncHandler(async (req, res) => {
    const listings = await Listing.find({}).populate('user', { name: 1})
    res.json(listings)
})

const newListing = asyncHandler(async (req, res) => {
    // title: {
    //     type: String,
    //     required: true,
    //     minlength: 5
    //   },
    //   content: {
    //    type: String,
    //    required: true,
    //   },
    //   pic: {
    //     type: String,
    //     required: false,
    //   },
    //   user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User'
    //   }

    // const { title, content, pic, userId } = req.body;
    const body  = req.body;
    const user = await User.findById(body.userId);
    console.log(body);

    // Tarkistetaan löytyyko samannimistä postausta...
    const title = body.title;
    const listingExists = await Listing.findOne({ title })
    if(listingExists){
        res.status(400);
        throw new Error('Listing with same title already exists!');
    }

    const listing = await Listing.create({
        title: body.title,
        content: body.content,
        pic: body.pic,
        user: user._id
    })

    if(listing){
        const savedListing = await listing.save()
        user.listings = user.listings.concat(savedListing._id)
        await user.save()
        
        res.status(201).json({
            listing
        })
    } else {
        res.status(400)
        throw new Error("Error while creating new listing!");
    }
})

module.exports = { getListings, newListing, removeListing, updateListing }