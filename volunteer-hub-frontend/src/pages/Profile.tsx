import React, { useEffect } from "react";
import Organization from "../components/Profile/Organization";
import Volunteer from "../components/Profile/Volunteer";
import { getProfileData } from "../actions/profileActions";
import { connect } from "react-redux";

const Profile = ({ getProfileDataAction } : any) => {
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
        <Organization />
      </>
    );
  };

  const renderVolunteer = () => {
    return (
      <>
        <Volunteer />
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
