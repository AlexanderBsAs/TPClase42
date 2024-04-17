const express = require('express');
const router = express.Router();
const {list,newest,recomended,detail,create,destroy} = require('../../controllers/api/actorsControllers');

router.get('/api/actors',list);
router.get('/api/actors/new', newest);
router.get('/api/actors/recommended',recomended);
router.get('/api/actors/detail/:id',detail);
//Rutas exigidas para la creación del CRUD

router.post('/api/actors/create',create);
router.delete('/api/actors/delete/:id',destroy);

module.exports = router;