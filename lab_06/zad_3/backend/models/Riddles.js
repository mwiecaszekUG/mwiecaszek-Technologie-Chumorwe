const { Schema, model } = require('mongoose');

const riddleSchema = new Schema({
    _id: { type: Number, required: true },
    question: { type: String, required: true },
    answer: { type: String, required: true },
    comments: { type: Array, required: false }
})

module.exports = model('Riddle', riddleSchema)