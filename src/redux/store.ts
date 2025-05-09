// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import driverReducer from './reducers/driverReducer';
import driverResultsReducer from './reducers/driverResultsReducer';

export const store = configureStore({
  reducer: {
    driver: driverReducer,
    driverResults: driverResultsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;