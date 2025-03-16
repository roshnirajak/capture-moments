const express = require('express');
const { startCapture, stopCapture } = require('../controllers/captureController');

const router = express.Router();

router.post('/start-capture', startCapture);
router.post('/stop-capture', stopCapture);

module.exports = router;
