import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedToken = localStorage.getItem('authToken');
        if (savedToken) {
            setAuth(savedToken);
        }
        setLoading(false); // Set loading to false after token check
    }, []);

    const login = (token) => {
        setAuth(token);
        localStorage.setItem('authToken', token);
    };

    const logout = () => {
        setAuth(null);
        localStorage.removeItem('authToken');
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
