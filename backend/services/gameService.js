const GameModel = require('../models/gameModel');
const MoveModel = require('../models/moveModel');

// Function to create a new game
const createGame = async (db, userId, initialGameState) => {
    try {
        // Call to the model to insert a new game
        const gameId = await GameModel.createGame(db, userId, initialGameState);
        console.log(`Game created successfully: Game ID ${gameId} for User ID ${userId}`);
        return gameId;
    } catch (error) {
        console.error('Error creating game:', error);
        throw new Error('Failed to create game');
    }
};

// Function to get a game by gameId
const getGameStateById = async (db, gameId, userId) => {
    try {
        // Call to the model to retrieve the game
        const game = await GameModel.getGameStateById(db, gameId, userId);

        // If the game was found, ensure game_state is parsed as JSON
        if (game) {
            const gameState = typeof game.game_state === 'string' ? JSON.parse(game.game_state) : game.game_state;
            return {
                gameState,
                isGameCompleted: game.is_complete,
                winner: game.winner,
                winningSequence: game.winning_sequence
            };
        }

        throw new Error('Game not found');
    } catch (error) {
        console.error('Error fetching game state:', error);
        throw new Error('Failed to retrieve game state');
    }
};

// Function to update the game state
const updateGameState = async (db, gameId, gameState) => {
    try {
        // Call to the model to update the game state
        await GameModel.updateGameState(db, gameId, gameState);
        console.log(`Game state updated successfully for Game ID ${gameId}`);
    } catch (error) {
        console.error('Error updating game state:', error);
        throw new Error('Failed to update game state');
    }
};

// Function to make a move in the game
const makeMoveInGame = async (db, gameId, position, playerMove, userId) => {
    try {
        // Split the position string into x and y coordinates
        const [x, y] = position.split(',').map(Number); // Convert to numbers

        // Get moveNumber
        const moveNumber = await MoveModel.getMoveNumber(db, gameId);

        // Fetch current game state
        const response = await getGameStateById(db, gameId, userId);

        // Validate the structure of the game state
        const gameState = response.gameState; // Extract gameState from the response
        if (!Array.isArray(gameState) || gameState.length !== 3 ||
            !gameState.every(row => Array.isArray(row) && row.length === 3)) {
            throw new Error('Game state structure is invalid.');
        }

        // Check if the move is valid
        if (gameState[x][y] !== '') {
            throw new Error('Invalid move, cell already occupied');
        }

        // Update the game state with the player's move
        gameState[x][y] = playerMove;

        // Call to the model to update the game state in the database
        await updateGameState(db, gameId, gameState);

        // Create a move record in the Moves table
        await MoveModel.createMove(db, gameId, moveNumber, playerMove, position, 1); // Assuming the move is made by player

        return {
            gameState,                        // Return the updated game state
            isGameCompleted: response.isGameCompleted, // Include isGameCompleted
            winner: response.winner,          // Include winner
            winningSequence: response.winningSequence // Include winning sequence
        };
    } catch (error) {
        console.error('Error making move in game:', error);
        throw new Error('Failed to make move in game');
    }
};

// Function to make AI move
const makeAIMove = async (db, gameId, userId) => {
    try {
        // Fetch the current game state
        const gameStateResponse = await getGameStateById(db, gameId, userId);

        // Ensure gameState is properly structured
        if (!gameStateResponse || !gameStateResponse.gameState || !Array.isArray(gameStateResponse.gameState)) {
            throw new Error('Game state is invalid or not found.');
        }

        const gameState = gameStateResponse.gameState; // Correctly extract gameState
        console.log('Current Game State for AI:', JSON.stringify(gameState, null, 2)); // Debugging log

        // Get the AI move based on the current game state
        const { x, y } = getAIMove(gameState); // Call to your AI move logic

        // Check if the AI move is valid
        if (x === undefined || y === undefined || gameState[x][y] !== '') {
            throw new Error('Invalid AI move generated.');
        }

        // Update the game state with the AI move
        gameState[x][y] = 'O'; // Assuming 'O' is the AI player

        // Call to update the game state in the database
        await updateGameState(db, gameId, gameState);

        return {
            gameState: gameState,
            isGameCompleted: gameStateResponse.isComplete,
            winner: gameStateResponse.winner,
            winningSequence: gameStateResponse.winningSequence,
        };
    } catch (error) {
        console.error('Error making AI move:', error);
        throw new Error('Failed to make AI move');
    }
};

// AI logic function
const getAIMove = (gameState) => {
    // Validate input
    if (!Array.isArray(gameState) || gameState.length !== 3 ||
        !gameState.every(row => Array.isArray(row) && row.length === 3)) {
        throw new Error('Invalid game state structure.');
    }

    // AI logic here: choose the first available cell
    for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {
            if (gameState[x][y] === '') {
                console.log(`AI selects position: ${x}, ${y}`); // Debugging log
                return { x, y }; // Return the coordinates of the chosen move
            }
        }
    }

    throw new Error('No valid moves available.'); // In case the board is full
};

// Function to check if game is completed
const isGameCompleted = async (db, gameId) => {
    try {
        const isCompleted = await GameModel.isGameCompleted(db, gameId);
        console.log(`Game ID ${gameId} completion status: ${isCompleted}`);
        return isCompleted;
    } catch (error) {
        console.error('Error checking game completion status:', error);
        throw new Error('Failed to check game completion status');
    }
};

// Function to update the game status
const updateGameStatus = async (db, gameId, isComplete, winner, winningSequence) => {
    try {
        await GameModel.updateGameStatus(db, gameId, isComplete, winner, winningSequence);
        console.log(`Game ID ${gameId} status updated: isComplete=${isComplete}, winner=${winner}`);
    } catch (error) {
        console.error('Error updating game status:', error);
        throw new Error('Error updating game status');
    }
};

// Function to get all games by user ID
const getAllGamesByUserId = async (db, userId) => {
    try {
        const games = await GameModel.getAllGamesByUserId(db, userId);
        console.log(`Fetched all games for User ID ${userId}:`, games);
        return games;
    } catch (error) {
        console.error('Error fetching all games by user ID:', error);
        throw new Error('Failed to fetch game history: ' + error.message);
    }
};

module.exports = {
    createGame,
    getGameStateById,
    updateGameState,
    makeMoveInGame,
    getAllGamesByUserId,
    makeAIMove,
    isGameCompleted,
    updateGameStatus
};
