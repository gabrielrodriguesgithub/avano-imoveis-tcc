const express = require('express');
const { createMessage, listMessages, getMessageById, updateMessage, deleteMessage } = require('../controllers/supportController');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/messages', createMessage);
router.use(authMiddleware);
router.get('/messages', listMessages);
router.get('/messages/:id', getMessageById);
router.put('/messages/:id', updateMessage);
router.delete('/messages/:id', deleteMessage);

module.exports = router;
