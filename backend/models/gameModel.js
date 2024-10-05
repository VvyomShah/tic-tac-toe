class GameModel {
    static async createGame(db, userId, initialGameState) {
        const gameState = JSON.stringify(initialGameState); // Convert the initial state to a JSON string
        try {
            const [result] = await db.query(
                'INSERT INTO Games (user_id, game_state) VALUES (?, ?)',
                [userId, gameState]
            );
            console.log(`Game created successfully with ID: ${result.insertId} for user: ${userId}`);
            return result.insertId;
        } catch (error) {
            console.error('Error creating game:', error);
            throw new Error('Failed to create game');
        }
    }

    static async getGameStateById(db, gameId, userId) {
        try {
            const [game] = await db.query('SELECT * FROM Games WHERE id = ? AND user_id = ?', [gameId, userId]);
            if (game.length === 0) {
                console.warn(`No game found with ID: ${gameId} for user: ${userId}`);
                return null;
            }
            console.log(`Game state fetched successfully for game ID: ${gameId}, user: ${userId}`);
            return game[0];
        } catch (error) {
            console.error('Error fetching game state:', error);
            throw new Error('Failed to retrieve game state');
        }
    }

    static async updateGameState(db, gameId, gameState) {
        try {
            await db.query(
                'UPDATE Games SET game_state = ? WHERE id = ?',
                [JSON.stringify(gameState), gameId]
            );
            console.log(`Game state updated successfully for game ID: ${gameId}`);
        } catch (error) {
            console.error('Error updating game state:', error);
            throw new Error('Failed to update game state');
        }
    }

    static async isGameCompleted(db, gameId) {
        try {
            console.log('Checking game completion for game ID:', gameId);
            const [rows] = await db.query('SELECT is_complete FROM Games WHERE id = ?', [gameId]);
            console.log('Query result:', rows);

            if (rows.length === 0) {
                console.warn(`No game found with ID: ${gameId}`);
                return 0;
            }
            console.log(`Game completion status fetched successfully for game ID: ${gameId}`);
            return rows[0]['is_complete'];
        } catch (error) {
            console.error('Error checking game completion:', error);
            throw new Error('Failed to check game status');
        }
    }

    static async updateGameStatus(db, gameId, isComplete, winner, winningSequence) {
        const sql = 'UPDATE Games SET is_complete = ?, winner = ?, winning_sequence = ? WHERE id = ?';
        const values = [isComplete, winner, JSON.stringify(winningSequence), gameId];

        try {
            await db.query(sql, values);
            console.log(`Game status updated successfully for game ID: ${gameId}`);
        } catch (error) {
            console.error('Error updating game status:', error);
            throw new Error('Failed to update game status');
        }
    }

    static async getAllGamesByUserId(db, userId) {
        try {
            const [games] = await db.query('SELECT * FROM Games WHERE user_id = ?', [userId]);
            if (games.length === 0) {
                console.warn(`No games found for user ID: ${userId}`);
                return [];
            }
            console.log(`Fetched all games for user ID: ${userId}`);
            return games;
        } catch (error) {
            console.error('Error fetching all user games:', error);
            throw new Error('Error fetching all user games');
        }
    }
}

module.exports = GameModel;