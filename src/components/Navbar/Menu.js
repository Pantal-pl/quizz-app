import "../../css/Menu.css";
import React from 'react';
import { ReactComponent as OpenMenu } from "../Navbar/openMenu.svg";
import { useAuth0 } from "@auth0/auth0-react";
const Menu = (props) => {
  const { logout } = useAuth0();
  return (
    <div className={`openMenu ` + (props.class === undefined ? "" : props.class)}>
      <ul>
        <li>Github: <a href="https://github.com/Pantal-pl">https://github.com/Pantal-pl</a></li>
        <button  onClick={() => logout({ returnTo: "https://rsstudio.netlify.app" })}>Logout</button>
      </ul>
      <OpenMenu className="menuBg"/>
    </div>
  );
};

export default Menu;
