const Joi = require('joi');
const gameService = require('../services/gameService');
const recordService = require('../services/recordService'); // Import records service
const { checkGameOver } = require('../utils/gameUtils')

// Start a new game
const startGame = async (req, res) => {
    const gameState = Array.from({ length: 3 }, () => Array(3).fill(''));
    try {
        const gameId = await gameService.createGame(req.db, req.user.id, gameState); // Delegate to gameService
        res.status(201).json({ message: 'Game started', gameId: gameId });
        console.log(`Game started with GameID: ${gameId}`);
    } catch (error) {
        res.status(500).json({ error: 'Failed to start game' });
    }
};

const makeMove = async (req, res) => {
    const makeMoveValidation = Joi.object({
        gameId: Joi.number().required(),
        position: Joi.string().pattern(/^\d,\d$/)
            .custom((value, helpers) => {
                const [x, y] = value.split(',').map(Number);
                if (x < 0 || x > 2 || y < 0 || y > 2) {
                    return helpers.error('Position(x,y) values out of bound');
                }
                return value; // If valid, return the value
            })
            .required(),
        playerMove: Joi.string().valid('X', 'O').required(),
    });

    try {
        const { gameId, position } = req.body;
        const playerMove = 'X'; // Assuming the player is 'X'
        const userId = req.user.id; // Assuming you have user info in the request

        const isCompleted = await gameService.isGameCompleted(req.db, gameId);
        if (isCompleted) {
            return res.status(400).json({ message: 'Cannot make a move on a completed game.' });
        }

        // Player's move
        const updatedGameState = await gameService.makeMoveInGame(req.db, gameId, position, playerMove, userId);

        console.log('Updated Game State:', updatedGameState);

        // Check if the game state is defined
        if (!updatedGameState || !Array.isArray(updatedGameState.gameState)) {
            throw new Error('Updated game state is undefined or invalid.');
        }
        // Check if the game is still ongoing after player's move
        const playerGameStatus = checkGameOver(updatedGameState.gameState);

        if (playerGameStatus.status === 'win') {
            await gameService.updateGameStatus(req.db, gameId, true, playerGameStatus.winner, playerGameStatus.winningSequence);
            await recordService.updateGameRecords(req.db, userId, 'win');
            return res.json({ gameState: updatedGameState.gameState, isGameCompleted: 1, winner: 'X', winningSequence: playerGameStatus.winningSequence, message: `Player ${playerGameStatus.winner} wins!` });
        } else if (playerGameStatus.status === 'draw') {
            await gameService.updateGameStatus(req.db, gameId, true, null, playerGameStatus.winningSequence);
            await recordService.updateGameRecords(req.db, userId, 'draw');
            return res.json({ gameState: updatedGameState.gameState, isGameCompleted: 1, winner: null, winningSequence: null, message: 'The game is a draw.' });
        }

        // If ongoing, let the AI make its move
        const aiUpdatedGameState = await gameService.makeAIMove(req.db, gameId, userId);
        // Log the AI updated game state before checking for game over
        console.log('AI Updated Game State:', aiUpdatedGameState);

        // Check AI move status
        const aiGameStatus = checkGameOver(aiUpdatedGameState.gameState);
        if (aiGameStatus.status === 'win') {
            await gameService.updateGameStatus(req.db, gameId, true, aiGameStatus.winner, aiGameStatus.winningSequence);
            await recordService.updateGameRecords(req.db, userId, 'loss');
            return res.json({ gameState: aiUpdatedGameState.gameState, isGameCompleted: 1, winner: 'O', winningSequence: aiGameStatus.winningSequence, message: `Player ${aiGameStatus.winner} wins!` });
        }

        // If still ongoing, return the updated game state
        return res.status(200).json(aiUpdatedGameState);

    } catch (error) {
        console.error('Error in makeMove:', error);
        res.status(500).json({ message: error.message });
    }
};


// Get current game state by gameId
const getGameState = async (req, res) => {
    const { gameId } = req.params;
    try {
        const gameStateResponse = await gameService.getGameStateById(req.db, gameId, req.user.id);
        res.status(200).json(gameStateResponse); // Return the structured response
    } catch (error) {
        res.status(404).json({ error: error.message }); // Handle not found
    }
};

// Get all games by userId
const getAllGamesByUserId = async (req, res) => {
    try {
        // Fetch the games for the user from the service
        const games = await gameService.getAllGamesByUserId(req.db, req.user.id);

        // Return the games in the response
        res.status(200).json({ games });
    } catch (error) {
        console.error('Error retrieving games:', error);
        res.status(500).json({ error: 'Failed to retrieve games' });
    }
};

module.exports = {
    startGame,
    makeMove,
    getGameState,
    getAllGamesByUserId,
};