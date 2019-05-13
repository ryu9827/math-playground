import React from "react";
import Container from "./Options/Container";
import store from "../store/store";

const Addition = () => {
  const { first, second } = store;
  return <Container params={{ first, second }} operator={"+"} />;
};

export default Addition;
