import { createAsyncThunk,createSlice } from '@reduxjs/toolkit';

import { axiosApi } from '../../services/axios-api';

const initialState = {
  books: [],
  loading: false,
  error: null,
  sortByRatingTop: true,
};

function getTopRating(a, b) {
  return a.rating < b.rating ? 1 : -1;
}
function getLowRating(a, b) {
  return a.rating > b.rating ? 1 : -1;
}

export const getBooks = createAsyncThunk('books/getBooks', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosApi.get('books');

    

    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    closeBooksError: (state) => {
      state.error = null;
    },
    ratingFilter: (state, action) => {
      state.sortByRatingTop = action.payload;
      state.books = state.books.sort((a, b) => (action.payload ? getTopRating(a, b) : getLowRating(a, b)));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBooks.fulfilled, (state, action) => {
        state.loading = false;
        if (state.sortByRatingTop) {
          state.books = action.payload.sort((a, b) => getTopRating(a, b));
        } else {
          state.books = action.payload.sort((a, b) => getLowRating(a, b));
        }
      })
      .addCase(getBooks.rejected, (state) => {
        state.error = true;
        state.loading = false;
      });
  },
});

export const { closeBooksError, ratingFilter } = booksSlice.actions;
export const booksReducer = booksSlice.reducer;
