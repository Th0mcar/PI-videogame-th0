const { Router } = require('express');
const { getGenres } = require('../handlers/genreshandler');


const genres = Router();

genres.get('/', getGenres)

module.exports = genres;