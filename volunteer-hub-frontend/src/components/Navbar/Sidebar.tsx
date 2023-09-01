import React, { useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import {
  Drawer,
  List,
  ListItemText,
  IconButton,
  Grid,
  Typography,
  ListItemButton,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import EventIcon from "@mui/icons-material/Event";
import PersonIcon from "@mui/icons-material/Person";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import BugReportIcon from "@mui/icons-material/BugReport";
import InfoIcon from "@mui/icons-material/Info";
import { Menu as MenuIcon } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import { logOutOfProfile } from "../../actions/profileActions";
import "./styles/Sidebar.css";

const Sidebar = ({ logOutOfProfileAction }: any) => {
  const myProfile = useSelector((state: any) => state.profileData.myProfile);
  const [isLoggedIn, setIsLoggedIn] = useState(myProfile !== undefined);
  const [isDebug, setIsDebug] = useState(
    !process.env.NODE_ENV || process.env.NODE_ENV === "development"
  );
  const role = sessionStorage.getItem("role");

  const clearSession = () => {
    logOutOfProfileAction();
    sessionStorage.clear();
    setIsLoggedIn(false);
  };

  useEffect(() => {
    setIsLoggedIn(myProfile !== undefined);
  }, [role, myProfile]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={toggleSidebar}
        className="sidebar-button"
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor="left"
        open={isSidebarOpen}
        onClose={toggleSidebar}
        className="drawer-container" // Apply custom styles
      >
        <Grid
          container
          direction="column"
          alignItems="center"
          className="sidebar-container"
        >
          <div className="logo-container">
            <img src={require("../../images/logo-small.png")} alt="logo" />
            <Typography variant="h6" className="app-name">
              Volunteer Hub
            </Typography>
          </div>
          <List className="sidebar-list">
            <ListItemButton
              component={NavLink}
              to="/home"
              className="sidebar-item"
            >
              <HomeIcon className="sidebar-icon" />
              <ListItemText primary="Home" />
            </ListItemButton>
            {isLoggedIn && (
              <ListItemButton
                component={NavLink}
                to="/profile"
                className="sidebar-item"
              >
                <PersonIcon className="sidebar-icon" />
                <ListItemText primary="Profile" />
              </ListItemButton>
            )}
            {!isLoggedIn && (
              <ListItemButton
                component={NavLink}
                to="/sign-in"
                className="sidebar-item"
              >
                <LoginIcon className="sidebar-icon" />
                <ListItemText primary="Log In" />
              </ListItemButton>
            )}
            {!isLoggedIn && (
              <ListItemButton
                component={NavLink}
                to="/sign-up"
                className="sidebar-item"
              >
                <PersonAddIcon className="sidebar-icon" />
                <ListItemText primary="Sign Up" />
              </ListItemButton>
            )}

            {isLoggedIn && (
              <ListItemButton
                component={NavLink}
                to="/events"
                className="sidebar-item"
              >
                <EventIcon className="sidebar-icon" />
                <ListItemText primary="Events" />
              </ListItemButton>
            )}
            <ListItemButton
              component={NavLink}
              to="/about"
              className="sidebar-item"
            >
              <InfoIcon className="sidebar-icon" />
              <ListItemText primary="About" />
            </ListItemButton>
            {isDebug && (
              <ListItemButton
                component={NavLink}
                to="/debug"
                className="sidebar-item"
              >
                <BugReportIcon className="sidebar-icon" />
                <ListItemText primary="Debug" />
              </ListItemButton>
            )}
            {isLoggedIn && (
              <ListItemButton onClick={clearSession} className="sidebar-item">
                <ExitToAppIcon className="sidebar-icon" />
                <ListItemText primary="Log Out" />
              </ListItemButton>
            )}
          </List>
        </Grid>
      </Drawer>
    </>
  );
};

const mapDispatchToProps = {
  logOutOfProfileAction: logOutOfProfile,
};

export default connect(null, mapDispatchToProps)(Sidebar);
