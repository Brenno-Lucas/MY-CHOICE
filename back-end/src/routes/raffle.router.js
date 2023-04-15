const Router = require('express');
const RaffleController = require('../controllers/raffle.controller');

const router = Router();

router.get(
  '/getAll',
  RaffleController.getAll,
);

module.exports = router;
