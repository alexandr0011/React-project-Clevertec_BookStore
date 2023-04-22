import { createAsyncThunk,createSlice } from '@reduxjs/toolkit';

import { axiosApi } from '../../services/axios-api';

const initialState = {
  categories: [],
  loading: false,
  error: null,
};

export const getCategories = createAsyncThunk('categories/getCategories', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosApi.get('categories');

    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    closeCategoriesError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(getCategories.rejected, (state) => {
        state.error = true;
        state.loading = false;
      });
  },
});

export const { closeCategoriesError } = categoriesSlice.actions;
export const categoriesReducer = categoriesSlice.reducer;

