import React, { useState, useEffect } from "react";
import { useLocation, useParams } from 'react-router-dom';
import IVolunteer from "../../Entities/Volunteer";
import Avatar from "react-avatar";
import { Grid, PageContainer } from "./styles/ProfileStyles";
import { WebRequestsInterface } from "../../webRequests/webRequests-int";
import getWebRequest from "../../webRequests/webRequestsProvider";


const Volunteer = () => {
  const userService: WebRequestsInterface = getWebRequest();
  const [volunteerData, setVolunteerData] = useState<IVolunteer>();
  const location = useLocation();
  const { volunteerId } = useParams();
  const userId = sessionStorage.getItem('id');
  const id = location.pathname === '/profile' ? userId : volunteerId;
  async function fetchVolunteer() {
    if(id) {
      const volunteer = await userService.getVolunteerById(id);
      setVolunteerData(volunteer);
    }
  }

  useEffect(() => {
    fetchVolunteer();
  }, [id]);

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

export default Volunteer;
