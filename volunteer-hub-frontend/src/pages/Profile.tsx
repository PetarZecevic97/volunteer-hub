import React, { useState } from "react";
import IOrganization from "../Entities/Organization";
import Organization from "../components/Profile/Organization";
import Volunteer from "../components/Profile/Volunteer";

const Profile = () => {
  const role = sessionStorage.getItem('role');
  const nullableId = sessionStorage.getItem('id');
  const id = nullableId ? nullableId : '';
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

export default Profile;
