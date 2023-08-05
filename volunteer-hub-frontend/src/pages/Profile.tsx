import React, { useEffect } from "react";
import { connect } from "react-redux";
import { NavLink as Link } from "react-router-dom";

import Organization from "../components/Profile/Organization";
import Volunteer from "../components/Profile/Volunteer";
import { PageContainer } from '../components/Profile/styles/ProfileSC';
import { ButtonWrapper } from "../components/Login/styles/LoginSC";
import { getProfileData } from "../actions/profileActions";

const Profile = ({ getProfileDataAction } : any) => {
  const role = sessionStorage.getItem('role');
  const nullableId = sessionStorage.getItem('id');
  const id = nullableId ? nullableId : '';

  useEffect(() => {
    if(id && role) {
      getProfileDataAction(id, role);
    }
  }, [role, id]);
  const renderButton = () => {
    return <>
        <ButtonWrapper>
          <Link to="/ad" >Go checkout ads! c:</Link>
        </ButtonWrapper>

        { role === "Organization" && <ButtonWrapper>
          <Link to="/create-ad-form" >Create new ad? C:</Link>
        </ButtonWrapper> }
      </>;
  }

  const renderOrganization = () => {
    return (
      <>
      <PageContainer>
        <Organization />
        {renderButton()}
      </PageContainer>

      </>
    );
  };

  const renderVolunteer = () => {
    return (
      <>
      <PageContainer>
        <Volunteer />
        {renderButton()}
      </PageContainer>

      </>
    );
  };

  const error = (msg: string) => {
    return (
      <>
        <p>{msg}</p>
      </>
    );
  }

  const isOrganization = role === "Organization";
  const isVolunteer = role === "Volunteer";

  if (isOrganization) {
    return renderOrganization();
  } else if (isVolunteer){
    return renderVolunteer();
  } else if (!id) {
    return error('Not logged in');
  }  else  {
    return error('Not permitted role');
  } 
};

const mapDispatchToProps = {
  getProfileDataAction: getProfileData
};

export default connect(null, mapDispatchToProps)(Profile);
