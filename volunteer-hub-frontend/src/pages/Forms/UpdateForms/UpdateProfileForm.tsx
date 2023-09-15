import React from "react";
import { connect } from "react-redux";

import UpdateOrganizationForm from "./UpdateOrganizationForm";
import UpdateVolunteerForm from "./UpdateVolunteerForm";
import { PageContainer } from '../../../components/Profile/styles/ProfileSC';

const UpdateProfileForm = () => {
  const role = sessionStorage.getItem('role');
  const nullableId = sessionStorage.getItem('id');
  const id = nullableId ? nullableId : '';

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

export default connect(null, null)(UpdateProfileForm);
