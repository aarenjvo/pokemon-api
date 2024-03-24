const router = require('express').Router()
const Pokemon = require('../models/Pokemon')

router.get('/', async (req, res) => {
    try {
        const pokemon = await Pokemon.find()
        res.json(pokemon)
    } catch (error) {
        console.log('error fetching all pokemon', error)
        res.status(500).json({ message: 'error fetching all pokemon' })
    }
})

router.get('/:pokemonId', async (req, res) => {
    try {
        const { pokemonId } = req.params
        const pokemon = await Pokemon.find({ pokemonId })
        res.json(pokemon)
    } catch (error) {
        console.log('error fetching pokemon by id', error)
        res.status(500).json({ message: 'error fetching pokemon by id' })
    }
})




module.exports = router