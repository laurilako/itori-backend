const jwt = require('jsonwebtoken');
// Luodaan tokeni jsonwebtoken -kirjastolla kirjautumisen yhteydessä. Palautetaan se kirjautuessa.
const genToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SALAINEN, {
        expiresIn: '30d',
    });
}

module.exports = { genToken }