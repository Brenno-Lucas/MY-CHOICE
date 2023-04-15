const Router = require('express');
const DevelopersController = require('../controllers/developers.controller');

const router = Router();

router.get(
  '/getAll',
  DevelopersController.getAll,
);

module.exports = router;