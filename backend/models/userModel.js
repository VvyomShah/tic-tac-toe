class UserModel {
    static async createUser(db, username, passwordHash) {
        try {
            const [result] = await db.query(
                'INSERT INTO Users (username, password_hash) VALUES (?, ?)',
                [username, passwordHash]
            );
            console.log(`User created successfully: Username ${username}, User ID ${result.insertId}`);
            return result.insertId;
        } catch (error) {
            console.error('Error creating user:', error);
            throw new Error('Failed to create user');
        }
    }

    static async getUserById(db, userId) {
        try {
            const [users] = await db.query('SELECT * FROM Users WHERE id = ?', [userId]);
            console.log(`Fetched user by ID ${userId}:`, users.length > 0 ? users[0] : 'No user found');
            return users.length > 0 ? users[0] : null;
        } catch (error) {
            console.error('Error fetching user by ID:', error);
            throw new Error('Failed to retrieve user by ID');
        }
    }

    static async getUserByUsername(db, username) {
        try {
            const [users] = await db.query('SELECT * FROM Users WHERE username = ?', [username]);
            console.log(`Fetched user by username ${username}:`, users.length > 0 ? users[0] : 'No user found');
            return users.length > 0 ? users[0] : null;
        } catch (error) {
            console.error('Error fetching user by username:', error);
            throw new Error('Failed to retrieve user by username');
        }
    }
}

module.exports = UserModel;
