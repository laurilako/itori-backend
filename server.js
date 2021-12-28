const express = require('express');
const cors = require('cors')
const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const listingRoutes = require('./routes/listingRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
connectDB();



app.use("/api/listings/", listingRoutes);

app.use('/api/users/', userRoutes);

app.use(express.static(path.join(__dirname, 'build')));
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
//  middlewaret käyttöön lopuksi
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3001
app.listen(PORT ,console.log(`Serveri starttaa portissa ${PORT}`));