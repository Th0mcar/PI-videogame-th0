const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const genres = require("./genres");
const videogames = require("./videogames");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/genres", genres);
router.use("/videogames", videogames);



/* router.get('/', (req, res) => {
    res.status(200).send("Welcome");
}); */


/* router.get('/videogames/name/:name', (req, res) => {
    const { name } = req.params;
    res.status(200).send(`video juego con el nombre: ${name}`);
}); */


/* router.post('/videogames,', (req, res) => {
    res.status(200).send("video juego creado correctamente");
}); */



module.exports = router;
