const axios = require('axios')
const { Genre } = require('../db')
const { API_KEY } = process.env;

// solicita de la API/almacena la info en la db
const getGenresVg = async () => {

    //soy juan, estos son los 5 tops mas dificil de oir
    let response = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
    let genres = await response.data.results.map(g => g.name)

    const count = await Genre.count();

    if (count === 0) {
        genres.forEach(element => {
            Genre.create({ name: element })  // Create espera un objeto!
        })
    }
    return genres
}

module.exports = {
    getGenresVg
}