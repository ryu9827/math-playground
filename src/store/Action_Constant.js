const C = {
  CHOOSE_ANSWER: "CHOOSE_ANSWER", //change isCorrect
  NEXT_QUESTION: "NEXT_QUESTION", //change first, second, isCorrect and 4 options
  UPDATE_RESULT: "UPDATE_RESULT" //change result
};

const randomNum = () => {
  return Math.floor(Math.random() * 20 + 1);
};

export { C, randomNum };
