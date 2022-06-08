import "../../css/GameTypeButton.css";
import React from 'react';
import { ReactComponent as RandomCountry } from "../GameTypes/random.svg";
import { ReactComponent as SelectContinent } from "../GameTypes/continent.svg";
import { ReactComponent as SelectCountry } from "../GameTypes/country.svg";



const GameTypeButton = (props) => {
  const type =
    props.type === "RandomCountry"
      ? "RandomCountry"
      : props.type === "SelectContinent"
      ? "SelectContinent"
      : "SelectCountry";

  switch (type) {
    case "RandomCountry":
      return (
        <button   className="gameTypeButton">
          <p>Random Country</p>
          <RandomCountry   className="svgs" />
        </button>
      );
    case "SelectContinent":
      return (
        <button  className="gameTypeButton">
          <p>Select Continent</p>
          <SelectContinent className="svgs" />
        </button>
      );
    case "SelectCountry":
      return (
        <button className="gameTypeButton">
          <p>Select Country</p>
          <SelectCountry className="svgs" />
        </button>
      );
    default:
      return;
  }
};

export default GameTypeButton;
