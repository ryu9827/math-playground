import React from "react";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  correctAmount: state.correctAmount,
  wrongAmount: state.wrongAmount
});

function Counters(props) {
  console.log(props.correctAmount);
  console.log(props.wrongAmount);
  return <div />;
}

export default connect(mapStateToProps)(Counters);
