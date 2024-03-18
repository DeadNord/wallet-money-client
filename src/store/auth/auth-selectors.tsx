import { RootState } from 'store/store';
import { User } from './AuthTypes';

// Selector to get the user's access token
/**
 * Retrieves the access token from the auth state.
 * @param {RootState} state - The entire state of the Redux store.
 * @returns {string} The access token.
 */
const getUserAccess = (state: RootState): string | null => state.auth.accessToken;

// Selector to get the user information
/**
 * Retrieves the user's information from the auth state.
 * @param {RootState} state - The entire state of the Redux store.
 * @returns {User} The user's information including id, name, and email.
 */
const getUserInfo = (state: RootState): User => state.auth.user;

// Selector to check if the user is logged in
/**
 * Checks whether the user is logged in by retrieving the isLoggedIn flag from the auth state.
 * @param {RootState} state - The entire state of the Redux store.
 * @returns {boolean} The user's logged-in status.
 */
const getIsLoggedIn = (state: RootState): boolean => state.auth.isLoggedIn;

export { getUserAccess, getUserInfo, getIsLoggedIn };
