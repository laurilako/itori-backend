const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const { genToken } = require('../utils/genToken');

const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            isAdmin: user.isAdmin,
            listings: user.listings
        })
    } else {
        res.status(404)
        throw new Error("User not found!");
    }
})

const getAll = asyncHandler(async (req, res, next) => {
    try {
        const users = await User.find({}).populate('listings', { title: 1 })
        res.json(users.map(u => u.toJSON()))
    } catch (error) {
       next(error);
    }
})


// Käyttäjän rekisteröintiä varten kontrolleri
const registerUser = asyncHandler(async (req, res) => {
    const { name, password } = req.body;

    // Tarkistetaan onko samanniminen käyttäjä jo olemassa...
    const userExists = await User.findOne({ name })
    if(userExists){
        res.status(400);
        throw new Error('Username already exists!');
    }
    // Jos ei, luodaan uusi käyttäjä
    const user = await User.create({
        name,
        password
    })

    // Palautetaan status OK ja id, nimi ja moderaattoristatus (tai heitetään virhe)
    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            isAdmin: user.isAdmin,
            listings: user.listings
        })
    } else {
        res.status(400)
        throw new Error("Error while creating user!");
    }
})

// Kirjautumista varten kontrolleri
const loginUser = asyncHandler(async (req, res) => {
    const { name, password } = req.body;
    const user = await User.findOne({ name });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            isAdmin: user.isAdmin,
            listings: user.listings,
            token: genToken(user._id)
        })
    } else {    
    res.status(400)
    throw new Error("Invalid password or username!");
    }
})

module.exports = { getAll, registerUser, loginUser, getUser }