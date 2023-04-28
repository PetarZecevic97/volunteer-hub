import React, { useState, useEffect,  } from "react";
import { useLocation, useParams } from 'react-router-dom';
import Avatar from "react-avatar";
import { Grid, PageContainer } from "./styles/ProfileStyles";
import getWebRequest from "../../webRequests/webRequestsProvider";
import IOrganization from "../../Entities/Organization";
import { WebRequestsInterface } from "../../webRequests/webRequests-int";

const Organization = () => {
  const userService: WebRequestsInterface = getWebRequest();
  const [organizationData, setOrganizationData] = useState<IOrganization>();
  const { organizationId } = useParams();

  async function fetchOrganization() {
    if(organizationId) {
      const org = await userService.getOrganizationById(organizationId);
      setOrganizationData(org);
    } else {
      const orgStr = sessionStorage.getItem('myOrganization');
      const org = JSON.parse(orgStr ? orgStr : '{}');
      setOrganizationData(org);
    }
  }
  useEffect(() => {
    fetchOrganization();
  }, [organizationId]);

  return (
    <>
      <PageContainer>
        <Grid>
          <Avatar size="50" round={true} name={organizationData == null || organizationData == undefined ? "" : organizationData.organizationName} />

          <h1>Organization name: {organizationData == null || organizationData == undefined ? "" : organizationData.organizationName}</h1>
          <p>Summary: {organizationData == null || organizationData == undefined ? "" : organizationData.summary}</p>
        </Grid>
      </PageContainer>
    </>
  );
};

export default Organization;
