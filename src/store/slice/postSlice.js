import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: {
    loading: false,
    postData: [],
    lastItemId: null,
    hasMore: true,
    modalVisibleValue: false,
  },
  reducers: {
    getPostRequest(state) {
      state.loading = true;
    },
    getPostSuccess(state, { payload }) {
      state.loading = false;
      if (!state.lastItemId) {
        state.postData = payload.posts;
      } else {
        state.postData = [...state.postData, ...payload.posts];
      }
      state.lastItemId = payload.posts[payload.posts.length - 1].id;
      state.hasMore = state.lastItemId !== payload.lastId;
    },
    getPostError(state) {
      state.loading = false;
    },
    modalOn(state) {
      state.modalVisibleValue = true;
    },
    modalOff(state) {
      state.modalVisibleValue = false;
    },
    createPostRequest(state) {
      state.loading = true;
    },
    createPostSuccess(state, { payload }) {
      state.loading = false;
      state.postData = [payload, ...state.postData];
    },
  },
});

export const postReducer = postSlice.reducer;
export const {
  getPostRequest,
  getPostSuccess,
  getPostError,
  modalOn,
  modalOff,
  createPostRequest,
  createPostSuccess,
} = postSlice.actions;
