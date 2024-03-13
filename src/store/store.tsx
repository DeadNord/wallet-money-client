import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer, PersistConfig } from 'redux-persist';

import authReducer from './auth/auth-slice';

const authPersistConfig: PersistConfig<any, any, any, any> = {
  key: 'auth',
  storage,
  // whitelist: ['token'],
};

const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
    },
  }),
  devTools: process.env.NODE_ENV === 'development',
});

const persistor = persistStore(store);

export { store, persistor };
export type AppDispatch = typeof store.dispatch;
