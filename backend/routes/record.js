const express = require('express');
const router = express.Router();
const { getRecords } = require('../controllers/recordController');
const authenticateJWT = require('../middleware/authMiddleware');


router.get('/', authenticateJWT, getRecords);

module.exports = router;