import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { getUserAccess } from 'store/auth/auth-selectors';

// Custom hook to set up database (Axios) configuration
export const useDBConfig = () => {
  const token = useSelector(getUserAccess); // Retrieve user's access token from Redux store

  useEffect(() => {
    // Set up Axios defaults only if the token exists
    if (token) {
      axios.defaults.baseURL = process.env.REACT_APP_API_URL; // Set the base URL for all Axios requests
      axios.defaults.headers.common.Authorization = `Bearer ${token}`; // Set the Authorization header for all Axios requests
    }
  }, [token]); // This effect depends on the token and runs whenever the token changes
};
