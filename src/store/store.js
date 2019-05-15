import { createStore } from "redux";
import reducer from "./reducer";
import { randomNum } from "../components/OptionsMethods";

const initialState = {
  first: randomNum(),
  second: randomNum(),
  isCorrect: null
};
initialState.result = initialState.first + initialState.second;

const store = createStore(reducer, initialState);
window.store = store;
export default store;
