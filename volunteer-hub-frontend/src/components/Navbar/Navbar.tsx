import React, { useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
  Grid,
  TextRow,
} from "./styles/NavbarSC";
import "./styles/Navbar.css";
import { logOutOfProfile } from "../../actions/profileActions";

const Navbar = ({ logOutOfProfileAction }: any) => {
  const myProfile = useSelector((state: any) => state.profileData.myProfile);

  const [isLoggedIn, setIsLoggedIn] = useState(myProfile !== undefined);
  const [isDebug, setIsDebug] = useState( () => {
      if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        return true;
      } else {
        return false;
      }
    }
  );

  const clearSession = () => {
    logOutOfProfileAction();
    sessionStorage.clear()
    setIsLoggedIn(false);
  };

  useEffect(() => {
    setIsLoggedIn(myProfile !== undefined);
  }, [myProfile]);

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
          {isDebug && <NavBtnLink to="/debug">Debug</NavBtnLink>}
        </NavBtn>
      </Nav>
    </>
  );
};

const mapDispatchToProps = {
  logOutOfProfileAction: logOutOfProfile,
};

export default connect(null, mapDispatchToProps)(Navbar);
