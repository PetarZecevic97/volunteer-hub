import React, { useState, useEffect } from "react";
import Avatar, { Cache, ConfigProvider } from "react-avatar";
import { Grid, PageContainer } from "./styles/ProfileStyles";
import getWebRequest from "../../webRequests/webRequestsProvider";
import IOrganization from "../../Entities/Organization";
import { WebRequestsInterface } from "../../webRequests/webRequests-int";

const organization = (id: number) => {
  const userService: WebRequestsInterface = getWebRequest();
  const [organizationData, setOrganizationData] = useState<IOrganization>();

  async function fetchOrganization(_id: number) {
    const response = await userService.getOrganizationById(_id);
    setOrganizationData(await response.data);
  }

  useEffect(() => {
    fetchOrganization(id);
  }, []);

  return (
    <>
      <PageContainer>
        <Grid>
          <Avatar size="50" round={true} name={organizationData?.name} />

          <h1>Username: {organizationData?.name}</h1>
          <p>Email: {organizationData?.summary}</p>
        </Grid>
      </PageContainer>
    </>
  );
};

export default organization;
