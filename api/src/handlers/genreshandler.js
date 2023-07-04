const { getGenresVg } = require('../controllers/genres')

const getGenres = async (req, res) => {
    try {
        let genres = await getGenresVg()
        res.status(200).json(genres)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    getGenres
}