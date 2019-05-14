import { randomNum } from "./Action_Constant";
import { C } from "./Action_Constant";

export const chooseAnswer = choosedOption => {
  return { choosedOption: choosedOption, type: C.CHOOSE_ANSWER };
};

export const nextQuestion = () => {
  return {
    first: randomNum(),
    second: randomNum(),
    type: C.NEXT_QUESTION
  };
};

export const updateResult = (first, second) => {
  return {
    result: first + second,
    type: C.UPDATE_RESULT
  };
};
