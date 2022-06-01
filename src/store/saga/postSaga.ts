import axios, { AxiosError } from "axios";
import { call, put, all, takeLatest, select } from "redux-saga/effects";

import {
  patchPostRequest,
  patchPostSuccess,
  patchPostError,
} from "../slice/postSlice";

const BASE_URL = process.env.REACT_APP_API_URL;

function patchPostAPI(inputValue: string, token: string, id: string) {
  return axios.patch(
    `${BASE_URL}/posts/${id}`,
    { desc: inputValue },
    { headers: { Authorization: `Bearer ${token}` } }
  );
}

function* patchPostSaga({
  payload: { inputValue, id },
}: ReturnType<typeof patchPostRequest>) {
  try {
    const token: string = yield select(({ user }) => user.accessToken);
    yield call(patchPostAPI, inputValue, token, id);
    yield put(patchPostSuccess({ inputValue, id }));
  } catch (error) {
    yield put(patchPostError());
    console.log(error);
    if (error instanceof AxiosError) {
      alert(error.response?.data.message);
    }
  }
}

export function* postSaga() {
  yield all([takeLatest(patchPostRequest, patchPostSaga)]);
}
