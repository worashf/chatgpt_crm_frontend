import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCustomers } from './customerAPI';

export const getCustomersThunk = createAsyncThunk('customers/getCustomers', async () => {
  const response = await getCustomers();
  return response;
});

const customerSlice = createSlice({
  name: 'customers',
  initialState: {
    customers: [],
  },
  reducers: {
  },
  extraReducers: {
    [getCustomersThunk .pending]: (state) => ({
      ...state,
      status: 'pending',
    }),
    [getCustomersThunk .fulfilled]: (state, action) => ({
      ...state,
      status: 'success',
      customers: action.payload,
    }),
    [getCustomersThunk .rejected]: (state) => ({
      ...state,
      status: 'failed',
    }),
  },
});

export default customerSlice.reducer;