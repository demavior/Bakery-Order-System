import { useState, useEffect } from 'react';
import axios from 'axios';

axios.defaults.withCredentials = true;

export const useCheckLogin = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState('');

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const response = await axios.get('/backend/user/is_logged_in/');
                setIsLoggedIn(response.data.is_logged_in);
                setUser(response.data.username);
                console.log('Login status:', response.data);
            } catch (error) {
                console.error('Error checking login status:', error);
            } finally {
                setIsLoading(false);
            }
        };

        checkLoginStatus();
    }, []);

    return { isLoggedIn, isLoading, user };
};
