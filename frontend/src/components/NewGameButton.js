import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { AuthContext } from '../context/AuthContext';
import { startNewGame } from '../services/gameService'; // Import the service function
import { Button, Typography } from '@mui/material';

const NewGameButton = () => {
    const { auth } = useContext(AuthContext); 
    const navigate = useNavigate(); 

    const handleStartNewGame = async () => {
        if (!auth) {
            console.error('User is not authenticated.'); // Handle the case where the user is not authenticated
            return;
        }

        try {
            const data = await startNewGame(auth); // Call the service to start a new game
            const gameId = data.gameId; // Assuming the response contains the game ID
            console.log(`New game started with ID: ${gameId}`);

            // Navigate to the game page
            navigate(`/game/${gameId}`); // Redirect to the game page with the game ID
        } catch (error) {
            console.error(error.message); // Log the error message from the service
        }
    };

    return (
        <Button
            variant="contained"
            color="primary"
            onClick={handleStartNewGame}
            style={{ marginTop: '16px' }}
        >
            <Typography variant="button" color="inherit">
                Start New Game
            </Typography>
        </Button>
    );
};

export default NewGameButton;
