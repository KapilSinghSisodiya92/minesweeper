import React, { useState, useEffect } from "react";
import ReplayIcon from '@material-ui/icons/Replay';
import './Model.css'

export default function Modal({ reset, completeTime }) {
  const [render, setRender] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setRender(true);
    }, 1000);
  }, []);
  return (
    <div className={`model ${render && "model__render"} ${!render && "model__DoNotrender"}`}>
      <div className="model__image"></div>
      <div onClick={() => reset()} className="model__button">
        <span className="model__retry">
          <ReplayIcon/>
          Retry
        </span>
      </div>
    </div>
  );
}