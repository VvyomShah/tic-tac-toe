const RecordModel = require('../models/recordModel');

// Function to create a new record for a user
const createRecord = async (db, userId) => {
    try {
        const record = await RecordModel.createRecord(db, userId);
        console.log(`Record created successfully for User ID ${userId}`);
        return record;
    } catch (error) {
        console.error('Error creating record:', error);
        throw new Error('Failed to create record');
    }
};

// Function to update game records based on the game status
const updateGameRecords = async (db, userId, gameStatus) => {
    try {
        // Increment total games played
        await RecordModel.incrementTotalGames(db, userId);

        // Update records based on game status
        if (gameStatus === 'win') {
            await RecordModel.incrementTotalWins(db, userId);
            await RecordModel.updateBestStreak(db, userId); // Update best streak if necessary
            console.log(`Total wins incremented for User ID ${userId}`);
        } else if (gameStatus === 'loss') {
            await RecordModel.incrementTotalLosses(db, userId);
            console.log(`Total losses incremented for User ID ${userId}`);
        } else if (gameStatus === 'draw') {
            await RecordModel.incrementTotalDraws(db, userId);
            console.log(`Total draws incremented for User ID ${userId}`);
        } else {
            throw new Error('Invalid game status');
        }
    } catch (error) {
        console.error('Error updating game records:', error);
        throw new Error('Failed to update game records');
    }
};

// Function to retrieve all records
const getRecords = async (db) => {
    try {
        const records = await RecordModel.getRecords(db);
        console.log('Fetched all records:', records);
        return records;
    } catch (error) {
        console.error('Error fetching records:', error);
        throw new Error('Failed to retrieve records');
    }
};

module.exports = {
    updateGameRecords,
    createRecord,
    getRecords,
};
