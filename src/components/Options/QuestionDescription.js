import React from "react";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    first: state.first,
    second: state.second,
    result: state.result
  };
};

const QuestionDescription = props => {
  const { second, first } = props;
  return (
    <div className="question">
      <p>
        {first} + {second} = _____?
      </p>
    </div>
  );
};

export default connect(mapStateToProps)(QuestionDescription);
