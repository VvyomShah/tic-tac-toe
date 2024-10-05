
# API Documentation

## Base URL
```
http://localhost/
```

## Authentication

### Login User
- **Method:** `POST`
- **Endpoint:** `/auth/login`
- **Description:** Authenticates a user and returns a JWT token.
- **Request Body:**
  ```json
  {
      "username": "string",
      "password": "string"
  }
  ```
- **Response:**
  - **200 OK**
    ```json
    {
        "token": "string"
    }
    ```
  - **401 Unauthorized**
    ```json
    {
        "error": "Invalid username or password"
    }
    ```

### Register a New User
- **Method:** `POST`
- **Endpoint:** `/users/register`
- **Description:** Registers a new user.
- **Request Body:**
  ```json
  {
      "username": "string",
      "password": "string"
  }
  ```
- **Response:**
  - **201 Created**
    ```json
    {
        "userId": "integer"
    }
    ```
  - **400 Bad Request**
    ```json
    {
        "error": "Username already taken"
    }
    ```
## Game

### Create a New Game
- **Method:** `GET`
- **Endpoint:** `/game/start`
- **Description:** Creates a new game.
- **Request Body:**
  ```
- **Response:**
  - **201 Created**
    ```json
    {
        "gameId": "integer"
    }
    ```

### Get Game by ID
- **Method:** `GET`
- **Endpoint:** `/game/:id`
- **Description:** Retrieves game information by game ID.
- **Parameters:**
  - `id` (path): Game ID (integer)
- **Response:**
  - **200 OK**
    ```json
    {
        "gameState": "[[string]]",
        "isComplete": "boolean",
        "winner": "string", // or null
        "winning_position": "[[string]]"
    }
    ```
  - **404 Not Found**
    ```json
    {
        "error": "Game not found"
    }
    ```

### Make a Move in the Game
- **Method:** `POST`
- **Endpoint:** `/game/move`
- **Description:** Makes a move in the game.
- **Parameters:**
  - `id` (path): Game ID (integer)
- **Request Body:**
  ```json
  {
      "gameId": "integer,"
      "position": "string", // e.g. "0,1"
  }
  ```
- **Response:**
  - **200 OK**
    ```json
    {
        "gameState": "[[string]]",
        "isGameCompleted": "boolean",
        "winner": "string", // or null
        "winning_position": "[[string]]"

    }
    ```
  - **400 Bad Request**
    ```json
    {
        "error": "Invalid move, cell already occupied"
    }
    ```
  - **404 Not Found**
    ```json
    {
        "error": "Game not found"
    }
    ```

## Moves

### Get Move History for a Game (To be completed)
- **Method:** `GET`
- **Endpoint:** `/moves`
- **Description:** Retrieves the move history for a specific game.
- **Parameters:**
  - `id` (path): Game ID (integer)
- **Response:**
  - **200 OK**
    ```json
    [
        {
            "moveNumber": "integer",
            "player": "string", // e.g. "X" or "O"
            "position": "string" // e.g. "0,1"
        },
        // more moves
    ]
    ```
  - **404 Not Found**
    ```json
    {
        "error": "Game not found"
    }
    ```

## Records

### Get All Records
- **Method:** `GET`
- **Endpoint:** `/records`
- **Description:** Retrieves all records.
- **Response:**
  - **200 OK**
    ```json
    [
        {
            "userId": "integer",
            "totalGames": "integer",
            "totalWins": "integer",
            "totalLosses": "integer",
            "totalDraws": "integer",
            "bestStreak": "integer"
        },
        // more records
    ]
    ```
## Games

### Get All Games By User
### Get All Records
- **Method:** `GET`
- **Endpoint:** `/records`
- **Description:** Retrieves all records.
- **Response:**
  - **200 OK**
    ```json
    [
        {
            "GameStates": "gameState info" //Fill in
        },
    ]
    ```
## Games

## Error Handling
All responses include appropriate HTTP status codes and error messages when applicable. 

## Notes
- Ensure to handle authentication for protected routes (e.g., `/games`, `/records`) using the JWT token in the Authorization header:
  ```
  Authorization: Bearer <token>
  ```