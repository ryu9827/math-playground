import React from "react";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  correctAmount: state.correctAmount,
  wrongAmount: state.wrongAmount
});

function Counters(props) {
  const { correctAmount, wrongAmount } = props;
  return (
    <div className="counters">
      <div>
        Correct : <span className="correct">{correctAmount}</span>
      </div>
      <div>
        Wrong : <span className="wrong">{wrongAmount}</span>
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(Counters);
