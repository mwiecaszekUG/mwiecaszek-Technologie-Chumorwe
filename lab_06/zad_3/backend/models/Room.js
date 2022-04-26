const { Schema, model } = require('mongoose');

const roomSchema = new Schema({
    name: { type: String, required: true},
    players: { type: Array, required: false},
    riddles: { type: Array, required: true}
})

module.exports = model('Room', roomSchema)