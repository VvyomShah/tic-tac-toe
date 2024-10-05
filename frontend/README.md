# Frontend Documentation

## Table of Contents
1. Components
    - AuthContext
    - GameHistoryTable
    - Login
    - Register
    - NewGameButton
    - RecordsTable
2. Services
    - authService
    - gameService
    - gamesService
    - recordService
3. Pages
    - LoginPage
    - RegisterPage
    - GamePage
    - HomePage
    - UserHomePage

---

### 1. Components

#### **AuthContext**
- **Purpose**: Manages user authentication state and provides it across components.
- **Functions**:
  - `auth`: Contains the current user's authentication token and related details.
  - `setAuth`: Updates the authentication state when a user logs in or logs out.
- **Usage**: Wraps the application to make authentication details accessible throughout.

#### **GameHistoryTable**
- **Purpose**: Displays a user's game history in a table format.
- **Props**: None
- **State**:
  - `games`: List of games fetched from the backend.
- **Functions**:
  - `handleGameAction(gameId)`: Navigates to the selected game (either to view or continue).
- **APIs Used**: Calls `gamesService.fetchGameHistory()` to retrieve game history.
- **Hooks**: `useEffect` to fetch game data on component load, `useContext(AuthContext)` to retrieve the user authentication token.

#### **Login**
- **Purpose**: Provides a login form to authenticate users.
- **State**:
  - `username`: Stores the entered username.
  - `password`: Stores the entered password.
  - `error`: Displays any login error messages.
- **Functions**:
  - `handleSubmit`: Sends the login request to `authService.login`.
- **APIs Used**: `authService.login()`
  
#### **Register**
- **Purpose**: Renders a registration form for creating new user accounts.
- **State**:
  - `username`: Stores the entered username.
  - `password`: Stores the entered password.
  - `error`: Displays any registration error messages.
- **Functions**:
  - `handleSubmit`: Sends the registration request to `authService.register`.
- **APIs Used**: `authService.register()`

#### **NewGameButton**
- **Purpose**: A button that starts a new game for the user.
- **Functions**:
  - `handleNewGame()`: Navigates to the new game route (`/game`) and initiates game creation by calling `gameService.createGame()`.
- **Usage**: Placed in the user home page for easy access to new games.

#### **RecordsTable**
- **Purpose**: Displays the user's game statistics (wins, losses, draws, win streak, etc.).
- **Props**: None
- **State**:
  - `records`: Stores the fetched user records.
- **APIs Used**: Calls `recordService.fetchRecords()` to retrieve game statistics.
- **Hooks**: `useEffect` for fetching records on component load.

---

### 2. Services

#### **authService**
- **Purpose**: Handles user authentication logic.
- **Functions**:
  - `login(username, password)`: Sends login request, returns a token if successful.
  - `register(username, password)`: Sends registration request, creates a new user.
  - `logout()`: Clears the user token and logs the user out.

#### **gameService**
- **Purpose**: Handles game-related backend requests.
- **Functions**:
  - `createGame(authToken)`: Creates a new game for the user.
  - `makeMove(gameId, position, authToken)`: Submits a move in an existing game.
  - `getGameState(gameId, authToken)`: Retrieves the current state of the game.

#### **gamesService**
- **Purpose**: Fetches the user's game history from the backend.
- **Functions**:
  - `fetchGameHistory(authToken)`: Fetches all games played by the user.

#### **recordService**
- **Purpose**: Retrieves and updates user records.
- **Functions**:
  - `fetchRecords(authToken)`: Fetches the user's current records (total games, wins, losses, etc.).

---

### 3. Pages

#### **LoginPage**
- **Purpose**: Renders the login form and handles user authentication.
- **Components Used**: `Login`
- **APIs Used**: `authService.login()`
  
#### **RegisterPage**
- **Purpose**: Renders the registration form for new users.
- **Components Used**: `Register`
- **APIs Used**: `authService.register()`

#### **GamePage**
- **Purpose**: Displays the game board and handles gameplay logic.
- **Components Used**: Game board, move buttons, status display.
- **State**:
  - `gameState`: The current state of the game.
- **Functions**:
  - `handlePlayerMove(position)`: Sends player move to the backend using `gameService.makeMove`.
  - `fetchGameState()`: Retrieves the current game state using `gameService.getGameState`.

#### **HomePage**
- **Purpose**: A landing page after login.
- **Components Used**: Welcome message, `NewGameButton`.
  
#### **UserHomePage**
- **Purpose**: Authenticated user's homepage showing their game history and records.
- **Components Used**: `GameHistoryTable`, `RecordsTable`, `NewGameButton`.
- **APIs Used**: Calls to `gamesService.fetchGameHistory()` and `recordService.fetchRecords()`.

---