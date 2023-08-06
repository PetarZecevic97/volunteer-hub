import React, { useEffect } from "react";
import { connect } from "react-redux";

import UpdateOrganizationForm from "./UpdateOrganizationForm";
import UpdateVolunteerForm from "./UpdateVolunteerForm";
import { PageContainer } from '../components/Profile/styles/ProfileSC';
import { getProfileData } from "../actions/profileActions";

const UpdateProfileForm = ({ getProfileDataAction } : any) => {
  const role = sessionStorage.getItem('role');
  const nullableId = sessionStorage.getItem('id');
  const id = nullableId ? nullableId : '';

  useEffect(() => {
    if(id && role) {
      getProfileDataAction(id, role);
    }
  }, [role, id]);

  const renderOrganization = () => {
    return (
      <>
      <PageContainer>
        <UpdateOrganizationForm />
      </PageContainer>
      </>
    );
  };

  const renderVolunteer = () => {
    return (
      <>
      <PageContainer>
        <UpdateVolunteerForm />
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
  getProfileDataAction: getProfileData,
};

export default connect(null, mapDispatchToProps)(UpdateProfileForm);
