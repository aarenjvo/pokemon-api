const mongoose = require('mongoose')
require('dotenv').config()
const { performance } = require("perf_hooks");
const Pokemon = require('../models/Pokemon')



async function main() {
    console.log('start')

    let dbConnection

    try {
        dbConnection = await mongoose.connect(process.env.MONGO_URI)
        console.log('DB Connected')
    } catch (error) {
        console.log('error connecting to database', error)
    }

    await Pokemon.deleteMany()
    await getPokemon()

    console.log('end')
    let start = performance.now();
    for (let i = 0; i < 1000; i++) { }
    const end = performance.now();
    console.log(`time taken: ${end - start}ms`);
    process.exit(0)
}

async function getPokemon() {
    let url = 'https://pokeapi.co/api/v2/pokemon?limit=50'

    while (url) {
        const response = await fetch(url)
        const data = await response.json()

        // const pokemonUrls = data.results.map(pokemon => pokemon.url)
        const promises = data.results.map(pokemon => {
            return processPokemon(pokemon.url)
        })


        // const pokemonToSave = []
        // for (const pokemonUrl of pokemonUrls) {
        //     const pokemon = await processPokemon(pokemonUrl)
        //     pokemonToSave.push(pokemon)
        // }
        const pokemonToSave = await Promise.all(promises)
        await Pokemon.insertMany(pokemonToSave)
        url = data.next
        console.log(url)
    }
}

async function processPokemon(url) {
    try {
        const response = await fetch(url)
        const data = await response.json()

        // const pokemon = {
        return {
            pokemonId: data.id,
            name: data.name,
            image: data.sprites.front_default,
            height: data.height,
            weight: data.weight
        }
        // }

        // await new Pokemon(pokemon).save()
    } catch (error) {
        console.log('error processing pokemon', error)
    }
}

main()