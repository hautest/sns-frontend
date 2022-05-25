import axios, { AxiosError } from "axios";
import { call, put, all, takeEvery, select } from "redux-saga/effects";
import { modalOff } from "../slice/postSlice";
import {
  signUpRequest,
  signUpSuccess,
  signUpError,
  loginRequest,
  loginError,
  requestToken,
  setUserData,
  patchUpdateRequest,
  patchUpdateSuccess,
  patchUpdateError,
} from "../slice/userSlice";

const BASE_URL = process.env.REACT_APP_API_URL;

function signUpApi(email: string, nickname: string, password: string) {
  return axios.post(`${BASE_URL}/users`, {
    email,
    nickname,
    password,
  });
}

function* postSignUpSaga({
  payload: { email, nickname, password },
}: ReturnType<typeof signUpRequest>) {
  try {
    yield call(signUpApi, email, nickname, password);
    yield put(signUpSuccess());
  } catch (error) {
    yield put(signUpError());
    if (error instanceof AxiosError) {
      alert(error.response?.data.message);
    } else {
      console.error(error);
    }
  }
}

function logInApi(email: string, password: string) {
  return axios.post(`${BASE_URL}/auth/login`, { email, password });
}

function* loginSaga({
  payload: { email, password },
}: ReturnType<typeof loginRequest>) {
  try {
    const { data } = yield call(logInApi, email, password);
    yield put(setUserData(data));
  } catch (error) {
    yield put(loginError());
    if (error instanceof AxiosError) {
      alert(error.response?.data.message);
    } else {
      console.error(error);
    }
  }
}

function accessTokenAPI(refreshToken: string) {
  return axios.post(`${BASE_URL}/auth/access-token`, { refreshToken });
}

function* accessTokenSaga({
  payload: pastRefreshToken,
}: ReturnType<typeof requestToken>) {
  try {
    const { data } = yield call(accessTokenAPI, pastRefreshToken);
    yield put(setUserData(data));
  } catch (error) {
    console.dir(error);
  }
}

function setRefreshTokenSaga({
  payload: { refreshToken },
}: ReturnType<typeof setUserData>) {
  localStorage.setItem("refreshToken", refreshToken);
}

function patchUserApi(email: string, nickname: string, token: string) {
  return axios.patch(
    `${BASE_URL}/users`,
    {
      email,
      nickname,
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );
}

function findEmail(email: string) {
  return axios.get(`${BASE_URL}/users/email`, {
    params: { email },
  });
}

function* patchUserSaga({
  payload: { email, nickname },
}: ReturnType<typeof patchUpdateRequest>) {
  try {
    const token: string = yield select(({ user }) => user.accessToken);
    const {
      data: { message, usable },
    } = yield call(findEmail, email);
    if (usable) {
      yield call(patchUserApi, email, nickname, token);
      yield put(patchUpdateSuccess({ email, nickname }));
    } else {
      alert(message);
    }

    yield put(modalOff());
  } catch (error) {
    console.dir(error);
    yield put(patchUpdateError());
  }
}

export function* userSaga() {
  yield all([takeEvery(signUpRequest, postSignUpSaga)]);
  yield all([takeEvery(loginRequest, loginSaga)]);
  yield all([takeEvery(requestToken, accessTokenSaga)]);
  yield all([takeEvery(setUserData, setRefreshTokenSaga)]);
  yield all([takeEvery(patchUpdateRequest, patchUserSaga)]);
}