# Project Title

## Project Description
This is a full-stack web application consisting of a **Node.js backend** and a **React frontend**. The backend handles authentication, game management, and user records, while the frontend provides a user-friendly interface for interacting with these features.

## Setup Instructions

### 1. Database Setup

1. Ensure you have MySQL (or another SQL database) installed.
2. Create the necessary database schema and tables by running the SQL script provided:
    ```bash
    /database/setup.sql
    ```
3. Configure the database connection by updating the environment variables in the backend `.env` file.

### 2. Backend Setup

1. Navigate to the `backend` directory:
    ```bash
    cd backend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the `backend/` directory and configure your environment variables:
    ```
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=your_password
    DB_NAME=your_db_name
    JWT_SECRET=your_jwt_secret
    PORT=3000
    ```

4. Start the backend server:
    ```bash
    npm start
    ```

    The backend will run on `http://localhost:5000`.

### 3. Frontend Setup

1. Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

4. Start the frontend development server:
    ```bash
    npm start
    ```