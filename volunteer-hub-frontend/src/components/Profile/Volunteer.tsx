import React, { useState, useEffect } from "react";
import IVolunteer from "../../Entities/Volunteer";
import Avatar, { Cache, ConfigProvider } from "react-avatar";
import { Grid, PageContainer } from "./styles/ProfileStyles";
import { WebRequestsInterface } from "../../webRequests/webRequests-int";
import getWebRequest from "../../webRequests/webRequestsProvider";


const Volunteer = ({id}: {id : string}) => {
  const userService: WebRequestsInterface = getWebRequest();
  const [volunteerData, setVolunteerData] = useState<IVolunteer>();

  async function fetchVolunteer(_id: string) {
    const response = await userService.getVolunteerById(_id);
    
    const qurac = await response.data;
    console.log(qurac)
    console.log("Alex");
    setVolunteerData(qurac);
  }

  useEffect(() => {
    fetchVolunteer(id);
  }, [id]);


  
  return (
    <>
      <PageContainer>
        <Grid>
          <Avatar size="50" round={true} name={volunteerData != undefined ? volunteerData.firstName : "qurac"} />

          <h1>First name: {volunteerData != undefined ? volunteerData.firstName : "qurac"}</h1>
          <h1>Last name: {volunteerData != undefined ? volunteerData.lastName : "qurac"}</h1>
          <h1>Password: {volunteerData != undefined ? volunteerData.skills : "qurac"}</h1>
        </Grid>
      </PageContainer>
    </>
    );
};

export default Volunteer;
