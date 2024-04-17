const path = require('path');
const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require('moment');


//Aqui tienen otra forma de llamar a cada uno de los modelos
const Movies = db.Movie;
const Genres = db.Genre;
const Actors = db.Actor;


const moviesController = {
    list: (req, res) => {
        db.Movie.findAll({
            include: ['genre']
        })
            .then(movies => {
                res.status(200).json({
                    meta:{

                    },
                    
                    data:movies})
            })
    },
    detail: (req, res) => {
        db.Movie.findByPk(req.params.id,
            {
                include: ['genre']
            })
            .then(movie => {
                res.status(200).json({
                    meta:{},
                    data:movie
                });
            });
    },
    newest: (req, res) => {
        db.Movie.findAll({
            order: [
                ['release_date', 'DESC']
            ],
            limit: 5
        })
            .then(movies => {
                res.status(200).json({meta:{},data:movies});
            });
    },
    recomended: (req, res) => {
        db.Movie.findAll({
            include: ['genre'],
            where: {
                rating: { [db.Sequelize.Op.gte]: 8 }
            },
            order: [
                ['rating', 'DESC']
            ]
        })
            .then(movies => {
                res.status(200).json({
                    data:movies,
                    meta:{}
                });
            });
    },
    //Aqui dispongo las rutas para trabajar con el CRUD
    create: function (req, res) {
        console.log(req.body)
        Movies
            .create(req.body)
            .then((response) => {
               
                return res.status(200).json({
                    meta:{
                        total:response.length,
                        status:200,
                        url:"api/movies/create"
                    },
                    data:response
                })
            })
            .catch(error => res.send(error))
    },
    destroy: function (req, res) {
        let movieId = req.params.id;
        Movies
            .destroy({ where: { id: movieId }, force: true }) // force: true es para asegurar que se ejecute la acción
            .then((response) => {
                return res.status(200).json({meta:{
                    total:response.length,
                    status:200,
                    url:"api/movies/delete"
                },
                data:response})
            })
            .catch(error => res.send(error))
    }
}

module.exports = moviesController;