const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    login: { type: String, requiried: true },
    password: { type: String, required: true },
    wins: { type: Number, default: 0 },
    role: { type: String, required: false, default: "player"}
})

module.exports = model('User', userSchema)