const db = require('../../database/models');
const sequelize = db.sequelize;


const genresController = {
    'list': (req, res) => {
        db.Genre.findAll()
            .then(genres => {
                res.status(200).json({
                    meta:{
                        status:200,
                        total:genres.length,
                        url:"api/genres"
                    },
                    data:genres
                })
            })
    },
    'detail': (req, res) => {
        db.Genre.findByPk(req.params.id)
            .then(genre => {
                res.json({
                    meta:{
                        status:200,
                        total:genre.length,
                        url:"api/genres"
                    },
                    data:genre
                });
            });
    }

}

module.exports = genresController;