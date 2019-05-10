import React from "react";

const QuestionDescription = ({ params, operator }) => {
  const { first, second } = params;
  console.log(first);
  return (
    <div className="question">
      <p>
        {first} {operator} {second} = _____?
      </p>
    </div>
  );
};

export default QuestionDescription;
