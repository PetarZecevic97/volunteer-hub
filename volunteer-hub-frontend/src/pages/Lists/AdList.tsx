import React, { useEffect } from "react";
import { useSelector } from 'react-redux';
import { connect } from "react-redux";
import { getAdList } from "../../actions/adActions";
import ListTemplate from "./ListTemplate";

const AdList = ({ getAdListAction }: any) => {
  const adList = useSelector((state: any) => state.ads.adList);

  useEffect(() => {
    getAdListAction();
  }, []);

  const fields = ["title", "summary", "skills", "location", "status"];
  const avatarName = "title";

  function createData({title, summary, skills, location, isOpen}: any) {
    const status = isOpen ? "Open for applications!" : "Sorry the ad is no longer open for application :c";
    return { title, summary, skills: skills, location, status: status};
  }
  const adListRows = adList.map(x => createData(x));
  console.log("ljeks ", adListRows);

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
