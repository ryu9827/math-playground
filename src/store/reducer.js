import C from "./Action_Constant";

const reducer = (state = {}, action) => {
  switch (action.type) {
    case C.CHOOSE_ANSWER:
      return {
        ...state,
        isAnswered: true
      };
    case C.NEXT_QUESTION:
      return {
        ...state,
        first: action.first,
        second: action.second,
        result: action.first + action.second,
        isAnswered: false
      };
    case C.CORRECT_INCREASE:
      return {
        ...state,
        correctAmount: state.correctAmount++
      };
    case C.WRONG_INCREASE:
      return {
        ...state,
        wrongAmount: state.wrongAmount++
      };
    default:
      return state;
  }
};

export default reducer;
