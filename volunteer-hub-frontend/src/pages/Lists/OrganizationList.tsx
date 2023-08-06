import React, { useEffect } from "react";
import { useSelector } from 'react-redux';
import { connect } from "react-redux";
import { getOrganizationList } from "../../actions/organizationActions";
import ListTemplate from "./ListTemplate";

const OrganizationList = ({ getOrganizationListAction }: any) => {
  const organizationList = useSelector((state: any) => state.organizations.organizationList);

  useEffect(() => {
    getOrganizationListAction();
  }, []);

  const fields = ["organizationName", "summary"];
  const avatarName = "organizationName";

  function createData({organizationName, summary}: any) {
    return { organizationName, summary };
  }
  const organizationListRows = organizationList.map(x => createData(x));

  return (
    <>
      <ListTemplate rows={organizationListRows} fields={fields} avatarName={avatarName}/>
    </>
    );
};

const mapDispatchToProps = {
  getOrganizationListAction: getOrganizationList,
};

export default connect(null, mapDispatchToProps)(OrganizationList);
