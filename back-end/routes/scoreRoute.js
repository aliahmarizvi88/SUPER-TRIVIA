const express = require('express');
const { submitScore, displayScores } = require('../controllers/urlControllers');

const router = express.Router();

router.post('/submitScore', submitScore);
router.get('/displayScore', displayScores);

module.exports = router;
