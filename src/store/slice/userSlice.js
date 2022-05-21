import { createSlice, createAction } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    isSignUpSuccess: false,
    userData: null,
    accessToken: null,
  },
  reducers: {
    signUpRequest(state) {
      state.loading = true;
    },
    signUpSuccess(state) {
      state.loading = false;
      state.isSignUpSuccess = true;
    },
    signUpError(state) {
      state.loading = false;
    },
    resetSignUpSuccess(state) {
      state.isSignUpSuccess = false;
    },
    loginRequest(state) {
      state.loading = true;
    },
    setUserData(state, { payload }) {
      state.loading = false;
      state.userData = payload.user;
      state.accessToken = payload.accessToken;
    },
    loginError(state) {
      state.loading = false;
    },
    resetLoginSuccess(state) {
      state.userData = null;
      state.accessToken = null;
    },
    patchUpdateRequest(state) {
      state.loading = true;
    },
    patchUpdateSuccess(state) {
      state.loading = false;
    },
    patchUpdateError(state) {
      state.loading = false;
    },
  },
});

export const requestToken = createAction("resquestToken");

export const signUpReducer = userSlice.reducer;
export const {
  signUpRequest,
  signUpSuccess,
  signUpError,
  resetSignUpSuccess,
  loginRequest,
  setUserData,
  loginError,
  resetLoginSuccess,
  patchUpdateRequest,
  patchUpdateSuccess,
  patchUpdateError,
} = userSlice.actions;
