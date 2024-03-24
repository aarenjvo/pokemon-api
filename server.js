const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const pokemonController = require('./controllers/pokemon')

const app = express()



// routes
app.use('/pokemon', pokemonController)

// db connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('DB Connected'))
    .catch(err => console.err(err));

const PORT = process.env.PORT

app.listen(PORT, console.log(`listening on port ${PORT}`))