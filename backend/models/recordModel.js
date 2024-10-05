class RecordModel {
    static async createRecord(db, userId, winStreak = 0) {
        try {
            const [result] = await db.query(
                'INSERT INTO Records (user_id, total_games, total_wins, total_losses, total_draws, win_streak, best_streak) VALUES (?, 0, 0, 0, 0, ?, 0)',
                [userId, winStreak]
            );
            console.log(`Record created successfully for User ID ${userId}: Record ID ${result.insertId}`);
            return result.insertId; // Return the ID of the newly created record
        } catch (error) {
            console.error('Error creating record:', error);
            throw new Error('Failed to create record');
        }
    }

    static async getRecords(db) {
        try {
            const [records] = await db.query('SELECT * FROM Records ORDER BY total_wins DESC');
            console.log(`Fetched ${records.length} records.`);
            return records;
        } catch (error) {
            console.error('Error fetching records:', error);
            throw new Error('Failed to fetch records');
        }
    }

    static async getRecordByUserId(db, userId) {
        try {
            const [records] = await db.query('SELECT * FROM Records WHERE user_id = ?', [userId]);
            console.log(`Fetched record for User ID ${userId}:`, records.length > 0 ? records[0] : 'No record found');
            return records.length > 0 ? records[0] : null;
        } catch (error) {
            console.error('Error fetching record by user ID:', error);
            throw new Error('Failed to fetch record by user ID');
        }
    }

    static async incrementTotalGames(db, userId) {
        try {
            const query = 'UPDATE Records SET total_games = total_games + 1 WHERE user_id = ?';
            await db.query(query, [userId]);
            console.log(`Total games incremented for User ID ${userId}`);
        } catch (error) {
            console.error('Error incrementing total games:', error);
            throw new Error('Failed to increment total games');
        }
    }

    static async incrementTotalWins(db, userId) {
        try {
            const query = 'UPDATE Records SET total_wins = total_wins + 1, win_streak = win_streak + 1 WHERE user_id = ?';
            await db.query(query, [userId]);
            console.log(`Total wins incremented for User ID ${userId}`);
        } catch (error) {
            console.error('Error incrementing total wins:', error);
            throw new Error('Failed to increment total wins');
        }
    }

    static async incrementTotalLosses(db, userId) {
        try {
            const query = 'UPDATE Records SET total_losses = total_losses + 1, win_streak = 0 WHERE user_id = ?';
            await db.query(query, [userId]);
            console.log(`Total losses incremented for User ID ${userId}`);
        } catch (error) {
            console.error('Error incrementing total losses:', error);
            throw new Error('Failed to increment total losses');
        }
    }

    static async incrementTotalDraws(db, userId) {
        try {
            const query = 'UPDATE Records SET total_draws = total_draws + 1, win_streak = 0 WHERE user_id = ?';
            await db.query(query, [userId]);
            console.log(`Total draws incremented for User ID ${userId}`);
        } catch (error) {
            console.error('Error incrementing total draws:', error);
            throw new Error('Failed to increment total draws');
        }
    }

    static async updateBestStreak(db, userId) {
        try {
            const query = 'UPDATE Records SET best_streak = GREATEST(best_streak, win_streak) WHERE user_id = ?';
            await db.query(query, [userId]);
            console.log(`Best streak updated for User ID ${userId}`);
        } catch (error) {
            console.error('Error updating best streak:', error);
            throw new Error('Failed to update best streak');
        }
    }
}

module.exports = RecordModel;
