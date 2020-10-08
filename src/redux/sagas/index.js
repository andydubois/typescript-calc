import { all } from "redux-saga/effects";
import equationSaga from "./equationSaga"

export default function* rootSaga() {
  yield all([
    equationSaga()
  ]);
}
