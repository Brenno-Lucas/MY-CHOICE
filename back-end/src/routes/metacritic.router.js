const Router = require('express');
const MetacriticController = require('../controllers/metacritic.controller');

const router = Router();

router.get(
  '/getAll',
  MetacriticController.getAll,
);

module.exports = router;
