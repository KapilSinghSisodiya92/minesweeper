import React from "react";
import Timer from "./Timer";
import './TopBar.css'

export default function TopBar({ gameOver, setTime }) {
  return (
    <div className="topbar">
      <Timer gameOver={gameOver} sendTime={setTime} />
    </div>
  );
}