import { combineReducers } from "redux";
import equationReducer from "./equationReducer"

const rootReducer = combineReducers({
    equationReducer, //contains all equations
});

export default rootReducer;
