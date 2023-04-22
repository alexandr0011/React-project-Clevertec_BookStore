import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { REGISTER_URL } from '../../constants/constants';
import { axiosApi } from '../../services/axios-api';
import { getLocalStorageItem } from '../../utils/helpers';

const initialState = {
  user: {},
  isAutorization: !!getLocalStorageItem('jwtToken'),
  loading: false,
  error: null,
  isPasswordRecovery: false,
  isNewPasswordAdded: false,
};

export const getUser = createAsyncThunk('user/getUser', async (userData, { rejectWithValue }) => {
  try {
    let jwt;
    let user;

    if (userData?.url === REGISTER_URL) {
      const response = await axiosApi.post(`/auth/local/${REGISTER_URL}`, userData.userData);
      jwt = response.data.jwt;
      user = response.data.user;
    } else {
      const response = await axiosApi.post(`/auth/local`, userData);
      jwt = response.data.jwt;
      user = response.data.user;
      localStorage.setItem('jwtToken', jwt);
      localStorage.setItem('userName', user.firstName);
    }

    return user;
  } catch (error) {
    return rejectWithValue(error.request.status);
  }
});

export const passwordRecovery = createAsyncThunk('user/passwordRecovery', async (userEmail, { rejectWithValue }) => {
  try {
    const response = await axiosApi.post('auth/forgot-password/', userEmail);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.request.status);
  }
});

export const addNewUserPassword = createAsyncThunk(
  'user/addNewUserPassword',
  async (newPasswordData, { rejectWithValue }) => {
    try {
      const response = await axiosApi.post('auth/reset-password/', newPasswordData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.request.status);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    removeUser: (state) => {
      state.user = {};
      state.isAutorization = false;
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('userName');
    },
    closeError: (state) => {
      state.error = null;
    },
    changePasswordSucccess: (state) => {
      state.isNewPasswordAdded = false
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;

        if (localStorage.getItem('jwtToken')) {
          state.isAutorization = true;
        }
      })
      .addCase(getUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(passwordRecovery.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(passwordRecovery.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.isPasswordRecovery = true;
      })
      .addCase(passwordRecovery.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(addNewUserPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNewUserPassword.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.isNewPasswordAdded = true;
      })
      .addCase(addNewUserPassword.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { removeUser, closeError, changePasswordSucccess } = userSlice.actions;
export const userReducer = userSlice.reducer;
