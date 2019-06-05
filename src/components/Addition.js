import React from "react";
import { connect } from "react-redux";
import QuestionDescription from "./Options/QuestionDescription";
import Option from "./Options/Option";
import Button from "./Button";
import { getOptions } from "./OptionsMethods";
import Counters from "./Counters.js";
import C from "../store/Action_Constant";

const mapStateToProps = state => ({
  result: state.result
});

const mapDispatchToProps = dispatch => {
  return {
    updateStoreCounter(isCorrect) {
      if (isCorrect) {
        dispatch({ type: C.CORRECT_INCREASE });
      } else {
        dispatch({ type: C.WRONG_INCREASE });
      }
    }
  };
};

class Addition extends React.Component {
  constructor(props) {
    super();
    this.state = {
      options: [],
      isAnswered: false,
      isCorrect: null
    };
  }

  componentWillMount() {
    this.setState(() => ({ options: getOptions(this.props.result) }));
  }

  componentWillReceiveProps(nextProps) {
    const { result } = nextProps;
    this.setState(() => ({ options: getOptions(result) }));
  }

  updateOptions() {
    this.setState(() => ({
      options: getOptions(this.props.result)
    }));
  }

  //@dev only the first click will be recognized as your answer. If first click is wrong, even your second click is right, the question still be regarded as wrongly answered
  // and the question will be added to wroingCounter.
  setIsAnsweredToTrue() {
    this.setState(() => ({ isAnswered: true }));
  }

  updateIsCorrect(correctness) {
    if (!this.state.isAnswered) {
      this.setState(() => ({ isCorrect: correctness }));
    } else {
      console.log("this question has been answered");
    }
  }

  setIsAnsweredToFalse() {
    this.setState(() => ({ isAnswered: false }));
  }

  render() {
    const { updateStoreCounter } = this.props;
    return (
      <div className="container">
        <div className="blackboard-outter">
          <Counters />
          <div className="blackboard">
            <QuestionDescription />
            <Option
              option={this.state.options[0]}
              setIsAnsweredToTrue={this.setIsAnsweredToTrue.bind(this)}
              updateIsCorrect={this.updateIsCorrect.bind(this)}
              isCorrect={this.state.isCorrect}
            />
            <Option
              option={this.state.options[1]}
              setIsAnsweredToTrue={this.setIsAnsweredToTrue.bind(this)}
              updateIsCorrect={this.updateIsCorrect.bind(this)}
              isCorrect={this.state.isCorrect}
            />
            <Option
              option={this.state.options[2]}
              setIsAnsweredToTrue={this.setIsAnsweredToTrue.bind(this)}
              updateIsCorrect={this.updateIsCorrect.bind(this)}
              isCorrect={this.state.isCorrect}
            />
            <Option
              option={this.state.options[3]}
              setIsAnsweredToTrue={this.setIsAnsweredToTrue.bind(this)}
              updateIsCorrect={this.updateIsCorrect.bind(this)}
              isCorrect={this.state.isCorrect}
            />
            <Button
              updateOptions={this.updateOptions.bind(this)}
              updateStoreCounter={this.props.updateStoreCounter}
              isCorrect={this.state.isCorrect}
              setIsAnsweredToFalse={this.setIsAnsweredToFalse.bind(this)}
              onClick={() => updateStoreCounter(this.state.isCorrect)}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Addition);
