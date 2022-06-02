import axios from "axios";
import { call, put, all, takeEvery, select } from "redux-saga/effects";
import {
  requestToken,
  setUserData,
  patchUpdateRequest,
  patchUpdateSuccess,
  patchUpdateError,
} from "../slice/userSlice";

const BASE_URL = process.env.REACT_APP_API_URL;

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
  } catch (error) {
    console.dir(error);
    yield put(patchUpdateError());
  }
}

export function* userSaga() {
  yield all([takeEvery(requestToken, accessTokenSaga)]);
  yield all([takeEvery(setUserData, setRefreshTokenSaga)]);
  yield all([takeEvery(patchUpdateRequest, patchUserSaga)]);
}
