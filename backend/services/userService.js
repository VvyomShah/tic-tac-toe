const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // Set a secure secret for JWT

// Function to register a new user
const registerUser = async (db, username, password) => {
    try {
        // Check if user already exists
        const existingUser = await UserModel.getUserByUsername(db, username);
        if (existingUser) {
            console.log('Username already taken');
            throw new Error('Username already taken');
        }

        // Hash the password before saving
        const passwordHash = await bcrypt.hash(password, 10);

        // Call the model to create a new user
        const userId = await UserModel.createUser(db, username, passwordHash);
        console.log(`User registered successfully with ID ${userId}`);
        return userId; // Return the newly created user ID
    } catch (error) {
        console.error('Error registering user:', error);
        throw new Error('Failed to register user');
    }
};

// Function to authenticate a user
const loginUser = async (db, username, password) => {
    try {
        // Retrieve user information from the database
        const user = await UserModel.getUserByUsername(db, username);
        if (!user) {
            throw new Error('Invalid username or password');
        }

        // Compare provided password with hashed password
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            throw new Error('Invalid username or password');
        }

        // Create a JWT token
        const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
        console.log(`User logged in successfully: ${username}`);
        return { token }; // Return the token
    } catch (error) {
        console.error('Error logging in user:', error);
        throw new Error('Failed to login user');
    }
};

// Function to get user information by user ID
const getUserById = async (db, userId) => {
    try {
        // Call the model to retrieve user data
        const user = await UserModel.getUserById(db, userId);
        if (!user) {
            throw new Error('User not found');
        }
        console.log(`Fetched user by ID: ${userId}`);
        return user; // Return user data
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        throw new Error('Failed to retrieve user');
    }
};

// Function to get user information by username
const getUserByUsername = async (db, username) => {
    try {
        // Call the model to retrieve user data
        const user = await UserModel.getUserByUsername(db, username);
        if (!user) {
            throw new Error('User not found');
        }
        console.log(`Fetched user by username: ${username}`);
        return user; // Return user data
    } catch (error) {
        console.error('Error fetching user by username:', error);
        throw new Error('Failed to retrieve user');
    }
};

module.exports = {
    registerUser,
    loginUser,
    getUserById,
    getUserByUsername,
};
