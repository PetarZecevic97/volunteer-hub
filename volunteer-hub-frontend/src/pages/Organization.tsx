import React, { useState, useEffect,  } from "react";
import { useParams } from 'react-router-dom';
import Avatar from "react-avatar";
import { Grid, PageContainer } from "../components/Profile/styles/ProfileSC";
import IOrganization from "../Entities/Organization";
import { useSelector } from 'react-redux';
import { getOrganization } from "../actions/organizationActions";
import { connect } from "react-redux";

const Organization = ({ getOrganizationAction }: any) => {
  const myProfileOrganization = useSelector((state: any) => state.profileData.myProfile);
  const currentOrganization = useSelector((state: any) => state.organizations.organization);
  const { organizationId } = useParams();

  function chooseRightOrg() {
    return organizationId ? currentOrganization : myProfileOrganization;
  }
  const [rightOrganization, setRightOrganization] = useState(chooseRightOrg());

  useEffect(() => {
    if(organizationId && !currentOrganization) {
      getOrganizationAction(organizationId);
    }
    setRightOrganization(chooseRightOrg());
  }, [organizationId, currentOrganization, myProfileOrganization]);

  return (
    <>
      <PageContainer>
        <Grid>
          <Avatar size="50" round={true} name={rightOrganization ? rightOrganization.organizationName : ""} />

          <h1>Organization name: {rightOrganization ? rightOrganization.organizationName : ""}</h1>
          <p>Summary: {rightOrganization ? rightOrganization.summary : ""}</p>
        </Grid>
      </PageContainer>
    </>
  );
};

const mapDispatchToProps = {
  getOrganizationAction: getOrganization,
};

export default connect(null, mapDispatchToProps)(Organization);