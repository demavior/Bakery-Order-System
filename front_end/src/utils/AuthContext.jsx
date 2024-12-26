import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

axios.defaults.withCredentials = true;
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [username, setUsername] = useState('');

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const response = await axios.get('/backend/user/is_logged_in/');
                setIsLoggedIn(response.data.is_logged_in);
                setUsername(response.data.username);
                console.log('Login status:', response.data);
            } catch (error) {
                console.error('Error checking login status:', error);
            } finally {
                setIsLoading(false);
            }
        };

        checkLoginStatus();
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, isLoading, username, setIsLoggedIn, setUsername }}>
            {children}
        </AuthContext.Provider>
    );
};