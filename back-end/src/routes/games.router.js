const Router = require('express');
const GamesController = require('../controller/games.controller');

const router = Router();

router.get(
  '/getAll',
  GamesController.getGameSearched,
);

module.exports = router;
