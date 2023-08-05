import React, { useEffect,  } from "react";
import { useParams } from "react-router-dom";
import Avatar from "react-avatar";
import { Grid, PageContainer } from '../components/Profile/styles/ProfileSC';
import { useSelector } from "react-redux";
import { getAd } from "../actions/adActions";
import { connect } from "react-redux";

const Ad = ({ getAdAction }: any) => {
  const ad = useSelector((state: any) => state.ads.ad);
  const state = useSelector((state: any) => state);
  const { adId } = useParams();
  console.log("Ljeks ", state);

  useEffect(() => {
      getAdAction(adId);
  }, [adId]);

  return (
    <>
      <PageContainer>
        <Grid>
          <Avatar size="50" round={true} name={ad == null || ad == undefined ? "" : ad.title} />

          <h1>Title: {ad == null || ad == undefined ? "" : ad.title}</h1>
          <p>Summary: {ad == null || ad == undefined ? "" : ad.summary}</p>
        </Grid>
      </PageContainer>
    </>
  );
};

const mapDispatchToProps = {
  getAdAction: getAd,
};

export default connect(null, mapDispatchToProps)(Ad);