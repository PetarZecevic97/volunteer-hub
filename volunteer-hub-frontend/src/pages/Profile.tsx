import React, { useState } from "react";
import IOrganization from "../Entities/Organization";
import Organization from "../components/Profile/Organization";
import Volunteer from "../components/Profile/Volunteer";
import IVolunteer from "../Entities/Volunteer";

const Profile = () => {
  var mOrganization: IOrganization;
  var mVolunteer: IVolunteer;
  const role = sessionStorage.getItem('role');
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

  const error = () => {
    return (
      <>
        <p>User not logged in</p>
      </>
    );
  }

  const isOrganization = role === "Organization";
  const isVolunteer = role === "Volunteer";

  if (isOrganization) {
    return renderOrganization();
  } else if (isVolunteer){
    return renderVolunteer();
  } else {
    return error();
  }
};

export default Profile;
