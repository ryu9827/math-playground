import React from "react";
import Addition from "./components/Addition.js";
import Substruction from "./components/Substruction";
import Header from "./components/Header";
import "./App.css";

function App() {
  return (
    <div className="App-header">
      <Header />
      <Addition />
      <Substruction />
    </div>
  );
}

export default App;
