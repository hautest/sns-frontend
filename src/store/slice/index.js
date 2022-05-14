import { combineReducers } from "@reduxjs/toolkit";

import { signUpReducer } from "./userSlice";
import { postReducer } from "./postSlice";

export const rootReducer = combineReducers({
  user: signUpReducer,
  post: postReducer,
});
