import React, { useState } from "react";
import IOrganization from "../Entities/Organization";
import Organization from "../components/Profile/Organization";
import Volunteer from "../components/Profile/Volunteer";
import IVolunteer from "../Entities/Volunteer";

interface ProfileProps {
  p_id: string;
  p_role: string;
}

const Profile = ({ p_id, p_role }: ProfileProps) => {
  var mOrganization: IOrganization;
  var mVolunteer: IVolunteer;

  const renderOrganization = (pid: string) => {
    return (
      <>
        <Organization id={pid} />
      </>
    );
  };

  const renderVolunteer = (pid: string) => {
    return (
      <>
        <Volunteer id={pid} />
      </>
    );
  };

  const isOrganization = p_role === "organization";
  if (isOrganization) {
    return renderOrganization(p_id);
  } else {
    return renderVolunteer(p_id);
  }
};

export default Profile;
