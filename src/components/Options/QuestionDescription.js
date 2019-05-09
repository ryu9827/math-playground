import React from "react";

const QuestionDescription = ({ params }) => {
  const { first, second } = params;
  console.log(first);
  return (
    <div className="option">
      <p>
        {first} + {second} = _____?
      </p>
    </div>
  );
};

export default QuestionDescription;
