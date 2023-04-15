const Router = require('express');
const ReleaseController = require('../controllers/release.controller');

const router = Router();

router.get(
  '/getAll',
  ReleaseController.getAll,
);

module.exports = router;
