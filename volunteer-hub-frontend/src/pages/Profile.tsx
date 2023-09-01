import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { NavLink as Link } from "react-router-dom";

import Organization from "./Organization";
import Volunteer from "./Volunteer";
import { PageContainer } from '../components/Profile/styles/ProfileSC';
import { ButtonWrapper } from "../components/Login/styles/LoginSC";
import { getProfileData } from "../actions/profileActions";
import { nullifyCurrentAd } from "../actions/adActions";
import DebugPanel from "./DebugPanel";
import { Box, Button, CssBaseline } from "@mui/material";

const Profile = ({ getProfileDataAction, nullifyCurrentAdAction } : any) => {
  const role = sessionStorage.getItem('role');
  const nullableId = sessionStorage.getItem('id');
  const id = nullableId ? nullableId : '';

  useEffect(() => {
    if(id && role) {
      getProfileDataAction(id, role);
    }
  }, [role, id]);
  

  const renderButtons = () => {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: '16px', // Add gap between buttons
        }}
      >
        <Button
          component={Link}
          to="/ad"
          variant="contained"
          sx={{
            width: '250px', // Set button width
          }}
        >
          Go checkout ads! c:
        </Button>
  
        <Button
          component={Link}
          to="/update-profile"
          variant="contained"
          sx={{
            width: '250px', 
          }}
        >
          Update your profile info?
        </Button>
  
        {role === 'Organization' && (
          <Button
            component={Link}
            to="/create-ad-form"
            variant="contained"
            onClick={() => nullifyCurrentAdAction()}
            sx={{
              width: '250px', // Set button width
            }}
          >
            Create new ad? C:
          </Button>
        )}
      </Box>
    );
  };
  const renderOrganization = () => {
    return (
      <>
      <PageContainer>
        <Organization />
        {renderButtons()}
      </PageContainer>

      </>
    );
  };

  const renderVolunteer = () => {
    return (
      <>
      <PageContainer>
        <Volunteer />
        {renderButtons()}
      </PageContainer>

      </>
    );
  };

  const renderAdmin = () => {
    return (
      <>
      <PageContainer>
        <DebugPanel />
      </PageContainer>

      </>
    );
  };

  const error = (msg: string) => {
    return (
      <>
        <p>{msg}</p>
      </>
    );
  }

  const isOrganization = role === "Organization";
  const isAdmin = role === "Administrator";
  const isVolunteer = role === "Volunteer";
  console.log(role);

  if (isOrganization) {
    return renderOrganization();
  } else if (isVolunteer){
    return renderVolunteer();
  } else if (isAdmin) {
    return renderAdmin();
  } else if (!id) {
    return error('Not logged in');
  } else  {
    return error('Not permitted role');
  } 
};

const mapDispatchToProps = {
  getProfileDataAction: getProfileData,
  nullifyCurrentAdAction: nullifyCurrentAd,
};

export default connect(null, mapDispatchToProps)(Profile);
