import React, { useEffect } from "react";
import { useSelector } from 'react-redux';
import { connect } from "react-redux";
import { getOrganizationList } from "../../actions/organizationActions";
import ListTemplate from "./ListTemplate";

const OrganizationList = ({ getOrganizationListAction }: any) => {
  const organizationList = useSelector((state: any) => state.organizations.organizationList);

  useEffect(() => {
    getOrganizationListAction();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fields = ["organizationName", "summary"];
  const avatarName = "organizationName";

  function createData({id, organizationName, summary}: any) {
    return {id, organizationName, summary };
  }
  const organizationListRows = organizationList.map((x: any) => createData(x));

  return (
    <>
      <ListTemplate entityName={"organization"} rows={organizationListRows} fields={fields} avatarName={avatarName}/>
    </>
    );
};

const mapDispatchToProps = {
  getOrganizationListAction: getOrganizationList,
};

export default connect(null, mapDispatchToProps)(OrganizationList);
