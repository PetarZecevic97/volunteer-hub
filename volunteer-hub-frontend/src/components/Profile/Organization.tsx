import React, { useState, useEffect,  } from "react";
import { useParams } from 'react-router-dom';
import Avatar from "react-avatar";
import { Grid, PageContainer } from "./styles/ProfileSC";
import IOrganization from "../../Entities/Organization";
import { useSelector } from 'react-redux';
import { getOrganization } from "../../actions/organizationActions";
import { connect } from "react-redux";

const Organization = ({ getOrganizationAction }: any) => {
  const myProfileOrganization = useSelector((state: any) => state.profileData.myProfile);
  const organization = useSelector((state: any) => state.organizations.organization);
  const { organizationId } = useParams();

function chooseRightOrg() {
  return organizationId ? organization : myProfileOrganization;
}

  useEffect(() => {
    if(organizationId) {
      getOrganizationAction(organizationId);
    }
  }, [organizationId]);

  return (
    <>
      <PageContainer>
        <Grid>
          <Avatar size="50" round={true} name={chooseRightOrg() == null || chooseRightOrg() == undefined ? "" : chooseRightOrg().organizationName} />

          <h1>Organization name: {chooseRightOrg() == null || chooseRightOrg() == undefined ? "" : chooseRightOrg().organizationName}</h1>
          <p>Summary: {chooseRightOrg() == null || chooseRightOrg() == undefined ? "" : chooseRightOrg().summary}</p>
        </Grid>
      </PageContainer>
    </>
  );
};

const mapDispatchToProps = {
  getOrganizationAction: getOrganization,
};

export default connect(null, mapDispatchToProps)(Organization);