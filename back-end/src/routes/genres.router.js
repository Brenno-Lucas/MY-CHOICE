const Router = require('express');
const GenresController = require('../controllers/genres.controller');

const router = Router();

router.get(
  '/getAll',
  GenresController.getAllGenres,
);

module.exports = router;
