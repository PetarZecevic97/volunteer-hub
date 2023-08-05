import React, { useEffect,  } from "react";
import { useParams } from "react-router-dom";
import Avatar from "react-avatar";
import { useSelector, connect } from "react-redux";
import { NavLink as Link } from "react-router-dom";
import { Grid, PageContainer } from '../components/Profile/styles/ProfileSC';
import { getAd, deleteAd, createAdVolunteer, deleteAdVolunteer } from "../actions/adActions";
import {
  ButtonWrapper,
} from "../components/Login/styles/LoginSC";

const Ad = ({ getAdAction, deleteAdAction, createAdVolunteerAction, deleteAdVolunteerAction }: any) => {
  const ad = useSelector((state: any) => state.ads.ad);
  const state = useSelector((state: any) => state);
  const role = sessionStorage.getItem('role');
  const nullableId = sessionStorage.getItem('id');
  const { adId } = useParams();
  console.log("ljeks ", state);

  useEffect(() => {
      getAdAction(adId);
  }, [adId]);

  const applyForTheAd = () => {
    createAdVolunteerAction({adId: adId, volunteerId: nullableId});
  };

  const removeApplicationForTheAd = () => {
    deleteAdVolunteerAction(adId, nullableId);
  };

  const deleteTheAd = () => {
    deleteAdAction(adId);
  };
  	
  const renderButton = () => {
    if (role === "Volunteer") {
      const isUserApplied = (ad && ad.volunteers) ? ad.volunteers.filter(x => x.volunteerId === nullableId) : false;
      if (isUserApplied) {
        return <>
          <ButtonWrapper>
            <Link to="" onClick={removeApplicationForTheAd}>Remove your application? :c</Link>
          </ButtonWrapper>
      </>;
      } else {
        return <>
        <ButtonWrapper>
          <Link to="" onClick={applyForTheAd}>Apply!</Link>
        </ButtonWrapper>
        </>;

      }
    } else if (role === "Organization") {
      return <>
        <ButtonWrapper>
          <Link to="" >Check out who applied!</Link>
        </ButtonWrapper>

        <ButtonWrapper>
          <Link to="" onClick={deleteTheAd}>Delete this ad? :c</Link>
        </ButtonWrapper>

      </>;
    }
  }

  return (
    <>
      <PageContainer>
        <Grid>
          <Avatar size="50" round={true} name={ad == null || ad == undefined ? "" : ad.title} />

          <h1>Title: {ad == null || ad == undefined ? "" : ad.title}</h1>
          <p>Summary: {ad == null || ad == undefined ? "" : ad.summary}</p>
          { renderButton() }
        </Grid>

      </PageContainer>
    </>
  );
};

const mapDispatchToProps = {
  getAdAction: getAd,
  deleteAdAction: deleteAd,
  createAdVolunteerAction: createAdVolunteer,
  deleteAdVolunteerAction: deleteAdVolunteer,
};

export default connect(null, mapDispatchToProps)(Ad);