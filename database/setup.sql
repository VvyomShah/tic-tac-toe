-- Drop existing database
DROP DATABASE IF EXISTS tic_tac_toe;

-- Create the Tic-Tac-Toe database
CREATE DATABASE IF NOT EXISTS tic_tac_toe;
USE tic_tac_toe;

-- Create Users table for authentication
CREATE TABLE IF NOT EXISTS Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create Games table for tracking game state
CREATE TABLE IF NOT EXISTS Games (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    game_state JSON,
    is_complete BOOLEAN DEFAULT FALSE,
    winner VARCHAR(10) DEFAULT NULL,
    winning_sequence JSON,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

-- Create Moves table (optional, for tracking moves)
CREATE TABLE IF NOT EXISTS Moves (
    id INT AUTO_INCREMENT PRIMARY KEY,
    game_id INT,
    move_number INT,
    player_move VARCHAR(1),
    position VARCHAR(3),
    is_player BOOLEAN,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (game_id) REFERENCES Games(id)
);

-- Create Records table for leaderboard and user stats
CREATE TABLE IF NOT EXISTS Records (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    total_games INT DEFAULT 0,
    total_wins INT DEFAULT 0,
    total_losses INT DEFAULT 0,
    total_draws INT DEFAULT 0,
    win_streak INT DEFAULT 0,
    best_streak INT DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id)
);