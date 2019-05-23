import { createStore } from "redux";
import reducer from "./reducer";
import { randomNum } from "../components/OptionsMethods";

const initialState = {
  first: randomNum(),
  second: randomNum(),
  correctAmount: 0,
  wrongAmount: 0
};
initialState.result = initialState.first + initialState.second;

const store = createStore(reducer, initialState);
window.store = store;
export default store;
