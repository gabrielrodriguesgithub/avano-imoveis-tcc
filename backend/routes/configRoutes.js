const express = require('express');
const { getConfig, updateConfig } = require('../controllers/configController');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(authMiddleware);
router.get('/', getConfig);
router.put('/', updateConfig);

module.exports = router;
