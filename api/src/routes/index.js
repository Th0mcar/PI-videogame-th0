const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const genres = require("./genres");
const videogames = require("./videogames");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/genres", genres); //ruta generos
router.use("/videogames", videogames); //ruta juegos


module.exports = router;
