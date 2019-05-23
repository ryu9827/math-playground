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
  const { second, first, result } = props;
  // console.log(result);
  return (
    <div className="question">
      <p>
        {first} + {second} = _____?
      </p>
    </div>
  );
  // }
};

export default connect(mapStateToProps)(QuestionDescription);
