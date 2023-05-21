import React, { useState, useEffect,  } from "react";
import { useParams } from 'react-router-dom';
import Avatar from "react-avatar";
import { Grid, PageContainer } from "./styles/ProfileStyles";
import IOrganization from "../../Entities/Organization";
import { useSelector } from 'react-redux';
import { getOrganization } from "../../actions/organizationActions";
import { connect } from "react-redux";

const Organization = ({ getOrganizationAction }: any) => {
  const [organizationData, setOrganizationData] = useState<IOrganization>();
  const myProfileOrganization = useSelector((state: any) => state.profileData.myProfile);
  const organization = useSelector((state: any) => state.organizations.myOrganization);
  const { organizationId } = useParams();

function setRightOrg() {
  const org = organizationId ? organization : myProfileOrganization;
  setOrganizationData(org);
}

  useEffect(() => {
    setRightOrg();
  }, [myProfileOrganization, organizationId]);

  useEffect(() => {
    if(organizationId) {
      getOrganizationAction(organizationId);
    }
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

const mapDispatchToProps = {
  getOrganizationAction: getOrganization,
};

export default connect(null, mapDispatchToProps)(Organization);