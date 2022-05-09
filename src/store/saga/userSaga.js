import axios from "axios";
import { call, put, all, takeEvery } from "redux-saga/effects";
import {
  signUpRequest,
  signUpSuccess,
  signUpError,
  loginRequest,
  loginError,
  requestToken,
  setUserData,
} from "../slice/userSlice";

const BASE_URL = process.env.REACT_APP_API_URL;

function signUpApi(email, nickname, password) {
  return axios.post(`${BASE_URL}/users`, {
    email,
    nickname,
    password,
  });
}

function* postSignUpSaga({ payload: { email, nickname, password } }) {
  try {
    yield call(signUpApi, email, nickname, password);
    yield put(signUpSuccess());
  } catch (error) {
    yield put(signUpError());
    alert(error.response.data.message);
  }
}

function logInApi(email, password) {
  return axios.post(`${BASE_URL}/auth/login`, { email, password });
}

function* loginSaga({ payload: { email, password } }) {
  try {
    const { data } = yield call(logInApi, email, password);
    yield put(setUserData(data));
  } catch (error) {
    yield put(loginError());
    alert(error.response.data.message);
  }
}

function accessTokenAPI(refreshToken) {
  return axios.post(`${BASE_URL}/auth/access-token`, { refreshToken });
}

function* accessTokenSaga({ payload: pastRefreshToken }) {
  try {
    const { data } = yield call(accessTokenAPI, pastRefreshToken);
    yield put(setUserData(data));
  } catch (error) {
    console.dir(error);
  }
}

function setRefreshTokenSaga({ payload: { refreshToken } }) {
  localStorage.setItem("refreshToken", refreshToken);
}

export function* userSaga() {
  yield all([takeEvery(signUpRequest, postSignUpSaga)]);
  yield all([takeEvery(loginRequest, loginSaga)]);
  yield all([takeEvery(requestToken, accessTokenSaga)]);
  yield all([takeEvery(setUserData, setRefreshTokenSaga)]);
}
