import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import IVolunteer from "../../Entities/Volunteer";
import Avatar from "react-avatar";
import { Grid, PageContainer } from "./styles/ProfileSC";
import { useSelector } from 'react-redux';
import { connect } from "react-redux";
import { getVolunteer } from "../../actions/volunteerActions";

const Volunteer = ({ getVolunteerAction }: any) => {
  const myProfileVolunteer = useSelector((state: any) => state.profileData.myProfile);
  const currentVolunteer = useSelector((state: any) => state.volunteers.volunteer);

  const { volunteerId } = useParams();

function chooseRightVolunteer() {
  return volunteerId ? currentVolunteer : myProfileVolunteer;
}

  useEffect(() => {
    if(volunteerId) {
      getVolunteerAction(volunteerId);
    }
  }, [myProfileVolunteer, volunteerId]);

  return (
    <>
      <PageContainer>
        <Grid>
          <Avatar size="50" round={true} name={chooseRightVolunteer() != undefined ? chooseRightVolunteer().firstName : "sampleVolunteerData"} />

          <h1>First name: {chooseRightVolunteer() != undefined ? chooseRightVolunteer().firstName : "sampleVolunteerData"}</h1>
          <h1>Last name: {chooseRightVolunteer() != undefined ? chooseRightVolunteer().lastName : "sampleVolunteerData"}</h1>
          <h1>Skills: {chooseRightVolunteer() != undefined ? chooseRightVolunteer().skills.join(', ') : "sampleVolunteerData"}</h1>

        </Grid>
      </PageContainer>
    </>
    );
};

const mapDispatchToProps = {
  getVolunteerAction: getVolunteer,
};

export default connect(null, mapDispatchToProps)(Volunteer);
