import React from "react";
import QuestionDescription from "./QuestionDescription";
import Option from "./Option";
import Button from "../Button";

const Container = ({ params, operator }) => {
  return (
    <div className="container">
      <QuestionDescription params={params} operator={operator} />
      <Option />
      <Option />
      <Option />
      <Option />
      <Button />
    </div>
  );
};

export default Container;
