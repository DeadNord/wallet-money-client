// src/store/store.ts
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

// Import reducers and state types
import authReducer from './auth/auth-slice';
import financesReducer from './finances/finances-slice';
import { AuthState } from './auth/AuthTypes';
import { FinancesState } from './finances/FinancesTypes';

// Define the root state based on the reducers
export interface RootState {
  auth: AuthState;
  finances: FinancesState;
}

// Setup the persist config for each reducer that needs to be persisted
const authPersistConfig = {
  key: 'auth',
  storage,
};

const financesPersistConfig = {
  key: 'finances',
  storage,
};

const middleware = {
  serializableCheck: {
    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  },
};

// Use Redux's combineReducer to bring them together under one top-level state
const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  finances: persistReducer(financesPersistConfig, financesReducer),
});

// Create the store with reducers and middleware to handle serializable checks correctly
const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware(middleware),
  devTools: process.env.NODE_ENV !== 'production', // Enable Redux dev tools only in development
});

const persistor = persistStore(store);

export { store, persistor };
export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;
