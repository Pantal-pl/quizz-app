import "../../css/ProgressBar.css";
import { useState } from "react";
import React from 'react';
import useInterval from "../../hooks/useInterval";

const Progress = ({type,passChildData}) => {
  const [style, setStyle] = useState();
  const [time, setTime] = useState(180);

  useInterval(() => {
    if (time === 0) return;
    setTime(time - 1);
  }, 1000);

  setTimeout(() => {
    const newStyle = {
      opacity: 1,
      width: `${type === "sec" ? time / 1.8 : time}%`,
    };
    setStyle(newStyle);
  }, 1000);

    passChildData(time)

  return (
    <div className="progress">
      <div className="progress-done" style={style}>
        {time} {type}.
      </div>
    </div>
  );
};

export default Progress;
