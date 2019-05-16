const randomNum = () => {
  return Math.floor(Math.random() * 20 + 1);
};

const mixOptions = options => {
  const newArray = [];
  const length = options.length;
  let indexArray = []; // get an array of [ 0, length]
  for (let i = 0; i < length; i++) {
    indexArray.push(i);
  }
  while (indexArray.length !== 0) {
    const randomIndex = Math.floor(Math.random() * indexArray.length);
    newArray.push(options[indexArray[randomIndex]]);
    indexArray = indexArray.filter((item, index) => index !== randomIndex);
  }

  return newArray; //return the options after mixture;
};

const generateOptions = result => {
  let options = [];
  while (options.length < 3) {
    let option = generateOneOption(result);
    if (!options.includes(option) && option !== result) {
      options.push(option);
    }
  }
  options.push(result);
  return options; //return array of 3 options along with the result;
};

const generateOneOption = result => {
  return Math.floor(Math.random() * result * 2); //so the value range of options is [0 , result * 2)
};

const getOptions = result => {
  const options = generateOptions(result);
  return mixOptions(options);
};

export { getOptions, randomNum };
