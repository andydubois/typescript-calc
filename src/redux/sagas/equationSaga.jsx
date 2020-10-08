import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

function* addNewEquation(action) {
  try {
    yield axios.post("/math/add", action.payload);
    console.log("add equation client side", action.payload);
    yield put({
      type: "FETCH_EQUATIONS",
    });
  } catch (error) {
    console.log("error in client side equation POST", error);
  }
}

function* watchMe() {
    yield takeEvery("NEW_EQUATION", addNewEquation);
    yield takeEvery("FETCH_EQUATIONS", getEquations)
}

export default watchMe;
