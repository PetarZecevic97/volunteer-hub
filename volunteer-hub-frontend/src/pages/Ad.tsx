import React, { useEffect,  } from "react";
import { useParams } from "react-router-dom";
import Avatar from "react-avatar";
import { useSelector, connect } from "react-redux";
import { NavLink as Link } from "react-router-dom";
import { Grid, PageContainer } from '../components/Profile/styles/ProfileSC';
import { getAd, deleteAd, createAdVolunteer, deleteAdVolunteer } from "../actions/adActions";
import { ButtonWrapper } from "../components/Login/styles/LoginSC";

const Ad = ({ getAdAction, deleteAdAction, createAdVolunteerAction, deleteAdVolunteerAction }: any) => {
  const ad = useSelector((state: any) => state.ads.ad);
  const state = useSelector((state: any) => state);
  const role = sessionStorage.getItem('role');
  const nullableId = sessionStorage.getItem('id');
  const { adId } = useParams();

  useEffect(() => {
      getAdAction(adId);
  }, [adId]);

  const printStatus = () => {
    return ad.isOpen ? "Open for apllication!" : "Sorry, organization closed applications for this ad :c"
  };
  	
  const renderButtons = () => {
    if (role === "Volunteer" && ad && ad.isOpen) {
      const isUserApplied = (ad && ad.volunteers) ? ad.volunteers.filter(x => x.volunteerId === nullableId).length > 0 : false;
      if (isUserApplied) {
        return <>
          <ButtonWrapper>
            <Link to="" onClick={() => deleteAdVolunteerAction(adId, nullableId)}>Remove your application? :c</Link>
          </ButtonWrapper>
      </>;
      } else {
        return <>
        <ButtonWrapper>
          <Link to="" onClick={() => createAdVolunteerAction({adId: adId, volunteerId: nullableId})}>Apply!</Link>
        </ButtonWrapper>
        </>;

      }
    } else if (role === "Organization") {
      return <>

      <ButtonWrapper>
        <Link to={"/update-ad-form/"+adId} >Update this ad</Link>
      </ButtonWrapper>

        <ButtonWrapper>
          <Link to="" >Check out who applied!</Link>
        </ButtonWrapper>

        <ButtonWrapper>
          <Link to="/profile" onClick={() => deleteAdAction(adId)}>Delete this ad? :c</Link>
        </ButtonWrapper>

      </>;
    }
  }

  return (
    <>
      <PageContainer>
        <Grid>
          <Avatar size="50" round={true} name={ad ? ad.title : ""} />

          <h1>Title: {ad ? ad.title : ""}</h1>
          <p>Summary: {ad ? ad.summary : ""}</p>
          <p>Skills necessary: {ad ? ad.skills.substring(1, ad.skills.length-1) : ""}</p>
          <p>Location: {ad ? ad.location : ""}</p>
          <p>Status: {ad ? printStatus() : ""}</p>

          { renderButtons() }
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