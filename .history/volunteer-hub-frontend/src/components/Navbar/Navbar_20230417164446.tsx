import React, { useState, useEffect } from "react";
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
import SessionService from "../../utility/Services/SessionService";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    SessionService.checkIsLoggedIn()
  );
  const [isDebug, setIsDebug] = useState( () => {
      if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        return true;
      } else {
        return false;
      }
    }
  );

  const clearSession = () => {
    SessionService.clearSessionInfo();
    sessionStorage.clear()
    setIsLoggedIn(false);
  };

  useEffect(() => {
    setIsLoggedIn(SessionService.checkIsLoggedIn());

    // Respond to the `storage` event
    const storageEventHandler = (event: any) => {
      if (event.key === "email" || event.key === "username") {
        setIsLoggedIn(event.newValue !== undefined ? true: false);
      }
    };
    // Hook up the event handler
    window.addEventListener("storage", storageEventHandler);
    return () => {
      // Remove the handler when the component unmounts
      window.removeEventListener("storage", storageEventHandler);
    };
  }, []);

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
          {!isDebug && <NavBtnLink to="/debug">Debug</NavBtnLink>}
        </NavBtn>
      </Nav>
    </>
  );
};

export default Navbar;
