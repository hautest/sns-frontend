import { all, fork } from "redux-saga/effects";

import { userSaga } from "./userSaga";
import { postSaga } from "./postSaga";

export function* rootSaga() {
  yield all([fork(userSaga)]);
  yield all([fork(postSaga)]);
}
