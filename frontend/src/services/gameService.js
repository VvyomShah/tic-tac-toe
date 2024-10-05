import axios from 'axios';

const API_URL = 'http://localhost:3000/game';

export const startNewGame = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/start`, {
            headers: {
                'Authorization': `Bearer ${token}`, // Attach the token in the headers
            },
        });
        return response.data; // Assuming the response contains the game ID
    } catch (error) {
        throw new Error('Error starting new game: ' + error.response.data.message || error.message);
    }
};

export const fetchGameState = async (gameId, token) => {
    try {
        const response = await axios.get(`${API_URL}/${gameId}`, {
            headers: {
                'Authorization': `Bearer ${token}`, // Attach the token in the headers
            },
        });
        return response.data;
    } catch (error) {
            throw new Error('Error fetching game state: ' + error.response.data.message || error.message);
    }
};

export const makeMove = async (gameId, position, token) => {
    try {
        const response = await axios.post(`${API_URL}/move`, {
            gameId: gameId,
            position: position 
        }, {
            headers: {
                'Authorization': `Bearer ${token}`, // Attach the token in the headers
            },
        });
        return response.data; // This should return the updated game state array
    } catch (error) {
        throw new Error('Error making move: ' + error.response.data.message || error.message);
    }
};
