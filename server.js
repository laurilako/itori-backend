const express = require('express');
const cors = require('cors')
const listings = require('./data/listings');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(cors());
dotenv.config();
connectDB();
app.use(express.json());




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

app.use('/api/users', userRoutes);

const PORT = process.env.PORT;

app.listen(PORT ,console.log(`Serveri starttaa portissa ${PORT}`));