import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: {
    loading: false,
    createCommentLoading: null,
    patchPostLoading: null,
    createPostLoading: false,
    posts: { data: [], hasMore: true, lastItemId: null },
    myPosts: { data: [], hasMore: true, lastItemId: null },
    modalVisibleValue: false,
  },
  reducers: {
    getPostRequest(state) {
      state.loading = true;
    },
    getPostSuccess(state, { payload }) {
      state.loading = false;
      const target = state[payload.targetField];
      if (!target.lastItemId || state.modalVisibleValue) {
        target.data = payload.posts;
      } else {
        target.data = [...target.data, ...payload.posts];
      }
      target.lastItemId = payload.posts[payload.posts.length - 1].id;
      target.hasMore = target.lastItemId !== payload.lastId;
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
      state.createPostLoading = true;
    },
    createPostSuccess(state, { payload }) {
      state.createPostLoading = false;
      state.posts.data = [payload, ...state.posts.data];
    },
    createPostError(state) {
      state.createPostLoading = false;
    },
    createCommentRequest(state, { payload }) {
      state.createCommentLoading = payload.postId;
    },
    createCommentSuccess(state, { payload }) {
      state.createCommentLoading = null;
      const addComment = (data) => {
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
      };
      state.posts.data.forEach(addComment);
      state.myPosts.data.forEach(addComment);
    },
    createCommentError(state) {
      state.createCommentLoading = null;
    },
    getMyPostsRequest(state) {
      state.loading = true;
    },
    getMyPostsError(state) {
      state.loading = false;
    },
    patchPostRequest(state, { payload }) {
      state.patchPostLoading = payload.id;
    },
    patchPostSuccess(state, { payload }) {
      state.patchPostLoading = null;
      const changeInput = (data) => {
        if (data.id === payload.id) {
          data.desc = payload.inputValue;
        }
      };
      state.posts.data.forEach(changeInput);
      state.myPosts.data.forEach(changeInput);
    },
    patchPostError(state) {
      state.patchPostLoading = null;
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
  createPostError,
  createCommentRequest,
  createCommentSuccess,
  createCommentError,
  getMyPostsRequest,
  getMyPostsError,
  patchPostRequest,
  patchPostSuccess,
  patchPostError,
} = postSlice.actions;
