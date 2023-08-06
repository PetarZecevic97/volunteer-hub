import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { connect } from "react-redux";
import { getAdList } from "../../actions/adActions";
import ListTemplate from "./ListTemplate";

const AdList = ({ getAdListAction }: any) => {

  const fields = ["title", "summary", "skills", "location", "status"];
  const avatarName = "title";

  const createData = ({title, summary, skills, location, isOpen}: any) => {
    const status = isOpen ? "Open for applications!" : "Sorry the ad is no longer open for application :c";
    return { title, summary, skills: skills, location, status: status};
  };
  
  const adList = useSelector((state: any) => state.ads.adList);
  const [adListRows, setAdListRows] = useState(adList.map(x => createData(x)));

  useEffect(() => {
    getAdListAction();
  }, []);

  useEffect(() => {
    setAdListRows(adList.map(x => createData(x)))
  }, [adList]);

  return (
    <>
      <ListTemplate rows={adListRows} fields={fields} avatarName={avatarName}/>
    </>
    );
};

const mapDispatchToProps = {
  getAdListAction: getAdList,
};

export default connect(null, mapDispatchToProps)(AdList);
