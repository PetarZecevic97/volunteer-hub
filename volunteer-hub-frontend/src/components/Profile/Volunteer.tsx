import React, { useState, useEffect } from "react";
import IVolunteer from "../../Entities/Volunteer";
import Avatar from "react-avatar";
import { Grid, PageContainer } from "./styles/ProfileStyles";
import { WebRequestsInterface } from "../../webRequests/webRequests-int";
import getWebRequest from "../../webRequests/webRequestsProvider";


const Volunteer = () => {
  const userService: WebRequestsInterface = getWebRequest();
  const [volunteerData, setVolunteerData] = useState<IVolunteer>();
  const volunteer_string = sessionStorage.getItem('userData');

  async function fetchVolunteer() {
    const volunteer = volunteer_string ? JSON.parse(volunteer_string) : {};
    setVolunteerData(volunteer);
  }

  useEffect(() => {
    fetchVolunteer();
  }, [volunteer_string]);


  
  return (
    <>
      <PageContainer>
        <Grid>
          <Avatar size="50" round={true} name={volunteerData != undefined ? volunteerData.firstName : "sampleVolunteerData"} />

          <h1>First name: {volunteerData != undefined ? volunteerData.firstName : "sampleVolunteerData"}</h1>
          <h1>Last name: {volunteerData != undefined ? volunteerData.lastName : "sampleVolunteerData"}</h1>
          <h1>Password: {volunteerData != undefined ? volunteerData.skills : "sampleVolunteerData"}</h1>
        </Grid>
      </PageContainer>
    </>
    );
};

export default Volunteer;
