import { useState } from "react";
import "../../css/Navbar.css";
import Menu from "./Menu";
import React from 'react';
import MenuButton from "./MenuButton";
import UserProfile from "./UserProfile";
const Navbar = () => {
  const [status, setStatus] = useState();

  const openMenu = () => {
    status === "active" ? setStatus("deactive") : setStatus("active");
  };

  return (
    <nav className="navbar">
      <Menu class={status} />
      <MenuButton open={openMenu} />
      <UserProfile/>
    </nav>
  );
};

export default Navbar;
