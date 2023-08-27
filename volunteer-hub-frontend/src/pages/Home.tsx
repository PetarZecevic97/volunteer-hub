import React from "react";
import { makeStyles } from "@mui/styles";
import {
  Container,
  Typography,
  Button,
  Grid,
  Paper,
} from "@mui/material";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(6),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    minHeight: "100vh",
  },
  paper: {
    padding: theme.spacing(4),
    background: "rgba(255, 255, 255, 0.1)",
  },
  header: {
    marginBottom: theme.spacing(4),
  },
  slogan: {
    marginBottom: theme.spacing(4),
    fontWeight: "bold",
  },
  button: {
    marginTop: theme.spacing(3),
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    "&:hover": {
      backgroundColor: theme.palette.secondary.dark,
    },
  },
}));

const Home = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <Paper elevation={3} className={classes.paper}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="h2" className={classes.header}>
                Welcome to VolunteerHub
              </Typography>
              <Typography variant="h5" className={classes.slogan}>
                Connecting Volunteers and Organizations
              </Typography>
              <Typography variant="body1">
                VolunteerHub is your platform to discover and engage in meaningful
                volunteer opportunities. Whether you're an individual looking to make
                a difference or an organization seeking passionate volunteers, we're
                here to help you connect.
              </Typography>
              <Button
                variant="contained"
                className={classes.button}
                size="large"
              >
                Get Started
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              {/* Add any imagery or visual elements here */}
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </div>
  );
};

export default Home;