import C from "./Action_Constant";

const reducer = (state = {}, action) => {
  switch (action.type) {
    case C.CHOOSE_ANSWER:
      return {
        ...state,
        isCorrect: action.choosedOption === this.result
      };
    case C.NEXT_QUESTION:
      return {
        ...state,
        first: action.first,
        second: action.second
      };
    case C.UPDATE_RESULT:
      return {
        ...state,
        result: state.first + state.second
      };
    default:
      return state;
  }
};

export default reducer;
