import { createStore } from "redux";
import reducer from "./reducer";
import { randomNum } from "../components/OptionsMethods";

const initialState = {
  first: randomNum(),
  second: randomNum(),
  result: null,
  isCorrect: null
};

const store = createStore(reducer, initialState);
window.store = store;
export default store;
