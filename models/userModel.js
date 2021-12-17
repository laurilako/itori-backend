const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')


// Käyttäjien skeema 
const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false,
        },
        listings: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Listing'
            }
        ],
    },
    {
        timestamps: true,
    }
)


// Kryptataan salasana ennen käyttäjän tietojen tallennusta databaseen.
// Tähän käytetään kirjastoa bcrypt.
userSchema.pre('save', async function (next) {
    if(!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

// Kirjautumista varten metodi, jossa verrataan kryptattya databasesta löytyvää salasanaa
// Syötettyyn salasanaan.
userSchema.methods.matchPassword = async function (enteredPw) {
    return await bcrypt.compare(enteredPw, this.password)
}

const User = mongoose.model('User', userSchema);

module.exports = User