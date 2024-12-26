import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const CSRFTokenContext = createContext();

export const useCSRFToken = () => useContext(CSRFTokenContext);

export const CSRFTokenProvider = ({ children }) => {
  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await axios.get('/backend/user/get_csrf_token/');
        setCsrfToken(response.data);
      } catch (error) {
        console.error('Failed to fetch CSRF token', error);
      }
    };

    fetchCsrfToken();
  }, []);

  return (
    <CSRFTokenContext.Provider value={csrfToken}>
      {children}
    </CSRFTokenContext.Provider>
  );
};
