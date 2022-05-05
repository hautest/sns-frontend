import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    isSignUpSuccess: false,
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
  },
});

export const signUpReducer = userSlice.reducer;
export const { signUpRequest, signUpSuccess, signUpError, resetSignUpSuccess } =
  userSlice.actions;
