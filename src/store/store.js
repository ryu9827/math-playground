import { createStore } from "redux";
import reducer from "./reducer";

const store = createStore(reducer, initialState);

const initialState = localStorage["redux-store"]
  ? JSON.parse(localStorage["redux-store"])
  : { first: 1, second: 2, result: 3, isCorrect: null };

export default store;
