import React from "react";
import QuestionDescription from "./QuestionDescription";
import Option from "./Option";
import Button from "../Button";

const Container = () => {
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
};

export default Container;
