import React from "react";
import { connect } from "react-redux";
import { updateResult } from "../store/actionsCreator";
import { getOptions } from "./OptionsMethods";
import QuestionDescription from "./Options/QuestionDescription";
import Option from "./Options/Option";
import Button from "./Button";
import store from "../store/store";

const mapDispatchToProps = dispatch => {
  return {
    refreshParams: () => dispatch(updateResult())
  };
};

const mapStateToProps = state => ({
  result: state.result
});

class Addition extends React.Component {
  constructor(props) {
    super();
    this.state = {
      options: [],
      isCorrect: null
    };
  }

  componentWillMount() {
    this.props.refreshParams();
    console.log(this.props.result);
  }

  // componentDidMount() {
  //   console.log(store.getState());
  //   console.log(this.props);
  // this.setState(
  //   () => getOptions(20),
  //   () => {
  //     console.log(this.state.options);
  //   }
  // );
  // }

  render() {
    return (
      <div className="container">
        <QuestionDescription />
        <Option />
        <Option />
        <Option />
        <Option />
        <Button />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Addition);
