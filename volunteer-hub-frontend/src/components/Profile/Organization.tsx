import React, { useState, useEffect,  } from "react";
import { useLocation, useParams } from 'react-router-dom';
import Avatar from "react-avatar";
import { Grid, PageContainer } from "./styles/ProfileStyles";
import getWebRequest from "../../webRequests/webRequestsProvider";
import IOrganization from "../../Entities/Organization";
import { WebRequestsInterface } from "../../webRequests/webRequests-int";

const Organization = () => {
  const userService: WebRequestsInterface = getWebRequest();
  const [organizationData, setOrganizationData] = useState<IOrganization>(); const location = useLocation();
  const { organizationId } = useParams();
  const userId = sessionStorage.getItem('id');
  const id = location.pathname === '/profile' ? userId : organizationId;
  async function fetchOrganization() {
    if(id) {
      const org = await userService.getOrganizationById(id);
      setOrganizationData(org);
    }
  }

  useEffect(() => {
    fetchOrganization();
  }, [id]);

  return (
    <>
      <PageContainer>
        <Grid>
          <Avatar size="50" round={true} name={organizationData == null || organizationData == undefined ? "" : organizationData.organizationName} />

          <h1>Username: {organizationData == null || organizationData == undefined ? "" : organizationData.organizationName}</h1>
          <p>Email: {organizationData == null || organizationData == undefined ? "" : organizationData.summary}</p>
        </Grid>
      </PageContainer>
    </>
  );
};

export default Organization;
