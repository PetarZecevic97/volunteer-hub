import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import IVolunteer from "../../Entities/Volunteer";
import Avatar from "react-avatar";
import { Grid, PageContainer } from "./styles/ProfileStyles";
import { useSelector } from 'react-redux';
import { connect } from "react-redux";
import { getVolunteer } from "../../actions/volunteerActions";

const Volunteer = ({ getVolunteerAction }: any) => {
  const [volunteerData, setVolunteerData] = useState<IVolunteer>();
  const myProfileVolunteer = useSelector((state: any) => state.profileData.myProfile);
  const currentVolunteer = useSelector((state: any) => state.volunteers.volunteer);

  const { volunteerId } = useParams();

function setRightVolunteer() {
  const volunteer = volunteerId ? currentVolunteer : myProfileVolunteer;
  setVolunteerData(volunteer);
}

  useEffect(() => {
    setRightVolunteer();
  }, [myProfileVolunteer, volunteerId]);

  useEffect(() => {
    if(volunteerId) {
      getVolunteerAction(volunteerId);
    }
  }, [volunteerId]);

  return (
    <>
      <PageContainer>
        <Grid>
          <Avatar size="50" round={true} name={volunteerData != undefined ? volunteerData.firstName : "sampleVolunteerData"} />

          <h1>First name: {volunteerData != undefined ? volunteerData.firstName : "sampleVolunteerData"}</h1>
          <h1>Last name: {volunteerData != undefined ? volunteerData.lastName : "sampleVolunteerData"}</h1>
        </Grid>
      </PageContainer>
    </>
    );
};

const mapDispatchToProps = {
  getVolunteerAction: getVolunteer,
};

export default connect(null, mapDispatchToProps)(Volunteer);
