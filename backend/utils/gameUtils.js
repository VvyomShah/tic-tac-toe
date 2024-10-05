const checkGameOver = (gameState) => {
    // Validate input
    if (!gameState || !Array.isArray(gameState) || gameState.length !== 3 ||
        !gameState.every(row => Array.isArray(row) && row.length === 3)) {
        throw new Error('Invalid game state structure.');
    }

    // Define winning combinations
    const winningCombinations = [
        // Rows
        [[0, 0], [0, 1], [0, 2]],
        [[1, 0], [1, 1], [1, 2]],
        [[2, 0], [2, 1], [2, 2]],
        // Columns
        [[0, 0], [1, 0], [2, 0]],
        [[0, 1], [1, 1], [2, 1]],
        [[0, 2], [1, 2], [2, 2]],
        // Diagonals
        [[0, 0], [1, 1], [2, 2]],
        [[0, 2], [1, 1], [2, 0]],
    ];

    // Check for win conditions
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        const [x1, y1] = a;
        const [x2, y2] = b;
        const [x3, y3] = c;

        const firstCell = gameState[x1][y1];

        // Ensure the first cell is not empty and matches the other two
        if (firstCell && firstCell === gameState[x2][y2] && firstCell === gameState[x3][y3]) {
            return { status: 'win', winner: firstCell, winningSequence: [a, b, c] }; // Return the winning player and sequence
        }
    }

    // Check for draw (no empty cells)
    if (gameState.flat().every(cell => cell !== '')) {
        return { status: 'draw', winner: null, winningSequence: null };
    }

    // If no winner and the game is still ongoing
    return { status: 'ongoing' };
};

module.exports = {
    checkGameOver,
};
