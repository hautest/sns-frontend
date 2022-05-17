import axios from "axios";
import {
  call,
  put,
  all,
  takeLatest,
  select,
  takeEvery,
} from "redux-saga/effects";

import {
  getPostRequest,
  getPostSuccess,
  getPostError,
  createPostRequest,
  createPostSuccess,
  modalOff,
  createCommentRequest,
  createCommentSuccess,
  createCommentError,
} from "../slice/postSlice";

const BASE_URL = process.env.REACT_APP_API_URL;

function getPostAPI(lastItemId) {
  return axios.get(`${BASE_URL}/posts`, { params: { take: 5, lastItemId } });
}

function* getPostSaga() {
  try {
    const lastItemId = yield select((state) => state.post.lastItemId);
    const {
      data: { posts, lastId },
    } = yield call(getPostAPI, lastItemId);
    console.log(posts);
    yield put(getPostSuccess({ posts, lastId }));
  } catch (error) {
    yield put(getPostError);
    console.log(error);
    alert(error.response.data.message);
  }
}

function postCreatePost(desc, title, token) {
  return axios.post(
    `${BASE_URL}/posts`,
    { desc, title },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
}

function* createPostsaga({ payload: { desc, title } }) {
  try {
    const token = yield select(({ user }) => user.accessToken);
    const { data } = yield call(postCreatePost, desc, title, token);
    yield put(createPostSuccess(data));
    alert("새 글 작성 완료");
    yield put(modalOff());
  } catch (error) {
    console.dir(error);
    alert("새 글 작성 실패");
  }
}

function postCommentAPI(postId, desc, token) {
  return axios.post(
    `${BASE_URL}/comments`,
    { postId, desc },
    { headers: { Authorization: `Bearer ${token}` } }
  );
}

function* createCommentsaga({ payload: { postId, desc } }) {
  try {
    const {
      userData: { nickname },
      accessToken,
    } = yield select(({ user }) => user);
    const { data } = yield call(postCommentAPI, postId, desc, accessToken);
    yield put(createCommentSuccess({ data, nickname }));
  } catch (error) {
    console.dir(error);
    yield put(createCommentError);
    alert("댓글 작성 실패");
  }
}

export function* postSaga() {
  yield all([takeLatest(getPostRequest, getPostSaga)]);
  yield all([takeEvery(createPostRequest, createPostsaga)]);
  yield all([takeEvery(createCommentRequest, createCommentsaga)]);
}
