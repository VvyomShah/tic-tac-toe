import React, { useEffect, useState, useContext } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { fetchRecordsHistory } from '../services/recordService'; // Assuming you have a service for records
import { AuthContext } from '../context/AuthContext';

const RecordsTable = () => {
    const [recordsHistory, setRecordsHistory] = useState([]);
    const { auth } = useContext(AuthContext); 

    useEffect(() => {
        // Fetch records history from the service
        fetchRecordsHistory(auth)
            .then((response) => {
                setRecordsHistory(response);
            })
            .catch((error) => {
                console.error('Error fetching records history:', error);
            });
    }, [auth]);

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Record ID</TableCell>
                        <TableCell align="center">User ID</TableCell>
                        <TableCell align="center">Total Games</TableCell>
                        <TableCell align="center">Total Wins</TableCell>
                        <TableCell align="center">Longest Win Streak</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {recordsHistory.map((record) => (
                        <TableRow key={record.recordId}>
                            <TableCell align="center">{record.id}</TableCell>
                            <TableCell align="center">{record.user_id}</TableCell>
                            <TableCell align="center">{record.total_games}</TableCell>
                            <TableCell align="center">{record.total_wins}</TableCell>
                            <TableCell align="center">{record.best_streak}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default RecordsTable;
