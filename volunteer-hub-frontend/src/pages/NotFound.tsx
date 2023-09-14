import React from "react";
import { Typography, Container, Button, CssBaseline } from "@mui/material";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Typography variant="h1" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" paragraph>
        Oops! Looks like you're lost.
      </Typography>
      <Typography variant="body1" paragraph>
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </Typography>
      <Button variant="contained" component={Link} to="/">
        Go to Home
      </Button>
    </Container>
  );
};

export default NotFoundPage;
