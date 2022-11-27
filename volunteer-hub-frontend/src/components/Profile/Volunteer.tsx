import React, { useState, useEffect } from "react";
import IVolunteer from "../../Entities/Volunteer";
import Avatar from "react-avatar";
import { Grid, PageContainer } from "./styles/ProfileStyles";
import { WebRequestsInterface } from "../../webRequests/webRequests-int";
import getWebRequest from "../../webRequests/webRequestsProvider";


const Volunteer = ({id}: {id : string}) => {
  const userService: WebRequestsInterface = getWebRequest();
  const [volunteerData, setVolunteerData] = useState<IVolunteer>();

  async function fetchVolunteer(_id: string) {
    const response = await userService.getVolunteerById(_id);
    
    const sampleVolunteerData = await response.data;
    setVolunteerData(sampleVolunteerData);
  }

  useEffect(() => {
    fetchVolunteer(id);
  }, [id]);


  
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
