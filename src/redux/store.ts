// src/redux/store.ts
// import { configureStore } from '@reduxjs/toolkit';
// import driverReducer from './reducers/driverReducer';
// import driverResultsReducer from './reducers/driverResultsReducer';

// export const store = configureStore({
//   reducer: {
//     driver: driverReducer,
//     driverResults: driverResultsReducer,
//   },
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import driverReducer from './reducers/driverReducer';
import driverResultsReducer from './reducers/driverResultsReducer';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['drivers'], // какие редьюсеры сохранять
};

const rootReducer = combineReducers({
  drivers: driverReducer,
  driverResults: driverResultsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;