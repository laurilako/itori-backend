require('dotenv').config({ path: '../.env'})
// Virheenkäsittelijä tilanteelle, jossa kyselyn kohdetta ei löydy
const notFound = (req, res, next) => {
    const error = new Error(`Not found ${req.originalUrl}`);
    res.status(404);
    next(error);
}

// Yleinen virheenkäsittelijä
const errorHandler = (err, req, res, next) => {
    const statCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'prod' ? null : err.stack
    })
    next(err);
}

module.exports = { notFound, errorHandler }