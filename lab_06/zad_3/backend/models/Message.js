const { Schema, model } = require('mongoose');

const messageSchema = new Schema({
    text: { type: String, required: true }
})

module.exports = model('Message', messageSchema)