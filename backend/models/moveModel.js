class MoveModel {
    static async createMove(db, gameId, moveNumber, playerMove, position, isPlayer) {
        try {
            const [result] = await db.query(
                'INSERT INTO Moves (game_id, move_number, player_move, position, is_player) VALUES (?, ?, ?, ?, ?)',
                [gameId, moveNumber, playerMove, position, isPlayer]
            );
            console.log(`Move inserted successfully: Move ID ${result.insertId} for Game ID ${gameId}`);
        } catch (error) {
            console.error('Error inserting move:', error);
            throw new Error('Failed to insert move');
        }
    }

    static async getMovesByGameId(db, gameId) {
        try {
            const [moves] = await db.query('SELECT * FROM Moves WHERE game_id = ?', [gameId]);
            console.log(`Fetched ${moves.length} moves for Game ID: ${gameId}`);
            return moves;
        } catch (error) {
            console.error('Error fetching moves by game ID:', error);
            throw new Error('Failed to fetch moves');
        }
    }

    static async getMoveNumber(db, gameId) {
        try {
            const [results] = await db.query('SELECT COUNT(*) as count FROM Moves WHERE game_id = ?', [gameId]);
            const moveNumber = results[0].count + 1; // Move number starts from 1
            console.log(`Next move number for Game ID ${gameId} is: ${moveNumber}`);
            return moveNumber;
        } catch (error) {
            console.error('Error fetching move number:', error);
            throw new Error('Failed to fetch move number');
        }
    }
}

module.exports = MoveModel;