const express = require('express');
const cors = require('cors')
const listings = require('./data/listings');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const listingRoutes = require('./routes/listingRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

app.get('/', (req, res) => {
    res.send("api runs..");
});

app.use("/api/listings/", listingRoutes);
app.use('/api/users/', userRoutes);

// Virheenkäsittelijä middlewaret käyttöön lopuksi
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT;

app.listen(PORT ,console.log(`Serveri starttaa portissa ${PORT}`));