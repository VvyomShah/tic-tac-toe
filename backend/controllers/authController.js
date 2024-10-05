const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const userService = require('../services/userService');
const recordService = require('../services/recordService')

// Register a new user
const register = async (req, res) => {
    const registerValidation = Joi.object({
        username: Joi.string().min(3).max(30).required(),
        password: Joi.string().min(6).max(128).required(),
    });

    const { error } = registerValidation.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { username, password } = req.body;

    try {
        // Attempt to register the user
        const userId = await userService.registerUser(req.db, username, password); // Delegate to userService
        console.log(`User created successfully with ID: ${userId}`);

        // Attempt to create a record entry for the new user
        await recordService.createRecord(req.db, userId, 0); // Initialize winStreak or other defaults
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        // Handle any errors that occurred during the user creation or record creation
        console.warn("Error during user registration or record creation:", error.message);
        res.status(500).json({ error: 'Failed to create user or record.' });
    }
};


// Validation schema for login
const loginValidation = Joi.object({
    username: Joi.string().min(3).required(),
    password: Joi.string().required(),
});

// Login user
const login = async (req, res) => {
    const { error } = loginValidation.validate(req.body);
    if (error) {
        console.warn("Validation error:", error.details[0].message);
        return res.status(400).json({ error: error.details[0].message });
    }

    const { username, password } = req.body;
    try {
        const user = await userService.getUserByUsername(req.db, username); // Delegate to userService
        if (!user) return res.status(401).json({ error: 'Invalid username or password' });

        const isPasswordValid = await bcrypt.compare(password, user.password_hash);
        if (!isPasswordValid) return res.status(401).json({ error: 'Invalid username or password' });

        const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ error: `${error}` });
    }
};

module.exports = { register, login };