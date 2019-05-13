const randomNum = () => {
  return Math.floor(Math.random() * 20 + 1);
};

export const chooseAnswer = choosedOption => {
  return { choosedOption: choosedOption };
};

export const nextQuestion = () => {
  return {
    first: randomNum(),
    second: randomNum(),
    result: this.first + this.second
  };
};
