import React from "react";

const QuestionContext = React.createContext();

class QuestionProvider extends React.Component {
  state = {
    questions: [],
    first: 0,
    second: 0,
    result: 0,
    correctCount: 0,
    incorrectCount: 0
  };

  randomNum = () => {
    return Math.floor(Math.random() * 20 + 1);
  };

  setParams = () => {
    this.setState(
      () => {
        return {
          first: this.randomNum(),
          second: this.randomNum()
        };
      },
      () => {
        this.setState(() => {
          return {
            result: this.state.first + this.state.second
          };
        });
      }
    );
  };

  componentWillMount() {
    this.setParams();
  }

  render() {
    return (
      <QuestionContext.Provider value={{ ...this.state }}>
        {this.props.children}
      </QuestionContext.Provider>
    );
  }
}

const QuestionConsumer = QuestionContext.Consumer;
export { QuestionProvider, QuestionConsumer };
