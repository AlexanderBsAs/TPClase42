const express = require('express');
const router = express.Router();
const {list,newest,recomended,detail,create,destroy} = require('../../controllers/api/moviesController');

router.get('/api/movies',list);
router.get('/api/movies/new', newest);
router.get('/api/movies/recommended',recomended);
router.get('/api/movies/detail/:id',detail);
//Rutas exigidas para la creación del CRUD

router.post('/api/movies/create',create);
router.delete('/api/movies/delete/:id',destroy);

module.exports = router;