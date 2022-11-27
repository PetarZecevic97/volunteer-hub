import React, { useState, useEffect } from "react";
import Avatar from "react-avatar";
import { Grid, PageContainer } from "./styles/ProfileStyles";
import getWebRequest from "../../webRequests/webRequestsProvider";
import IOrganization from "../../Entities/Organization";
import { WebRequestsInterface } from "../../webRequests/webRequests-int";

const Organization = ({id}: {id : string}) => {
  const userService: WebRequestsInterface = getWebRequest();
  const [organizationData, setOrganizationData] = useState<IOrganization>();

  const isVolatile = (param: any) => {
    return param === null || param === undefined;
  }

  async function fetchOrganization(_id: string) {
    const response = await userService.getOrganizationById(_id);
    setOrganizationData(await response.data);
  }

  useEffect(() => {
    fetchOrganization(id);
  }, [id]);

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
