const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const { genToken } = require('../utils/genToken');

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

module.exports = { registerUser, loginUser }