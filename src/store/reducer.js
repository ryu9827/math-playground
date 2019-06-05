import C from "./Action_Constant";

const reducer = (state = {}, action) => {
  switch (action.type) {
    case C.NEXT_QUESTION:
      return {
        ...state,
        first: action.first,
        second: action.second,
        result: action.first + action.second
      };
    case C.CORRECT_INCREASE:
      return {
        ...state,
        correctAmount: state.correctAmount + 1
      };
    case C.WRONG_INCREASE:
      return {
        ...state,
        wrongAmount: state.wrongAmount + 1
      };
    default:
      return state;
  }
};

export default reducer;
