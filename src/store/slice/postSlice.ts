import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PostItem, GetComment } from "src/interface";

interface initialStateInterface {
  loading: boolean;
  createCommentLoading: null | string;
  patchPostLoading: null | string;
  createPostLoading: boolean;
  posts: { data: PostItem[]; hasMore: boolean; lastItemId: null | string };
  myPosts: { data: PostItem[]; hasMore: boolean; lastItemId: null | string };
  modalVisibleValue: boolean;
}

const initialState: initialStateInterface = {
  loading: false,
  createCommentLoading: null,
  patchPostLoading: null,
  createPostLoading: false,
  posts: { data: [], hasMore: true, lastItemId: null },
  myPosts: { data: [], hasMore: true, lastItemId: null },
  modalVisibleValue: false,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    getPostRequest(state) {
      state.loading = true;
    },
    getPostSuccess(
      state,
      {
        payload,
      }: PayloadAction<{
        posts: PostItem[];
        lastId: string;
        targetField: "posts" | "myPosts";
      }>
    ) {
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
    createPostRequest: {
      reducer: (state) => {
        state.createPostLoading = true;
      },
      prepare: (payload: { desc: string; title: string }) => ({
        payload,
      }),
    },
    createPostSuccess(state, { payload }: PayloadAction<PostItem>) {
      state.createPostLoading = false;
      state.posts.data = [payload, ...state.posts.data];
    },
    createPostError(state) {
      state.createPostLoading = false;
    },
    createCommentRequest(
      state,
      { payload }: PayloadAction<{ postId: string; desc: string }>
    ) {
      state.createCommentLoading = payload.postId;
    },
    createCommentSuccess(
      state,
      { payload }: PayloadAction<{ data: GetComment; nickname: string }>
    ) {
      state.createCommentLoading = null;
      const addComment = (data: PostItem) => {
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
    patchPostRequest(
      state,
      { payload }: PayloadAction<{ inputValue: string; id: string }>
    ) {
      state.patchPostLoading = payload.id;
    },
    patchPostSuccess(
      state,
      { payload }: PayloadAction<{ inputValue: string; id: string }>
    ) {
      state.patchPostLoading = null;
      const changeInput = (data: PostItem) => {
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
