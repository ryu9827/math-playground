import C from "./Action_Constant";
// import { combineReducer } from "react-redux";

const reducer = (state = {}, action) => {
  switch (action.type) {
    case C.CHOOSE_ANSWER:
      return {
        ...state,
        isCorrect: action.choosedOption == this.result
      };
    case C.NEXT_QUESTION:
      return {
        ...state,
        first: action.first,
        second: action.second,
        result: action.result
      };
    default:
      return state;
  }
};

export default reducer;
