import "../../css/MenuButton.css";
import React from 'react';
import { ReactComponent as Menu } from "../Navbar/menu.svg";

const MenuButton = (props) => {
  return (
    <button className="menuButton" onClick={props.open}>
      <Menu />
    </button>
  );
};

export default MenuButton;
