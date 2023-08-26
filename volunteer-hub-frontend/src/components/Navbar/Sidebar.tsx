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
import HomeIcon from '@mui/icons-material/Home';
import EventIcon from '@mui/icons-material/Event';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import BugReportIcon from '@mui/icons-material/BugReport';
import { Menu as MenuIcon } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import { logOutOfProfile } from "../../actions/profileActions";
import "./styles/Sidebar.css"; // Create a new CSS file for custom sidebar styles

const Sidebar = ({ logOutOfProfileAction }: any) => {
  const myProfile = useSelector((state: any) => state.profileData.myProfile);

  const [isLoggedIn, setIsLoggedIn] = useState(myProfile !== undefined);
  const [isDebug, setIsDebug] = useState(
    !process.env.NODE_ENV || process.env.NODE_ENV === "development"
  );

  const clearSession = () => {
    logOutOfProfileAction();
    sessionStorage.clear();
    setIsLoggedIn(false);
  };

  useEffect(() => {
    setIsLoggedIn(myProfile !== undefined);
  }, [myProfile]);

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
      >
        <MenuIcon />
      </IconButton>
      <Drawer anchor="left" open={isSidebarOpen} onClose={toggleSidebar}>
        <Grid
          container
          direction="column"
          alignItems="center"
          className="sidebar-container" // Apply custom styles
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
              to="/about"
              className="sidebar-item"
            >
              <HomeIcon className="sidebar-icon" />
              <ListItemText primary="About" />
            </ListItemButton>
            <ListItemButton
              component={NavLink}
              to="/events"
              className="sidebar-item"
            >
              <EventIcon className="sidebar-icon" />

              <ListItemText primary="Events" />
            </ListItemButton>
            <ListItemButton
              component={NavLink}
              to="/profile"
              className="sidebar-item"
            >
              <PersonIcon className="sidebar-icon" />
              <ListItemText primary="Profile" />
            </ListItemButton>
            <ListItemButton onClick={clearSession} className="sidebar-item">
              <ExitToAppIcon className="sidebar-icon" />
              <ListItemText primary="Log Out" />
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
