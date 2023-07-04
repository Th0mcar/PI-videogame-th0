const {Router} = require('express');
const {
    getVideogames, 
    getVideogameById, 
    postVideogame
    } = require('../handlers/videogameshandler');

const videogames = Router();

videogames.get('/', getVideogames); //Trae videogames

videogames.get('/:idVideogame', getVideogameById); //Trae videogames por id

videogames.post('/', postVideogame); //crea videogames



module.exports = videogames;