import React, { useState, useEffect } from "react";
import Avatar from "react-avatar";
import { Grid, PageContainer } from "./styles/ProfileStyles";
import getWebRequest from "../../webRequests/webRequestsProvider";
import IOrganization from "../../Entities/Organization";
import { WebRequestsInterface } from "../../webRequests/webRequests-int";

const Organization = () => {
  const userService: WebRequestsInterface = getWebRequest();
  const [organizationData, setOrganizationData] = useState<IOrganization>();
  const org_string = sessionStorage.getItem('userData');

  async function fetchOrganization() {
    const org = org_string ? JSON.parse(org_string) : {};
    setOrganizationData(org);
  }

  useEffect(() => {
    fetchOrganization();
  }, [org_string]);

  return (
    <>
      <PageContainer>
        <Grid>
          <Avatar size="50" round={true} name={organizationData == null || organizationData == undefined ? "" : organizationData.name} />

          <h1>Username: {organizationData == null || organizationData == undefined ? "" : organizationData.name}</h1>
          <p>Email: {organizationData == null || organizationData == undefined ? "" : organizationData.summary}</p>
        </Grid>
      </PageContainer>
    </>
  );
};

export default Organization;
