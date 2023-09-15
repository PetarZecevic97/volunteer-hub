import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import Organization from "./Organization";
import Volunteer from "./Volunteer";
import DebugPanel from "./DebugPanel";
import { PageContainer } from "../components/Profile/styles/ProfileSC";
import { getProfileData } from "../actions/profileActions";
import { nullifyCurrentAd } from "../actions/adActions";

const Profile = ({ getProfileDataAction, nullifyCurrentAdAction, role, id }: any) => {
  useEffect(() => {
    if (id && role) {
      getProfileDataAction(id, role);
    }
  }, [role, id]);

  const renderButtons = () => (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: "16px",
      }}
    >
      <Button
        component={Link}
        to="/events"
        variant="contained"
        sx={{
          width: "250px",
        }}
      >
        Go checkout ads! c:
      </Button>

      <Button
        component={Link}
        to="/update-profile"
        variant="contained"
        sx={{
          width: "250px",
        }}
      >
        Update your profile info?
      </Button>

      {role === "Organization" && (
        <Button
          component={Link}
          to="/create-ad-form"
          variant="contained"
          onClick={() => nullifyCurrentAdAction()}
          sx={{
            width: "250px",
          }}
        >
          Create new ad? C:
        </Button>
      )}
    </Box>
  );

  const renderContent = (component: React.ReactNode) => (
    <PageContainer>
      <div style={{ maxHeight: "800px" }}>{component}</div>
      {renderButtons()}
    </PageContainer>
  );

  const error = (msg: string) => <p>{msg}</p>;

  if (role === "Organization") {
    return renderContent(<Organization />);
  } else if (role === "Volunteer") {
    return renderContent(<Volunteer />);
  } else if (role === "Administrator") {
    return renderContent(<DebugPanel />);
  } else if (!id) {
    return error("Not logged in");
  } else {
    return error("Not permitted role");
  }
};

const mapStateToProps = (state: any) => ({
  role: sessionStorage.getItem("role"),
  id: sessionStorage.getItem("id") || "",
});

const mapDispatchToProps = {
  getProfileDataAction: getProfileData,
  nullifyCurrentAdAction: nullifyCurrentAd,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
