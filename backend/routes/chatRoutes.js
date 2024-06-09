const express = require('express');
const { sendMessage, getMessages, upload } = require('../controllers/chatController');
const { authenticateToken } = require('../utils/auth');

const router = express.Router();

router.post('/message', authenticateToken, upload, sendMessage);
router.get('/messages/:roomId', authenticateToken, getMessages);

module.exports = router;
