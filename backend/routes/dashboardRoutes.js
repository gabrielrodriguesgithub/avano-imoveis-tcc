const express = require('express');
const { getStats, getMetrics, getVisitsMonthly } = require('../controllers/dashboardController');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(authMiddleware);
router.get('/stats', getStats);
router.get('/metrics', getMetrics);
router.get('/visits-monthly', getVisitsMonthly);

module.exports = router;
