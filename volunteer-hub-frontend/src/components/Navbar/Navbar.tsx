import React from "react";
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
  Grid,
  TextRow,
} from "./styles/NavbarStyles";
import "./styles/Navbar.css";

const Navbar = () => {
  return (
    <>
      <Nav className="navbar">
        <NavLink to="/" className="navbar-logo">
          <img src={require("../../images/logo-small.png")} alt="logo" />
          <Grid>
            <TextRow className="primary">Volunteer</TextRow>
            <TextRow className="secondary">Hub</TextRow>
          </Grid>
        </NavLink>
        <Bars />
        <NavMenu>
          <NavLink className="nav-links" to="/about">About</NavLink>
          <NavLink className="nav-links" to="/events">Events</NavLink>
          <NavLink className="nav-links" to="/sign-up">Sign Up</NavLink>
          <NavLink className="nav-links" to="/profile">Profile</NavLink>
        </NavMenu>
        <NavBtn>
          <NavBtnLink to="/sign-in">Sign In</NavBtnLink>
        </NavBtn>
      </Nav>
    </>
  );
};

export default Navbar;
