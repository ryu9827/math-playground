import React from "react";
import QuestionDescription from "./QuestionDescription";
import Option from "./Option";

const Container = () => {
  let params = { first: 1, second: 2 };
  return (
    <div className="container">
      <QuestionDescription params={params} />
      <Option />
      <Option />
      <Option />
      <Option />
    </div>
  );
};

export default Container;
