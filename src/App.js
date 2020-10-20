import React from "react";
import Board from './Components/Board'
import "./App.css";

function App() {
  return (
    <div className="app">
      <h1 className="app__title">Lest Play Minesweeper!!</h1>
      <Board/>
    </div>
  );
}

export default App;
