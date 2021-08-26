import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  accessToken: null, // logged in user's current access token
  isAuthenticated: false, // boolean indicating if a user is logged in
  user: null, // object with auth user data
  authLoadingStatus: "PENDING", // status of async operation ['IDLE', 'PENDING', 'SUCCESS', 'FAIL']
};

const BASE_URL = "https://contaxapp.herokuapp.com/users";
const headers = {
  Accept: "application/json",
  "Access-Control-Allow-Origin": "contaxapp.heroku.com",
  "Content-Type": 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
};

axios.defaults.withCredentials = true;

export const login = createAsyncThunk(
  "auth/login",
  async (formData, { rejectWithValue }) => {
    const url = BASE_URL + "/login/";
    const response = axios
      .post(url, formData, {
        headers: headers,
      })
      .then((res) => res.data)
      .catch((err) => rejectWithValue(err.response.data));

    return response;
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (formData, { rejectWithValue }) => {
    const url = BASE_URL + "/";

    const response = await axios
      .post(url, formData, {
        headers: headers,
      })
      .then((res) => res.data)
      .catch((err) => rejectWithValue(err.response.data));

    return response;
  }
);

export const requestAccessToken = createAsyncThunk(
  "auth/requestAccessToken",
  async (_, { rejectWithValue }) => {
    const url = BASE_URL + "/token/";

    const response = await axios
      .get(
        url,
        {},
        {
          headers: headers,
        }
      )
      .then((res) => res.data)
      .catch((err) => rejectWithValue(err.response.data));

    return response;
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (user, { rejectWithValue }) => {
    const url = BASE_URL + "/logout/";
    const response = await axios
      .post(url, {
        headers: headers,
        data: { user },
      })
      .then((res) => res.data)
      .catch((err) => rejectWithValue(err.response.data));

    return response;
  }
);

const AuthSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setAccessToken(state, action) {
      return {
        accessToken: action.payload,
      };
    },
  },
  extraReducers: {
    [register.pending]: (state, action) => {
      state.authLoadingStatus = "PENDING";
    },
    [register.rejected]: (state, action) => {
      state.accessToken = null;
      state.isAuthenticated = false;
      state.user = null;
      state.authLoadingStatus = "IDLE";
    },
    [register.fulfilled]: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.authLoadingStatus = "IDLE";
    },

    [login.pending]: (state, action) => {
      state.authLoadingStatus = "PENDING";
    },
    [login.fulfilled]: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.authLoadingStatus = "IDLE";
    },
    [login.rejected]: (state, action) => {
      state.accessToken = null;
      state.isAuthenticated = false;
      state.user = null;
      state.authLoadingStatus = "IDLE";
    },

    [requestAccessToken.pending]: (state, action) => {
      state.authLoadingStatus = "PENDING";
    },
    [requestAccessToken.fulfilled]: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.authLoadingStatus = "IDLE";
    },
    [requestAccessToken.rejected]: (state, action) => {
      state.accessToken = null;
      state.isAuthenticated = false;
      state.user = null;
      state.authLoadingStatus = "IDLE";
    },

    [logout.pending]: (state, action) => {
      state.authLoadingStatus = "PENDING";
    },
    [logout.fulfilled]: (state, action) => {
      state.accessToken = null;
      state.isAuthenticated = false;
      state.user = null;
      state.authLoadingStatus = "IDLE";
    },
    [logout.rejected]: (state, action) => {
      state.accessToken = null;
      state.isAuthenticated = false;
      state.user = null;
      state.authLoadingStatus = "IDLE";
    },
  },
});

export const { setAccessToken, setErrors } = AuthSlice.actions;

export default AuthSlice.reducer;
