import axios, { AxiosError } from "axios";
import {
  call,
  put,
  all,
  takeLatest,
  select,
  takeEvery,
} from "redux-saga/effects";
import { GetComment, PostItem } from "src/interface";

import {
  getPostRequest,
  getPostSuccess,
  getPostError,
  createPostRequest,
  createPostSuccess,
  createPostError,
  modalOff,
  createCommentRequest,
  createCommentSuccess,
  createCommentError,
  getMyPostsRequest,
  getMyPostsError,
  patchPostRequest,
  patchPostSuccess,
  patchPostError,
} from "../slice/postSlice";

const BASE_URL = process.env.REACT_APP_API_URL;

function getPostAPI(lastItemId: string) {
  return axios.get(`${BASE_URL}/posts`, {
    params: { take: 5, lastItemId },
  });
}

function* getPostSaga() {
  try {
    const lastItemId: string = yield select(
      ({ post }) => post.posts.lastItemId
    );
    const {
      data: { posts, lastId },
    } = yield call(getPostAPI, lastItemId);
    console.log(posts, lastId);
    yield put(getPostSuccess({ posts, lastId, targetField: "posts" }));
  } catch (error) {
    yield put(getPostError);
    console.log(error);
    if (error instanceof AxiosError) {
      alert(error.response?.data.message);
    }
  }
}

function postCreatePost(desc: string, title: string, token: string) {
  return axios.post(
    `${BASE_URL}/posts`,
    { desc, title },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
}

function* createPostsaga({
  payload: { desc, title },
}: ReturnType<typeof createPostRequest>) {
  try {
    const token: string = yield select(({ user }) => user.accessToken);
    const { data }: { data: PostItem } = yield call(
      postCreatePost,
      desc,
      title,
      token
    );
    yield put(createPostSuccess(data));
    alert("새 글 작성 완료");
    yield put(modalOff());
  } catch (error) {
    console.dir(error);
    yield put(createPostError());
    alert("새 글 작성 실패");
  }
}

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

function getMyPostsAPI(myPostsLastItemId: string, token: string) {
  return axios.get(`${BASE_URL}/posts/my`, {
    params: { take: 5, lastItemId: myPostsLastItemId },
    headers: { Authorization: `Bearer ${token}` },
  });
}

function* getMyPostSaga() {
  try {
    const myPostsLastItemId: string = yield select(
      ({ post }) => post.myPosts.lastItemId
    );
    const token: string = yield select(({ user }) => user.accessToken);
    const {
      data: { posts, lastId },
    }: { data: { posts: PostItem[]; lastId: string } } = yield call(
      getMyPostsAPI,
      myPostsLastItemId,
      token
    );
    yield put(getPostSuccess({ posts, lastId, targetField: "myPosts" }));
  } catch (error) {
    yield put(getMyPostsError());
    console.log(error);
    alert("게시물이 없습니다.");
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
  yield all([takeLatest(getPostRequest, getPostSaga)]);
  yield all([takeEvery(createPostRequest, createPostsaga)]);
  yield all([takeEvery(createCommentRequest, createCommentsaga)]);
  yield all([takeLatest(getMyPostsRequest, getMyPostSaga)]);
  yield all([takeLatest(patchPostRequest, patchPostSaga)]);
}
