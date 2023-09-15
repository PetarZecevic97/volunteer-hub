import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Avatar from "react-avatar";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { useSelector, connect } from "react-redux";
import { getVolunteer } from "../actions/volunteerActions";

const Volunteer = ({ getVolunteerAction }: any) => {
  const myProfileVolunteer = useSelector(
    (state: any) => state.profileData.myProfile
  );
  const currentVolunteer = useSelector(
    (state: any) => state.volunteers.volunteer
  );
  const { volunteerId } = useParams();

  function chooseRightVolunteer() {
    return volunteerId ? currentVolunteer : myProfileVolunteer;
  }
  const [rightVolunteer, setRightVolunteer] = useState(
    chooseRightVolunteer()
  );

  useEffect(() => {
    if (volunteerId && !currentVolunteer) {
      getVolunteerAction(volunteerId);
    }
    setRightVolunteer(chooseRightVolunteer());
  }, [volunteerId, currentVolunteer, myProfileVolunteer]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper
          elevation={3}
          style={{
            padding: "16px",
            backgroundColor: "#8c41ff", // Light purple background color
          }}
        >
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Avatar
                size="100"
                round={true}
                name={
                  rightVolunteer
                    ? `${rightVolunteer.firstName} ${rightVolunteer.lastName}`
                    : "Volunteer"
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h4" component="div">
                {rightVolunteer
                  ? `${rightVolunteer.firstName} ${rightVolunteer.lastName}`
                  : "Volunteer Name"}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">
                Skills:{" "}
                {rightVolunteer && rightVolunteer.skills
                  ? rightVolunteer.skills.join(", ")
                  : "No Skills Listed"}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

const mapDispatchToProps = {
  getVolunteerAction: getVolunteer,
};

export default connect(null, mapDispatchToProps)(Volunteer);
