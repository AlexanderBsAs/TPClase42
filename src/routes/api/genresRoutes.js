const express = require('express');
const router = express.Router();
const {list,detail} = require('../../controllers/api/genresController');

router.get('/api/genres', list);
router.get('/api/genres/detail/:id', detail);


module.exports = router;