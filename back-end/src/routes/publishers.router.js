const Router = require('express');
const PublishersController = require('../controllers/publishers.controller');

const router = Router();

router.get(
  '/getAll',
  PublishersController.getAll,
);

module.exports = router;