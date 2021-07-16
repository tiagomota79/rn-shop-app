import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_KEY, API_SIGNUP_URL, API_LOGIN_URL } from '@env';
import errors from '../constants/errors';

const APISignupURL = `${API_SIGNUP_URL}${API_KEY}`;

const APILoginURL = `${API_LOGIN_URL}${API_KEY}`;

const initialState = {
  idToken: null,
  email: null,
  refreshToken: null,
  expiresIn: null,
  localId: null,
  registered: null,
  displayName: null,
  error: null,
  signupOK: null,
  loginOK: null,
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
      const errorData = error.response.data;
      const errorMessage = errorData.error.message;
      dispatch(errorAction(errorMessage));
    }
  }
);

export const login = createAsyncThunk(
  'post/login',
  async (params, { dispatch }) => {
    const candidateCredentials = {
      email: params.email,
      password: params.password,
      returnSecureToken: true,
    };

    try {
      const response = await axios.post(APILoginURL, candidateCredentials);

      if (response.status === 200) {
        dispatch(loginAction(response.data));
      }
    } catch (error) {
      const errorData = error.response.data;
      let errorMessage = errorData.error.message;
      if (
        errorMessage === errors.invalidPassword ||
        errorMessage === errors.emailNotFound
      ) {
        errorMessage = errors.unauthorized;
      }
      dispatch(errorAction(errorMessage));
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
        ...state,
        idToken,
        email,
        refreshToken,
        expiresIn,
        localId,
        signupOK: true,
      };
    },
    loginAction: (state, action) => {
      const {
        idToken,
        email,
        refreshToken,
        expiresIn,
        localId,
        registered,
        displayName,
      } = action.payload;

      return {
        ...state,
        idToken,
        email,
        refreshToken,
        expiresIn,
        localId,
        registered,
        displayName,
        loginOK: true,
      };
    },
    errorAction: (state, action) => {
      return {
        ...state,
        error: action.payload,
      };
    },
  },
});

export const { signupAction, loginAction, errorAction } = authSlice.actions;

export const selectAuthState = (state) => state.auth;

export default authSlice.reducer;
