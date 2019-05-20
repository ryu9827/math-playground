import React from "react";
import { connect } from "react-redux";
import QuestionDescription from "./Options/QuestionDescription";
import Option from "./Options/Option";
import Button from "./Button";
import { getOptions } from "./OptionsMethods";

const mapStateToProps = state => ({
  result: state.result
});

class Addition extends React.Component {
  constructor(props) {
    super();
    this.state = {
      options: []
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

  render() {
    return (
      <div className="container">
        <div className="blackboard">
          <QuestionDescription />
          <Option option={this.state.options[0]} />
          <Option option={this.state.options[1]} />
          <Option option={this.state.options[2]} />
          <Option option={this.state.options[3]} />
          <Button updateOptions={this.updateOptions.bind(this)} />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Addition);
