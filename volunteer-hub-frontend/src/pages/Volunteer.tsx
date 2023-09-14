import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import Avatar from "react-avatar";
import { Grid, PageContainer } from "../components/Profile/styles/ProfileSC";
import { useSelector } from 'react-redux';
import { connect } from "react-redux";
import { getVolunteer } from "../actions/volunteerActions";

const Volunteer = ({ getVolunteerAction }: any) => {
  // Use the 'useSelector' hook to access data from the Redux store.
  const myProfileVolunteer = useSelector((state: any) => state.profileData.myProfile);
  const currentVolunteer = useSelector((state: any) => state.volunteers.volunteer);

  // Extract the 'volunteerId' from the URL parameters using 'useParams'.
  const { volunteerId } = useParams();

  function chooseRightVolunteer() {
    return volunteerId ? currentVolunteer : myProfileVolunteer;
  }
  
  const [rightVolunteer, setRightVolunteer] = useState(chooseRightVolunteer());

  // Fetch volunteer data when 'volunteerId' changes or when data is missing.
  useEffect(() => {
    if (volunteerId && !currentVolunteer) {
      // Dispatch an action to fetch volunteer data if 'volunteerId' is present and data is missing.
      getVolunteerAction(volunteerId);
    }
    // Update the 'rightVolunteer' state based on the chosen volunteer data.
    setRightVolunteer(chooseRightVolunteer());
  }, [volunteerId, currentVolunteer, myProfileVolunteer]);

  return (
    <>
      <PageContainer>
        <Grid>
          {/* Display the volunteer's avatar with their first name, last name, and skills */}
          <Avatar size="50" round={true} name={rightVolunteer ? rightVolunteer.firstName : "sampleVolunteerData"} />

          <h1>First name: {rightVolunteer ? rightVolunteer.firstName : "sampleVolunteerData"}</h1>
          <h1>Last name: {rightVolunteer ? rightVolunteer.lastName : "sampleVolunteerData"}</h1>
          <h1>Skills: {rightVolunteer && rightVolunteer.skills ? rightVolunteer.skills.join(', ') : "sampleVolunteerData"}</h1>

        </Grid>
      </PageContainer>
    </>
  );
};

// Define the 'mapDispatchToProps' object to connect the 'getVolunteerAction' action to the component.
const mapDispatchToProps = {
  getVolunteerAction: getVolunteer,
};

// Connect the component to the Redux store and pass the 'mapDispatchToProps' object.
export default connect(null, mapDispatchToProps)(Volunteer);
