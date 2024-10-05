import axios from 'axios';

const API_URL = 'http://localhost:3000/record';

export const fetchRecordsHistory = async (auth) => {
    try {
        console.log('Making API call with token:', auth);
        const response = await axios({
            method: 'get',
            url: `${API_URL}`,
            headers: {
                'Authorization': `Bearer ${auth}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });
        console.log('Response Data:', response.data.records);
        return response.data.records;
    } catch (error) {
        console.error('Error during axios request:', error.response ? error.response.data : error.message);
        throw error;
    }
};
