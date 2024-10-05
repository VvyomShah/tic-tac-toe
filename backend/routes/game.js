const express = require('express');
const router = express.Router();
const { startGame, makeMove, getGameState, getAllGamesByUserId } = require('../controllers/gameController');
const authenticateJWT = require('../middleware/authMiddleware');

router.get('/start', authenticateJWT, startGame);
router.post('/move', authenticateJWT, makeMove);
router.get('/:gameId', authenticateJWT, getGameState);

module.exports = router;