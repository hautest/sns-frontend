import axios, { AxiosError } from "axios";
import {
  call,
  put,
  all,
  takeLatest,
  select,
  takeEvery,
} from "redux-saga/effects";
import { GetComment } from "src/interface";

import {
  createCommentRequest,
  createCommentSuccess,
  createCommentError,
  patchPostRequest,
  patchPostSuccess,
  patchPostError,
} from "../slice/postSlice";

const BASE_URL = process.env.REACT_APP_API_URL;

function postCommentAPI(postId: string, desc: string, token: string) {
  return axios.post(
    `${BASE_URL}/comments`,
    { postId, desc },
    { headers: { Authorization: `Bearer ${token}` } }
  );
}

function* createCommentsaga({
  payload: { postId, desc },
}: ReturnType<typeof createCommentRequest>) {
  try {
    const {
      userData: { nickname },
      accessToken,
    } = yield select(({ user }) => user);

    const { data }: { data: GetComment } = yield call(
      postCommentAPI,
      postId,
      desc,
      accessToken
    );
    yield put(createCommentSuccess({ data, nickname }));
  } catch (error) {
    console.dir(error);
    yield put(createCommentError());
    alert("댓글 작성 실패");
  }
}

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
  yield all([takeEvery(createCommentRequest, createCommentsaga)]);
  yield all([takeLatest(patchPostRequest, patchPostSaga)]);
}
