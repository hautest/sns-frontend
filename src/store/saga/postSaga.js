import axios from "axios";
import { call, put, all, takeLatest, select } from "redux-saga/effects";

import {
  getPostRequest,
  getPostSuccess,
  getPostError,
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
    yield put(getPostSuccess({ posts, lastId }));
  } catch (error) {
    yield put(getPostError);
    console.log(error);
    alert(error.response.data.message);
  }
}

export function* postSaga() {
  yield all([takeLatest(getPostRequest, getPostSaga)]);
}
