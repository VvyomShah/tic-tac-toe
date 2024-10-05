import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import GamePage from './pages/GamePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserHomePage from './pages/UserHomePage';
import { AuthProvider, AuthContext } from './context/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected Routes */}
          <Route path="/userhome" element={<PrivateRoute element={<UserHomePage />} />} />
          <Route path="/game/:gameId" element={<PrivateRoute element={<GamePage />} />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

// PrivateRoute component to handle authentication and loading state
const PrivateRoute = ({ element }) => {
  const { auth, loading } = useContext(AuthContext);

  // Wait until the loading state is resolved
  if (loading) {
    return <div>Loading...</div>; // Display a loading message or spinner
  }

  // If user is authenticated, render the element, otherwise redirect to login
  return auth ? element : <Navigate to="/login" />;
};

export default App;
