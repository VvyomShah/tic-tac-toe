const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const db = require('./utils/db');
const cors = require('cors');

const authRoutes = require('./routes/auth'); // Import the auth routes
const gameRoutes = require('./routes/game'); // Import the game routes
const gamesRoutes = require('./routes/games');
const recordsRoutes = require('./routes/record');

require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
})); 
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use((req, res, next) => {
    req.db = db; // Attach db to req
    next();
});

// Use Routes
app.use('/auth', authRoutes);
app.use('/game', gameRoutes);
app.use('/games', gamesRoutes);
app.use('/record', recordsRoutes)

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: 'Something went wrong!' });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});