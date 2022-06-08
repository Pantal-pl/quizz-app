import "../../css/MainButton.css";
import { ReactComponent as Vector1 } from "../StartScreen/vector4.svg";
import { ReactComponent as Vector2 } from "../StartScreen/vector5.svg";
import { ReactComponent as Vector3 } from "../StartScreen/vector6.svg";
import { ReactComponent as Vector4 } from "../StartScreen/vector1.svg";
import { ReactComponent as Vector5 } from "../StartScreen/vector2.svg";
import { ReactComponent as Vector6 } from "../StartScreen/vector3.svg";
import React from 'react';
const MainButton = (props) => {
  const type = props.type === "white" ? "white" : "green";

  if (type === "green") {
    return (
      <button onClick={props.action} className={type + " mainButton"}>
        {props.text}
        <Vector1 className="mainButtonSvgs" />
        <Vector2 className="mainButtonSvgs" />
        <Vector3 className="mainButtonSvgs" />
      </button>
    );
  } else {
    return (
      <button onClick={props.action} className={type + " mainButton"}>
        {props.text}
        <Vector5 className="mainButtonSvgs" />
        <Vector6 className="mainButtonSvgs" />
        <Vector4 className="mainButtonSvgs" />
      </button>
    );
  }
};

export default MainButton;
