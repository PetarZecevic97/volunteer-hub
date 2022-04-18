import React from "react";
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink
} from "./styles/NavbarStyles";

const Navbar = () => {
  return (
    <>
      <Nav>
        <NavLink to="/">

            <img src={require('../../images/logo-small.png')} alt="logo" />

        </NavLink>
        <Bars />
        <NavMenu>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/events">Events</NavLink>
          <NavLink to="/sign-up">Sign Up</NavLink>
          <NavLink to="/profile">Profile</NavLink>
        </NavMenu>
        <NavBtn>
          <NavBtnLink to="/sign-in">Sign In</NavBtnLink>
        </NavBtn>
      </Nav>
    </>
  );
};

export default Navbar;
