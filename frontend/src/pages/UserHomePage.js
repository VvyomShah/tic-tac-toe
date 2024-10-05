import React, { useContext } from 'react';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import NewGameButton from '../components/NewGameButton';
import GameHistoryTable from '../components/GameHistoryTable';
import RecordsTable from '../components/RecordsTable';
import '../styles/UserHome.css';

const UserHomePage = () => {
    const { logout } = useContext(AuthContext);
    return (
        <Box>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Tic Tac Toe
                    </Typography>
                    <Button color="inherit" component={Link} to="/userhome">Home</Button>
                    <Button color="inherit" component={Link} onClick={logout} to="/">Logout</Button>
                </Toolbar>
            </AppBar>

            <Box sx={{ padding: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <Box sx={{ width: '100%', marginTop: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                        <Typography variant="h5">Game History</Typography>
                        <NewGameButton />
                    </Box>
                    <GameHistoryTable />
                </Box>
                <Box sx={{ width: '100%', marginTop: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                        <Typography variant="h5">Record History</Typography>
                    </Box>
                </Box>
                <RecordsTable />
            </Box>
        </Box>
    );
};

export default UserHomePage;
