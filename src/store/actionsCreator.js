//This file is not being used, yet
import { randomNum } from "../components/OptionsMethods";
import C from "./Action_Constant";

export const chooseAnswer = choosedOption => {
  return { choosedOption: choosedOption, type: C.CHOOSE_ANSWER };
};

export const nextQuestion = () => {
  const next = {
    first: randomNum(),
    second: randomNum(),
    type: C.NEXT_QUESTION
  };
  next.result = next.first + next.second;
  return next;
};

export const updateIsCorrect = (first, second) => {
  return {
    result: first + second,
    type: C.UPDATE_RESULT
  };
};
