import React from "react";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    first: state.first,
    second: state.second,
    result: state.result
  };
};

class QuestionDescription extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    const { first, second } = this.props;
    return (
      <div className="question">
        <p>
          {first} + {second} = _____?
        </p>
      </div>
    );
  }
}

export default connect(mapStateToProps)(QuestionDescription);
