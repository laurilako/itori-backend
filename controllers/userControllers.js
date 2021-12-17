const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const registerUser = asyncHandler(async (req, res) => {
    const { name, password } = req.body;

    const userExists = await User.findOne({ name })
    if(userExists){
        res.status(400)
        throw new Error('Username already exists!')
    }

    const user = await User.create({
        name,
        password
    })

    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            isAdmin: user.isAdmin,
        })
    } else {
        res.status(400)
        throw new Error("Error while creating user!")
    }
})

module.exports = { registerUser }