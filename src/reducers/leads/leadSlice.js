import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getLeads } from './leadAPI';

export const getLeadsThunk = createAsyncThunk('Leads/getLeads', async () => {
  const response = await getLeads()
  return response;
});

const leadSlice = createSlice({
  name: 'leads',
  initialState: {
    leads: [],
  },
  reducers: {
  },
  extraReducers: {
    [getLeadsThunk  .pending]: (state) => ({
      ...state,
      status: 'pending',
    }),
    [getLeadsThunk  .fulfilled]: (state, action) => ({
      ...state,
      status: 'success',
      leads: action.payload,
    }),
    [getLeadsThunk  .rejected]: (state) => ({
      ...state,
      status: 'failed',
    }),
  },
});

export default leadSlice.reducer;