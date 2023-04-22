import { createAsyncThunk,createSlice } from '@reduxjs/toolkit';

import {axiosApi} from '../../services/axios-api';

const initialState = {
  book: {
    images: [],
    categories: [],
    comments: [],
  },
  loading: false,
  error: null,
};

export const getBook = createAsyncThunk('book/getBook', async (bookId, { rejectWithValue }) => {
  try {
    const response = await axiosApi.get(`books/${bookId}`);
    console.log(JSON.stringify(response.data))
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    clearBook: (state) => {
      state.book = {
        images: [],
        categories: [],
        comments: [],
      }
    },
    closeBookError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBook.fulfilled, (state, action) => {
        state.loading = false;
        state.book = action.payload;
      })
      .addCase(getBook.rejected, (state) => {
        state.error = true;
        state.loading = false;
      });
  },
});

export const { closeBookError, clearBook } = bookSlice.actions;
export const bookReducer = bookSlice.reducer;
