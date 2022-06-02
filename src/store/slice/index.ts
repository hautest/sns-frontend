import { combineReducers } from "@reduxjs/toolkit";

import { signUpReducer } from "./userSlice";

export const rootReducer = combineReducers({
  user: signUpReducer,
});
