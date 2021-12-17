const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env'})

// Yhdistetään databaseen ja ilmoitetaan tilanne siitä terminaaliin.
const connectDB = async () => {
    try {
        const con = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
        console.log(`Mongo connected ${con.connection.host}`);
    } catch (error) {
        console.log("Error connecting to the DB", error);
    }
}

module.exports = connectDB;