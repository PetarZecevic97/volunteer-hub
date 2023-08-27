import React, { useState } from "react";
import { Grid, Typography, Avatar, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import creatorsData from "../components/About/Creators"; // Import the creators data
import { Chip } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    minHeight: "100vh",
  },
  creatorContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: theme.spacing(4),
    padding: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    borderRadius: theme.shape.borderRadius,
    transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
    "&:hover": {
      transform: "translateY(-10px) scale(1.07)",
      boxShadow: `0 0 30px ${theme.palette.primary.main}`,
    },
  },
  titleChip: {
    margin: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    fontSize: "18px",
  },
  siteDescription: {
    color: theme.palette.text.primary,
    textAlign: "center",
    padding: theme.spacing(2),
    border: `2px solid ${theme.palette.primary.main}`,
    borderRadius: theme.shape.borderRadius,
    background: "transparent",
  },
  expandedDescription: {
    color: theme.palette.text.primary,
    textAlign: "center",
    padding: theme.spacing(2),
    background: "transparent",
    maxHeight: 0,
    overflow: "hidden",
    transition: "max-height 0.3s ease-in-out",
  },
  creatorPaper: {
    "&:hover $expandedDescription": {
      maxHeight: 200, // Adjust the maximum height as needed
    },
  },
  avatarContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  avatar: {
    width: 150,
    height: 150,
    margin: "0 auto",
  },
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: "50%",
    margin: "0 auto",
  },
}));

const AboutPage = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h4" gutterBottom>
        About VolunteerHub
      </Typography>
      <Typography
        variant="body1"
        className={classes.siteDescription}
        gutterBottom
      >
        VolunteerHub is a dynamic application that bridges the gap between
        individuals eager to engage in charity work and companies seeking to
        organize impactful events. By seamlessly connecting volunteers with
        meaningful opportunities and helping companies orchestrate successful
        charity endeavors, VolunteerHub embodies a powerful collaboration for
        positive change.
      </Typography>
      <Typography variant="body1" gutterBottom>
        This app is a student project for the RS2 course on the University of
        Belgrade: Faculty of Mathematics. You can find the creators' info below:
      </Typography>
      <Grid container spacing={3}>
        {creatorsData.map((creator, index) => (
          <Grid item xs={12} md={6} lg={3} key={creator.username}>
            <RouterLink
              to={`https://github.com/${creator.username}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Paper
                elevation={3}
                className={`${classes.creatorContainer} ${classes.creatorPaper}`}
              >
                <div className={classes.avatarContainer}>
                  <Avatar
                    src={creator.profilePicture} // Use profilePicture as the avatar image
                    alt={`${creator.name}'s Avatar`}
                    className={classes.profilePicture}
                  />
                  {/* <Avatar
                    src={creator.avatar}
                    alt={`${creator.name}'s Avatar`}
                    className={classes.avatar}
                  /> */}
                </div>
                <Typography variant="subtitle1" align="center">
                  {creator.name}
                </Typography>
                <Chip
                  label={creator.title}
                  variant="outlined"
                  size="medium"
                  color="secondary"
                  className={classes.titleChip}
                />
                <Chip
                  label={creator.firm || "Energysage"}
                  variant="outlined"
                  size="medium"
                  color="secondary"
                  className={classes.titleChip}
                />
                <Typography
                  variant="body2"
                  align="center"
                  className={classes.expandedDescription}
                >
                  {creator.description}
                </Typography>
              </Paper>
            </RouterLink>
          </Grid>
        ))}
      </Grid>
      <div style={{ textAlign: "center", marginTop: 40 }}>
        <Typography variant="caption" color="textPrimary">
          © {new Date().getFullYear()} VolunteerHub. All rights reserved.
        </Typography>
      </div>
    </div>
  );
};

export default AboutPage;
