
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required:true,},
    email: {type: String, required:true, unique:true},
    isVerifed: {type: Boolean, default: false}
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