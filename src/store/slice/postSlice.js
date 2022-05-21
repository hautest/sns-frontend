import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: {
    loading: false,
    mypostLoading: false,
    postData: [],
    myPostsData: [],
    lastItemId: null,
    myPostsLastItemId: null,
    hasMore: true,
    myPostsHasMore: true,
    modalVisibleValue: false,
  },
  reducers: {
    getPostRequest(state) {
      state.loading = true;
    },
    getPostSuccess(state, { payload }) {
      state.loading = false;
      if (!state.lastItemId || state.modalVisibleValue) {
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
    createCommentRequest(state) {
      state.loading = true;
    },
    createCommentSuccess(state, { payload }) {
      state.loading = false;
      state.postData.forEach((data) => {
        if (data.id === payload.data.postId) {
          data.comments = [
            ...data.comments,
            {
              id: payload.data.id,
              desc: payload.data.desc,
              commenter: {
                id: payload.data.commenterId,
                nickname: payload.nickname,
              },
            },
          ];
        }
      });
      state.myPostsData.forEach((data) => {
        if (data.id === payload.data.postId) {
          data.comments = [
            ...data.comments,
            {
              id: payload.data.id,
              desc: payload.data.desc,
              commenter: {
                id: payload.data.commenterId,
                nickname: payload.nickname,
              },
            },
          ];
        }
      });
    },
    createCommentError(state) {
      state.loading = false;
    },
    getMyPostsRequest(state) {
      state.loading = true;
    },
    getMyPostsSuccess(state, { payload }) {
      state.loading = false;
      if (!state.myPostsLastItemId) {
        state.myPostsData = payload.posts;
      } else {
        state.myPostsData = [...state.myPostsData, ...payload.posts];
      }
      state.myPostsLastItemId = payload.posts[payload.posts.length - 1].id;
      state.hasMore = state.myPostsLastItemId !== payload.lastId;
    },
    getMyPostsError(state) {
      state.loading = false;
    },
    patchPostRequest(state) {
      state.loading = true;
    },
    patchPostSuccess(state, { payload }) {
      state.loading = false;
      state.postData.forEach((data) => {
        if (data.id === payload.id) {
          data.desc = payload.inputValue;
        }
      });
    },
    patchPostError(state) {
      state.loading = false;
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
  createCommentRequest,
  createCommentSuccess,
  createCommentError,
  getMyPostsRequest,
  getMyPostsSuccess,
  getMyPostsError,
  patchPostRequest,
  patchPostSuccess,
  patchPostError,
} = postSlice.actions;
