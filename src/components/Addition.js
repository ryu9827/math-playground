import React from "react";
import Container from "./Options/Container";
import { QuestionConsumer } from "../context";

const Addition = () => {
  return (
    <QuestionConsumer>
      {value => {
        const { first, second } = value;
        return <Container params={{ first, second }} operator={"+"} />;
      }}
    </QuestionConsumer>
  );
};

export default Addition;
