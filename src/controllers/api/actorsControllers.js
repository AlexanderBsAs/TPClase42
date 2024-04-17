const path = require('path');
const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require('moment');


//Aqui tienen otra forma de llamar a cada uno de los modelos
const Movies = db.Movie;
const Genres = db.Genre;
const Actors = db.Actor;


const actorsController = {
    list: (req, res) => {
        Actors.findAll()
            .then(movies => {
                res.status(200).json({
                    meta:{

                    },
                    
                    data:movies})
            })
    },
    detail: (req, res) => {
        Actors.findByPk(req.params.id)
            .then(movie => {
                res.status(200).json({
                    meta:{},
                    data:movie
                });
            });
    },
    newest: (req, res) => {
        Actors.findAll({
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
        Actors.findAll({
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
        Actors
            .create(req.body)
            .then((response) => {
               
                return res.status(200).json({
                    meta:{
                        total:response.length,
                        status:200,
                        url:"api/actors/create"
                    },
                    data:response
                })
            })
            .catch(error => res.send(error))
    },
    destroy: function (req, res) {
        let actorId = req.params.id;
        Actors
            .destroy({ where: { id: actorId }, force: true }) // force: true es para asegurar que se ejecute la acción
            .then((response) => {
                return res.status(200).json({meta:{
                    total:response.length,
                    status:200,
                    url:"api/actors/delete"
                },
                data:response})
            })
            .catch(error => res.send(error))
    }
}

module.exports = actorsController;