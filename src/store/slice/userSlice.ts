import { createSlice, createAction, PayloadAction } from "@reduxjs/toolkit";

import { User } from "src/interface";

interface InitialState {
  loading: boolean;
  isSignUpSuccess: boolean;
  userData: null | User;
  accessToken: null | string;
}

interface CommonUserRequestParams {
  email: string;
  password: string;
  nickname: string;
}

const initialState: InitialState = {
  loading: false,
  isSignUpSuccess: false,
  userData: null,
  accessToken: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData(
      state,
      {
        payload,
      }: PayloadAction<{
        user: User;
        accessToken: string;
        refreshToken: string;
      }>
    ) {
      state.loading = false;
      state.userData = payload.user;
      state.accessToken = payload.accessToken;
    },
    resetLoginSuccess(state) {
      state.userData = null;
      state.accessToken = null;
    },
    patchUpdateRequest: {
      reducer: (state) => {
        state.loading = true;
      },
      prepare: (payload: Omit<CommonUserRequestParams, "password">) => ({
        payload,
      }),
    },
    patchUpdateSuccess(
      state,
      { payload }: PayloadAction<Omit<CommonUserRequestParams, "password">>
    ) {
      state.loading = false;
      if (state.userData) {
        state.userData.email = payload.email;
        state.userData.nickname = payload.nickname;
      }
    },
    patchUpdateError(state) {
      state.loading = false;
    },
  },
});

export const requestToken = createAction<string>("resquestToken");

export const signUpReducer = userSlice.reducer;
export const {
  setUserData,
  resetLoginSuccess,
  patchUpdateRequest,
  patchUpdateSuccess,
  patchUpdateError,
} = userSlice.actions;
