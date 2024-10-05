import React, { useEffect, useState, useContext } from 'react';
import { fetchGameHistory } from '../services/gamesService';
import { useNavigate } from 'react-router-dom'; // To navigate to the game page
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { AuthContext } from '../context/AuthContext';

const GameHistory = () => {
    const [games, setGames] = useState([]);
    const { auth } = useContext(AuthContext); // Get auth context
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch game history from the service
        fetchGameHistory(auth)
            .then((response) => {
                setGames(response);
            })
            .catch((error) => {
                console.error('Error fetching game history:', error);
            });
    }, [auth]);

    // Handler for the "View/Continue" button
    const handleGameAction = (gameId) => {
        navigate(`/game/${gameId}`); // Navigate to the game page
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Game ID</TableCell>
                        <TableCell>Winner</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Action</TableCell> {/* New column for action */}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {games.map((game) => (
                        <TableRow key={game.id}>
                            <TableCell>{game.id}</TableCell>
                            <TableCell>{game.winner || 'In Progress'}</TableCell>
                            <TableCell>{game.is_complete ? 'Complete' : 'In Progress'}</TableCell>
                            <TableCell>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleGameAction(game.id)} // Navigate to the game
                                >
                                    {game.is_complete ? 'View' : 'Continue'}
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default GameHistory;
