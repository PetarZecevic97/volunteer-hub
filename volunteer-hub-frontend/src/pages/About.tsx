import React from "react";
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
  avatar: {
    width: 150,
    height: 150,
    margin: "auto",
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
      transform: "translateY(-10px) scale(1.05)",
      boxShadow: `0 0 20px ${theme.palette.primary.main}`, // Use primary color (purple) for the box shadow
    },
  },
  titleChip: {
    margin: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    fontSize: "18px", // Increase the font size for a bigger chip
  },
  siteDescription: {
    color: theme.palette.text.primary,
    textAlign: "center",
    padding: theme.spacing(2),
    border: `2px solid ${theme.palette.primary.main}`, // Add a border with primary color (purple)
    borderRadius: theme.shape.borderRadius,
    background: "transparent", // Set background to transparent
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
        VolunteerHub is a dynamic application that bridges the gap between individuals eager to engage in charity work and companies seeking to organize impactful events. By seamlessly connecting volunteers with meaningful opportunities and helping companies orchestrate successful charity endeavors, VolunteerHub embodies a powerful collaboration for positive change.
      </Typography>
      <Grid container spacing={3}>
        {creatorsData.map((creator) => (
          <Grid item xs={12} md={6} lg={3} key={creator.username}>
            <RouterLink
              to={`https://github.com/${creator.username}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Paper elevation={3} className={classes.creatorContainer}>
                <Avatar
                  src={creator.avatar}
                  alt={`${creator.name}'s Avatar`}
                  className={classes.avatar}
                />
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
                <Typography variant="body2" align="center">
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
