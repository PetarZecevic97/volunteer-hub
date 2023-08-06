import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import Avatar from "react-avatar";
import { Grid, PageContainer } from "../components/Profile/styles/ProfileSC";
import { useSelector } from 'react-redux';
import { connect } from "react-redux";
import { getVolunteer } from "../actions/volunteerActions";

const Volunteer = ({ getVolunteerAction }: any) => {
  const myProfileVolunteer = useSelector((state: any) => state.profileData.myProfile);
  const currentVolunteer = useSelector((state: any) => state.volunteers.volunteer);

  const { volunteerId } = useParams();

  function chooseRightVolunteer() {
    return volunteerId ? currentVolunteer : myProfileVolunteer;
  }
  const [rightVolunteer, setRightVolunteer] = useState(chooseRightVolunteer());

  useEffect(() => {
    if(volunteerId && !currentVolunteer) {
      getVolunteerAction(volunteerId);
    }
    setRightVolunteer(chooseRightVolunteer());
  }, [volunteerId, currentVolunteer, myProfileVolunteer]);

  return (
    <>
      <PageContainer>
        <Grid>
          <Avatar size="50" round={true} name={rightVolunteer ? rightVolunteer.firstName : "sampleVolunteerData"} />

          <h1>First name: {rightVolunteer ? rightVolunteer.firstName : "sampleVolunteerData"}</h1>
          <h1>Last name: {rightVolunteer ? rightVolunteer.lastName : "sampleVolunteerData"}</h1>
          <h1>Skills: {rightVolunteer && rightVolunteer.skills ? rightVolunteer.skills.join(', ') : "sampleVolunteerData"}</h1>

        </Grid>
      </PageContainer>
    </>
    );
};

const mapDispatchToProps = {
  getVolunteerAction: getVolunteer,
};

export default connect(null, mapDispatchToProps)(Volunteer);
