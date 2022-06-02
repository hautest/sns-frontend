import axios from "axios";
import { call, put, all, takeEvery, select } from "redux-saga/effects";
import {
  patchUpdateRequest,
  patchUpdateSuccess,
  patchUpdateError,
} from "../slice/userSlice";

const BASE_URL = process.env.REACT_APP_API_URL;

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
  yield all([takeEvery(patchUpdateRequest, patchUserSaga)]);
}
