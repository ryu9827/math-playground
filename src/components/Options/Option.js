import React, { useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  result: state.result
});

const Option = props => {
  const [correct, setCorrect] = useState(null);
  const { option } = props;
  console.log(option === props.result);
  console.log("correct = " + correct);
  return (
    <OptionContainer
      correct={correct}
      onClick={() => setCorrect(option === props.result)}
    >
      {option}
    </OptionContainer>
  );
};

const OptionContainer = styled.div`
  margin-left: 20%;
  margin-right: 20%;
  padding: 2%;
  border-radius: 0.3rem;
  background-color: ${props => {
    if (props.correct === true) return "var(--correctGreen)";
    else if (props.correct === null) return "var(--optionGray)";
    else return "var(--wrongRed)";
  }};
  box-shadow: 0 4px 8px 0 rgba(255, 200, 200, 0.3),
    0 6px 20px 0 rgba(0, 0, 0, 0.19);
  &:hover {
    background-color: ${props => {
      if (props.correct === null) return "var(--hoverBlue)";
      else if (props.correct === true) return "var(--correctGreen)";
      else return "var(--wrongRed)";
    }};
    box-shadow: 0 4px 8px 0 rgba(15, 255, 255, 0.3),
      0 6px 20px 0 rgba(0, 0, 0, 0.19);
    cursor: pointer;
    color: #3f5f5f;
    border-radius: 0.3rem;
  }
`;

export default connect(mapStateToProps)(Option);
