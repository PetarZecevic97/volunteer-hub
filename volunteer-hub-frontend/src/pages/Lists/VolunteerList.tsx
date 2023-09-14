/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useSelector } from 'react-redux';
import { connect } from "react-redux";
import { getVolunteerList } from "../../actions/volunteerActions";
import ListTemplate from "./ListTemplate";

const VolunteerList = ({ getVolunteerListAction }: any) => {
  const volunteerList = useSelector((state: any) => state.volunteers.volunteerList);

  useEffect(() => {
    getVolunteerListAction();
  }, []);

  const fields = ["firstName", "lastName", "skills"];
  const avatarName = "firstName";

  function createData({id, firstName, lastName, skills}: any) {
    const skillList = skills.join(", ");
    return {id, firstName, lastName, skills: skillList };
  }
  const volunteerListRows = volunteerList.map(x => createData(x));

  return (
    <>
      <ListTemplate entityName={"volunteer"} rows={volunteerListRows} fields={fields} avatarName={avatarName}/>
    </>
    );
};

const mapDispatchToProps = {
  getVolunteerListAction: getVolunteerList,
};

export default connect(null, mapDispatchToProps)(VolunteerList);
