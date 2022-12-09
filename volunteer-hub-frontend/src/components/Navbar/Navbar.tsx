import React, { useState, useEffect } from "react";
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
  Grid,
  TextRow
} from "./styles/NavbarStyles";
import "./styles/Navbar.css";
import SessionService from "../../utility/Services/SessionService";
import { SearchBar } from "../SearchBar/SearchBar";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    SessionService.checkIsLoggedIn()
  );

  const [searchOpened, setSearchOpened] = useState(false);

  const clearSession = () => {
    SessionService.clearSessionInfo();
    setIsLoggedIn(false);
  };

  useEffect(() => {
    window.addEventListener("session", () => {
      console.log(SessionService.checkIsLoggedIn());
      console.log(SessionService.getUserInfo());
      setIsLoggedIn(SessionService.checkIsLoggedIn());
    });
    removeEventListener("session", () => {});
  }, []);

  return (
    <>
      <Nav className="navbar">
        <NavLink to="/" className="navbar-logo">
          <img src={require("../../images/logo-small.png")} alt="logo" />
          <SearchBar data={[]}/>
          <Grid>
            <TextRow className="primary">Volunteer</TextRow>
            <TextRow className="secondary">Hub</TextRow>
          </Grid>
        </NavLink>
        <Bars />
        <NavMenu>
          <NavLink className="nav-links" to="/about">
            About
          </NavLink>
          <NavLink className="nav-links" to="/events">
            Events
          </NavLink>
          <NavLink className="nav-links" to="/profile">
            Profile
          </NavLink>
        </NavMenu>
        <NavBtn>
          {!isLoggedIn && <NavBtnLink to="/sign-up">Sign Up</NavBtnLink>}
          {!isLoggedIn && <NavBtnLink to="/sign-in">Log In</NavBtnLink>}
          {isLoggedIn && (
            <NavBtnLink to="/sign-in" onClick={clearSession}>
              Log Out
            </NavBtnLink>
          )}
        </NavBtn>
      </Nav>
    </>
  );
};

export default Navbar;
