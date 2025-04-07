
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    username: {
        type: String, 
        required: [true, `Le nom d'utilisateur est requis`],
        unique: true,
        trim: true,
        minlength: [3, `Le nom d'utilisateur doit contenir au moins 3 caractères`]
    },
    password: {
        type: String,
        required: [true, 'Le mot de passe est requis'],
        minlength: [6,'Le mot de passe doit contenir au moins 6 caractères']
    },
    email: {
        type: String,
        required: [true, `L'adresse mail est requise`],
    },
    emailIsVerifed: {
        type: Boolean,
        default: true // A changer dès que la vérif est en place
    },
    actualGrade: {
        type: String,
        default: "Mousse"
    },
    actualState: {
        type: String,
        default: 'Au repos'
    }


});

userSchema.pre('save', async function(next) {
if(!this.isModified('password')) return next();
this.password = await bcrypt.hash(this.password,12);
next();
});

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateToken = function() {
const payload = {id: this._id, username: this.username};

return jwt.sign(payload,process.env.SECRET_KEY, {expiresIn: '1h'});
}

module.exports = mongoose.model('User',userSchema);