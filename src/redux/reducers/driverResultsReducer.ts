// src/redux/reducers/driverResultsSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchDriverResults = createAsyncThunk(
  'driverResults/fetchDriverResults',
  async (driverId: string) => {
    const response = await axios.get(`https://ergast.com/api/f1/drivers/${driverId}/results.json?limit=1000`);
    console.log('LOG___', response.data.MRData.RaceTable.Races)
    return response.data.MRData.RaceTable.Races;
  }
);

const driverResultsSlice = createSlice({
  name: 'driverResults',
  initialState: {
    races: [],
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDriverResults.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDriverResults.fulfilled, (state, action) => {
        state.loading = false;
        state.races = action.payload;
      })
      .addCase(fetchDriverResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error loading races';
      });
  },
});

export default driverResultsSlice.reducer;