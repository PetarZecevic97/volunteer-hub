/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Avatar from "react-avatar";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { useSelector, connect } from "react-redux";
import { getOrganization } from "../actions/organizationActions";

const Organization = ({ getOrganizationAction }: any) => {
  const myProfileOrganization = useSelector(
    (state: any) => state.profileData.myProfile
  );
  const currentOrganization = useSelector(
    (state: any) => state.organizations.organization
  );
  const { organizationId } = useParams();

  function chooseRightOrg() {
    return organizationId ? currentOrganization : myProfileOrganization;
  }
  const [rightOrganization, setRightOrganization] = useState(chooseRightOrg());

  useEffect(() => {
    if (organizationId && !currentOrganization) {
      getOrganizationAction(organizationId);
    }
    setRightOrganization(chooseRightOrg());
  }, [organizationId, currentOrganization, myProfileOrganization]);

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
                  rightOrganization
                    ? rightOrganization.organizationName
                    : "Organization"
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h4" component="div">
                {rightOrganization
                  ? rightOrganization.organizationName
                  : "Organization Name"}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">
                Summary:{" "}
                {rightOrganization
                  ? rightOrganization.summary
                  : "No Summary Available"}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

const mapDispatchToProps = {
  getOrganizationAction: getOrganization,
};

export default connect(null, mapDispatchToProps)(Organization);
