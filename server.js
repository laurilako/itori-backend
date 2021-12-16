const express = require('express');
const listings = require('./data/listings');
const dotenv = require('dotenv');

const app = express();
dotenv.config()

app.get('/', (req, res) => {
    res.send("api runs..");
});

app.get('/api/listings', (req, res) => {
    res.json(listings);
})

app.get('/api/listings/:id', (req, res) => {
    const listing = listings.find((n) => n._id === req.params.id);
    res.send(listing);
})

const PORT = process.env.PORT;

app.listen(PORT ,console.log(`Serveri starttaa portissa ${PORT}`));