import React from "react";
import { connect } from "react-redux";
import { nextQuestion, updateResult } from "../../store/actionsCreator";

const mapStateToProps = state => {
  return {
    first: state.first,
    second: state.second,
    result: state.result
  };
};

const mapDispatchToProps = dispatch => {
  return {
    refreshParams: () => dispatch(updateResult())
  };
};

class QuestionDescription extends React.Component {
  constructor(props) {
    super();
  }

  componentWillMount() {
    this.props.refreshParams();
  }

  render() {
    const { first, second, result } = this.props;
    console.log(result);
    return (
      <div className="question">
        <p>
          {first} + {second} = _____?
        </p>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionDescription);
