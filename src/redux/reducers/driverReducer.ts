import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { iDriver } from '../../types/Driver';

interface DriverState {
    drivers: iDriver[];
    loading: boolean;
    error: string | null;
  }
  
  const initialState: DriverState = {
    drivers: [],
    loading: false,
    error: null,
  };
  

export const fetchDrivers = createAsyncThunk('drivers/fetchDrivers', async () => {
    const yearPrimary = 2025;
    const yearFallback = 2024;
  
    // Запрос на 2025
    const response2025 = await axios.get(`https://ergast.com/api/f1/${yearPrimary}/drivers.json`);
    const drivers2025 = response2025.data?.MRData?.DriverTable?.Drivers;
  
    // Если пусто — fallback на 2024
    if (drivers2025 && drivers2025.length > 0) {
      return drivers2025;
    }
  
    const response2024 = await axios.get(`https://ergast.com/api/f1/${yearFallback}/drivers.json`);
    return response2024.data?.MRData?.DriverTable?.Drivers || [];
  });

const driverReducer = createSlice({
  name: 'drivers',
  initialState: {
    drivers: [],
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDrivers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDrivers.fulfilled, (state, action) => {
        state.loading = false;
        state.drivers = action.payload;
      })
      .addCase(fetchDrivers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error loading drivers';
      });
  },
});

export default driverReducer.reducer;