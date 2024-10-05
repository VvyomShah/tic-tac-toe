import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { fetchGameState, makeMove } from '../services/gameService';
import { AppBar, Box, Button, Toolbar, Typography, Paper } from '@mui/material';
import { AuthContext } from '../context/AuthContext';
import '../styles/Game.css';

const GamePage = () => {
    const { gameId } = useParams(); // Get the gameId from the URL
    const [gameState, setGameState] = useState([["", "", ""], ["", "", ""], ["", "", ""]]); // Initialize with an empty game state
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { auth } = useContext(AuthContext); // Get auth context
    const [isGameCompleted, setIsGameCompleted] = useState(false); // Track if the game is completed
    const [winner, setWinner] = useState(null); // Track the winner
    const [winningCells, setWinningCells] = useState([]); // Track winning cells for highlighting

    useEffect(() => {
        if (!auth) {
            window.location.href = '/login';
        }
    }, [auth]);

    useEffect(() => {
        const getGameState = async () => {
            setLoading(true); // Set loading to true when starting the fetch
            try {
                const response = await fetchGameState(gameId, auth);
                console.log('Fetched Game State:', response);

                if (response && Array.isArray(response.gameState)) {
                    setGameState(response.gameState);
                    setIsGameCompleted(response.isGameCompleted);
                    setWinner(response.winner);
                    setWinningCells(response.winningSequence || []);
                } else {
                    throw new Error('Invalid game state format');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        getGameState();
    }, [gameId, auth]);

    const handleCellClick = async (row, col) => {
        if (gameState[row][col] === '' && !loading && !isGameCompleted) {
            try {
                const position = `${row},${col}`; 

                // Call the API to make a move
                const response = await makeMove(gameId, position, auth);

                // Ensure the response is valid before updating state
                if (response && response.gameState && Array.isArray(response.gameState)) {
                    setGameState(response.gameState); // Update local game state
                    setIsGameCompleted(response.isGameCompleted);
                    setWinner(response.winner);
                    setWinningCells(response.winningSequence || []); // Update winning cells if there's a winner
                } else {
                    throw new Error('Invalid game state update');
                }
            } catch (err) {
                setError(err.message);
            }
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <Box>
            {/* Header */}
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Tic Tac Toe
                    </Typography>
                    <Button color="inherit" href="/userhome">Home</Button>
                    <Button color="inherit" href="/">Logout</Button>
                </Toolbar>
            </AppBar>

            {/* Game Board */}
            <Box
                className="game-board"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                sx={{ padding: 3 }}
            >
                <Typography variant="h5" gutterBottom>
                    Game ID: {gameId}
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {gameState.map((row, rowIndex) => (
                        <Box key={rowIndex} display="flex" justifyContent="center" sx={{ marginBottom: 1 }}>
                            {row.map((cell, colIndex) => {
                                const isWinningCell = winningCells.some(
                                    ([r, c]) => r === rowIndex && c === colIndex
                                );

                                return (
                                    <Paper
                                        key={colIndex}
                                        onClick={() => handleCellClick(rowIndex, colIndex)}
                                        className={`game-cell ${isWinningCell ? 'winning-cell' : ''}`} // Highlight winning cells
                                        sx={{
                                            width: 100, // Increased width
                                            height: 100, // Increased height
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            border: '2px solid #ddd', // Thicker border
                                            cursor: isGameCompleted ? 'not-allowed' : 'pointer',
                                            backgroundColor: '#f0f0f0',
                                            margin: '0 4px', // More margin for better spacing
                                            fontSize: '2rem' // Larger font size for better visibility
                                        }}
                                    >
                                        {cell}
                                    </Paper>
                                );
                            })}
                        </Box>
                    ))}
                    {isGameCompleted && (
                        <Typography variant="h6" className="game-finish-message">
                            Game Over! Winner: {winner}
                        </Typography>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default GamePage;
