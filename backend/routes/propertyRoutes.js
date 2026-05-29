const express = require('express');
const { listProperties, getPropertyById, createProperty, updateProperty, deleteProperty } = require('../controllers/propertyController');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', listProperties);
router.get('/:id', getPropertyById);
router.post('/', authMiddleware, createProperty);
router.put('/:id', authMiddleware, updateProperty);
router.delete('/:id', authMiddleware, deleteProperty);

module.exports = router;
