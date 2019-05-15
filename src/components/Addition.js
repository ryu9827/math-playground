import React from "react";
import { connect } from "react-redux";
import QuestionDescription from "./Options/QuestionDescription";
import Option from "./Options/Option";
import Button from "./Button";
import { getOptions } from "./OptionsMethods";

const mapStateToProps = state => ({
  result: state.result,
  first: state.first
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

  render() {
    console.log(this.state.options);
    return (
      <div className="container">
        <QuestionDescription />
        <Option option={this.state.options[0]} />
        <Option option={this.state.options[1]} />
        <Option option={this.state.options[2]} />
        <Option option={this.state.options[3]} />
        <Button />
      </div>
    );
  }
}

export default connect(mapStateToProps)(Addition);
