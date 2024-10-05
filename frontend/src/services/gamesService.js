import axios from 'axios';

const API_URL = 'http://localhost:3000/games';

export const fetchGameHistory = async (token) => {
    try {
        const response = await axios.get(`${API_URL}`, {
            headers: {
                'Authorization': `Bearer ${token}`, // Using Bearer token for authentication
            },
        });
        console.log(response.data.games)
        return response.data.games;
    } catch (error) {
        throw new Error('Failed to fetch game history');
    }
};