import React from "react";
import { makeStyles } from "@mui/styles";
import { Container, Typography, Button, Grid, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(6),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    minHeight: "100vh",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
  paper: {
    padding: theme.spacing(4),
    background: "rgba(255, 255, 255, 0)",
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
  const navigate = useNavigate();
  const handleNavigate = (path: string) => {
    navigate('/' + path, {replace:true})
  }

  return (
    <div className={classes.root}>
      <Container maxWidth="lg" className={classes.content}>
        <Typography variant="h2" className={classes.header}>
          Welcome to VolunteerHub
        </Typography>
        <div className="logo-container">
          <img src={require("../images/logo.png")} alt="logo" />
        </div>
        <Typography variant="h5" className={classes.slogan}>
          Connecting Volunteers and Organizations
        </Typography>
        <Typography variant="body1">
          VolunteerHub is your platform to discover and engage in meaningful
          volunteer opportunities. Whether you're an individual looking to make
          a difference or an organization seeking passionate volunteers, we're
          here to help you connect.
        </Typography>
        <Button variant="contained" className={classes.button} size="large" onClick={()=>handleNavigate("sign-in")}>
          Get Started
        </Button>
      </Container>
    </div>
  );
};

export default Home;
