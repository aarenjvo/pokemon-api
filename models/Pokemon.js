const mongoose = require('mongoose')

const pokemonSchema = new mongoose.Schema({
    height: {
        type: Number
    },
    weight: {
        type: Number
    },
    pokemonId: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String
    }
})

module.exports = mongoose.model('Pokemon', pokemonSchema)