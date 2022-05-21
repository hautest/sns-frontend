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
  getMyPostsRequest,
  getMyPostsSuccess,
  getMyPostsError,
  patchPostRequest,
  patchPostSuccess,
  patchPostError,
} from "../slice/postSlice";

const BASE_URL = process.env.REACT_APP_API_URL;

function getPostAPI(lastItemId) {
  return axios.get(`${BASE_URL}/posts`, {
    params: { take: 5, lastItemId },
  });
}

function* getPostSaga() {
  try {
    const lastItemId = yield select(({ post }) => post.lastItemId);
    const token = yield select(({ user }) => user.accessToken);
    const {
      data: { posts, lastId },
    } = yield call(getPostAPI, lastItemId, token);
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

function getMyPostsAPI(myPostsLastItemId, token) {
  return axios.get(`${BASE_URL}/posts/my`, {
    params: { take: 5, lastItemId: myPostsLastItemId },
    headers: { Authorization: `Bearer ${token}` },
  });
}

function* getMyPostSaga() {
  try {
    const myPostsLastItemId = yield select(
      ({ post }) => post.myPostsLastItemId
    );
    const token = yield select(({ user }) => user.accessToken);
    const {
      data: { posts, lastId },
    } = yield call(getMyPostsAPI, myPostsLastItemId, token);
    yield put(getMyPostsSuccess({ posts, lastId }));
  } catch (error) {
    yield put(getMyPostsError());
    console.log(error);
    alert(error.response.data.message);
  }
}

function patchPostAPI(inputValue, token, id) {
  return axios.patch(
    `${BASE_URL}/posts/${id}`,
    { desc: inputValue },
    { headers: { Authorization: `Bearer ${token}` } }
  );
}

function* patchPostSaga({ payload: { inputValue, id } }) {
  try {
    const token = yield select(({ user }) => user.accessToken);
    yield call(patchPostAPI, inputValue, token, id);
    yield put(patchPostSuccess({ inputValue, id }));
  } catch (error) {
    yield put(patchPostError());
    console.log(error);
    alert(error.response.data.message);
  }
}

export function* postSaga() {
  yield all([takeLatest(getPostRequest, getPostSaga)]);
  yield all([takeEvery(createPostRequest, createPostsaga)]);
  yield all([takeEvery(createCommentRequest, createCommentsaga)]);
  yield all([takeLatest(getMyPostsRequest, getMyPostSaga)]);
  yield all([takeLatest(patchPostRequest, patchPostSaga)]);
}
