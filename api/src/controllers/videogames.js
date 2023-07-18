const { Videogame, Genre } = require("../db");
const axios = require("axios");
const { API_KEY } = process.env;

///////////////////////////////////////////////FUNCIONS/////////////////////////////////////////////////////////////////////////////

//Traer todos los juegos
const getAllVg = async () => {
  try {
    // Retrieve videogames from the database along with their associated genres
    const gamesDb = await Videogame.findAll({
      include: Genre, // Include the Genre model
    });

    // Map the data from the database
    const arrayGamesDB = gamesDb.map((game) => {
      return {
        id: game.id,
        name: game.name,
        description: game.description,
        platform: game.platform,
        background_image: game.background_image,
        released: game.released,
        rating: game.rating,
        genres: game.Genres.map((genre) => genre.name), // Access the associated genres using the proper association name (Genres)
      };
    });

    // Retrieve games from the API
    const arrayGamesApi = [];
    for (let i = 1; i <= 7; i++) {
      let response = await axios.get(
        `https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`
      );
      // Map and push each game
      response.data.results.map((game) => {
        arrayGamesApi.push({
          id: game.id,
          name: game.name,
          platform: game.platforms.map((e) => e.platform.name),
          background_image: game.background_image,
          released: game.released,
          rating: game.rating,
          genres: game.genres.map((g) => g.name),
        });
      });
    }

    // Concatenate the data from the database and the API
    return [...arrayGamesDB, ...arrayGamesApi];
  } catch (error) {
    console.error("Error retrieving videogames:", error);
    throw error;
  }
};

//Traer los juegos por su nombre
const getVgByName = async (name) => {
  try {
    // Search in the database by name
    const gamesDb = await Videogame.findAll({
      where: { name: name },
    });

    console.log("gamesDb:", gamesDb); // Log the value of gamesDb

    const arrayGamesDB = gamesDb.map((game) => {
      return {
        id: game.id,
        name: game.name,
        description: game.description,
        platform: game.platform, //
        background_image: game.background_image,
        released: game.released,
        rating: game.rating,
        genres: game.genres, //
      };
    });

    let arrayGamesApi = [];
    for (let i = 1; i <= 2; i++) {
      let response = await axios.get(
        `https://api.rawg.io/api/games?search=${name}&key=${API_KEY}&page=${i}`
      );
      response.data.results.map((game) => {
        arrayGamesApi.push({
          id: game.id,
          name: game.name,
          description: game.description,
          platform: game.platforms.map((e) => e.platform.name), //
          background_image: game.background_image,
          released: game.released,
          rating: game.rating,
          genres: game.genres.map((g) => g.name) //
        });
      });
    }

    arrayGamesApi = arrayGamesApi.filter(
      (g) => g.name.toLowerCase() || g.name.toUpperCase()
    );

    let allGamesByName = [...arrayGamesDB, ...arrayGamesApi].slice(0, 15);
    return allGamesByName;
  } catch (error) {
    console.error("Error in getVgByName:", error); // !!!
    throw error;
  }
};

//traer los juegos por su id

// Desde la API
const getVgAPI = async (id) => {
  const gamesAPI = [];

  const getByAPI = await axios.get(
    `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
  );
  gamesAPI.push({
    id: getByAPI?.data?.id,
    name: getByAPI?.data?.name,
    description: getByAPI?.data?.description, //description solo si es por id
    platform: getByAPI?.data?.platforms?.map((e) => e.platform.name),
    background_image: getByAPI?.data?.background_image,
    released: getByAPI?.data?.released,
    rating: getByAPI?.data?.rating,
    genres: getByAPI?.data?.genres?.map((g) => g.name),
  });

  return gamesAPI;
};

// Desde la db
const getVgDB = async (id) => {
  let gamesDB = []

  const getGamesDB = await Videogame.findByPk(
      id,
      {
          include: {
              model: Genre,
              attributes: ["name"],
              through: {
                  attributes: []
              }
          }
      });

  gamesDB.push({
      id: getGamesDB.id,
      name: getGamesDB.name,
      description: getGamesDB.description,
      platform: getGamesDB.platform,
      background_image: getGamesDB.background_image,
      released: getGamesDB.released,
      rating: getGamesDB.rating,
      genres: getGamesDB.Genres.map(genre => genre.name)
  })
  return gamesDB;
}

//Crear un nuevo juego
const createNewGame = async ({
  name,
  description,
  platform,
  background_image,
  released,
  rating,
  genre,
}) => {
  //  Verificar que todos los campos estan llenos
  if (
    !name ||
    !description ||
    !platform ||
    !background_image ||
    !released ||
    !rating ||
    !genre
  ) {
    throw Error("Todos los campos son obligatorios!");
  }
  //  Verificar si el juego ya existe
  const searchName = await Videogame.findAll({
    where: { name: name },
  });
  // Lanzar error en caso de que ya exista
  if (searchName.length !== 0) throw Error("Oh no, Juego existente!");

  // busca y trae de la tabla genre los generos = genre
  let getGenreDB = await Genre.findAll({
    where: {
      name: genre,
    },
  });
  //Verificar si la tabla de generos esta vacia
  if (getGenreDB.length === 0) throw Error("Los generos no han sido cargados");

  //Guerdar nuevo juego en la DB
  let newVideogame = await Videogame.create({
    name,
    description,
    platform,
    background_image,
    released,
    rating: Number(rating),
    genre,
  });

  await newVideogame.addGenres(getGenreDB);

  return newVideogame;
};

// Traer todos los juegos/traer juegos por su nombre
const getVg = (name) => {
  if (!name) return getAllVg(); //Todos los juegos
  else return getVgByName(name); //Juegos por nombre
};

//Traer juegos por id
const getVgById = async (id, source) => {
  if (source === "API") return getVgAPI(id); //API
  else return getVgDB(id); //db
};

// Crear un juego en la db
const createVg = (form) => {
  return createNewGame(form); // Crear juego db
};

module.exports = {
  getVg,
  getVgById,
  createVg,
};
