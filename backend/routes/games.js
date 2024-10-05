const express = require('express');
const router = express.Router();
const { getAllGamesByUserId } = require('../controllers/gameController');
const authenticateJWT = require('../middleware/authMiddleware');


router.get('/', authenticateJWT, getAllGamesByUserId);

module.exports = router;