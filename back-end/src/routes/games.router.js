const Router = require('express');
const GamesController = require('../controllers/games.controller');

const router = Router();

router.get(
  '/getAll',
  GamesController.getGameSearched,
);

module.exports = router;
