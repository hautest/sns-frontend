import axios from "axios";
import { call, put, all, takeEvery } from "redux-saga/effects";
import { signUpRequest, signUpSuccess, signUpError } from "../slice/userSlice";

const BASE_URL = process.env.REACT_APP_API_URL;

function signUp(email, nickname, password) {
  return axios.post(`${BASE_URL}/users`, {
    email,
    nickname,
    password,
  });
}

function* postSignUpSaga({ payload: { email, nickname, password } }) {
  try {
    yield call(signUp, email, nickname, password);
    yield put(signUpSuccess());
  } catch (error) {
    yield put(signUpError(error.response.data.message));
    alert(error.response.data.message);
  }
}

export function* userSaga() {
  yield all([takeEvery(signUpRequest, postSignUpSaga)]);
}
