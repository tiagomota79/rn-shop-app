import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_KEY, API_SIGNUP_URL, API_LOGIN_URL } from '@env';

const APISignupURL = `${API_SIGNUP_URL}${API_KEY}`;

const APILoginURL = `${API_LOGIN_URL}${API_KEY}`;

const initialState = {
  idToken: null,
  email: null,
  refreshToken: null,
  expiresIn: null,
  localId: null,
  registered: null,
};

export const signup = createAsyncThunk(
  'post/signup',
  async (params, { dispatch }) => {
    const candidateCredentials = {
      email: params.email,
      password: params.password,
      returnSecureToken: true,
    };

    try {
      const response = await axios.post(APISignupURL, candidateCredentials);

      if (response.status === 200) {
        dispatch(signupAction(response.data));
      }
    } catch (error) {
      const errorText = error.response.data;
      console.error(errorText);
      throw error;
    }
  }
);

export const login = createAsyncThunk(
  'post/signup',
  async (params, { dispatch }) => {
    const candidateCredentials = {
      email: params.email,
      password: params.password,
      returnSecureToken: true,
    };

    try {
      const response = await axios.post(APILoginURL, candidateCredentials);

      if (response.status === 200) {
        dispatch(signupAction(response.data));
      }
    } catch (error) {
      const errorText = error.response.data;
      console.error(errorText);
      throw error;
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signupAction: (state, action) => {
      const { idToken, email, refreshToken, expiresIn, localId } =
        action.payload;

      return {
        idToken,
        email,
        refreshToken,
        expiresIn,
        localId,
      };
    },
    loginAction: (_, action) => {
      const { idToken, email, refreshToken, expiresIn, localId, registered } =
        action.payload;

      return {
        idToken,
        email,
        refreshToken,
        expiresIn,
        localId,
        registered,
      };
    },
  },
});

export const { signupAction, loginAction } = authSlice.actions;

export const selectAuthState = (state) => state.auth;

export default authSlice.reducer;
