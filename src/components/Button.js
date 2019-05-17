import React from "react";
import C from "../store/Action_Constant";
import { connect } from "react-redux";
import { randomNum } from "../components/OptionsMethods";

const mapDispatchToProps = dispatch => {
  return {
    nextQuestion() {
      dispatch({
        first: randomNum(),
        second: randomNum(),
        type: C.NEXT_QUESTION
      });
    }
  };
};

const Button = ({ nextQuestion, updateOptions }) => {
  return (
    <div className="button" onClick={() => nextQuestion()}>
      Next
    </div>
  );
};

export default connect(
  null,
  mapDispatchToProps
)(Button);
