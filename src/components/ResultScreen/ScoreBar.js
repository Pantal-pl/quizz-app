import "../../css/ScoreBar.css";
import React from 'react';

const ScoreBar = ({type,value}) => {
    
    const newStyle = {
        opacity: 1,
        width: `${type === "exp" ? value / 7 : value}%`,
      };
  return (
    <div className="scoreBar">
      <div className="scoreBar-done" style={newStyle}>
        {value + type}
      </div>
    </div>
  );
};

export default ScoreBar;
