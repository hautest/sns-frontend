import { signUpReducer } from "./userSlice";
import { combineReducers } from "@reduxjs/toolkit";

export const rootReducer = combineReducers({
  user: signUpReducer,
});
