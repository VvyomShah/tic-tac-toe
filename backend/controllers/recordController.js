const recordService = require('../services/recordService');

// Fetch all records for userId
const getRecords = async (req, res) => {
    try {
        const response = await recordService.getRecords(req.db);
        res.status(200).json({ records: response });

    } catch (error) {
        console.log('Failed to fetch records.')
        res.status(404).json({ error: error.message }); // Handle not found
    }
};

module.exports = {
    getRecords,
};