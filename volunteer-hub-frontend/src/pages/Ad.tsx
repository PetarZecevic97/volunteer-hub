import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Avatar from "react-avatar";
import { useSelector, connect } from "react-redux";
import { NavLink as Link } from "react-router-dom";
import {
  getAd,
  deleteAd,
  createAdVolunteer,
  deleteAdVolunteer,
} from "../actions/adActions";
import { Box, Button, Typography, Paper, Divider, Grid } from "@mui/material";
import { PageContainer } from "../components/Profile/styles/ProfileSC";

const Ad = ({
  getAdAction,
  deleteAdAction,
  createAdVolunteerAction,
  deleteAdVolunteerAction,
}: any) => {
  const ad = useSelector((state: any) => state.ads.ad);
  const state = useSelector((state: any) => state);
  const role = sessionStorage.getItem("role");
  const nullableId = sessionStorage.getItem("id");
  const { adId } = useParams();

  useEffect(() => {
    getAdAction(adId);
  }, [adId]);

  const printStatus = () => {
    return ad.isOpen
      ? "Open for application!"
      : "Sorry, organization closed applications for this ad :c";
  };

  const renderButtons = () => {
    if (role === "Volunteer" && ad && ad.isOpen) {
      const isUserApplied =
        ad && ad.volunteers
          ? ad.volunteers.filter((x) => x.volunteerId === nullableId).length > 0
          : false;
      if (isUserApplied) {
        return (
          <>
            <Button
              component={Link}
              to=""
              variant="contained"
              onClick={() => deleteAdVolunteerAction(adId, nullableId)}
              sx={{
                width: "100%",
                bgcolor: "#673ab7", // Light Purple color
                color: "#fff",
                "&:hover": {
                  bgcolor: "#512da8", // Darker Purple color on hover
                },
              }}
            >
              Remove your application? :c
            </Button>
          </>
        );
      } else {
        return (
          <>
            <Button
              component={Link}
              to=""
              variant="contained"
              onClick={() =>
                createAdVolunteerAction({
                  adId: adId,
                  volunteerId: nullableId,
                })
              }
              sx={{
                width: "100%",
                bgcolor: "#673ab7", // Light Purple color
                color: "#fff",
                "&:hover": {
                  bgcolor: "#512da8", // Darker Purple color on hover
                },
              }}
            >
              Apply!
            </Button>
          </>
        );
      }
    } else if (role === "Organization") {
      return (
        <>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <Button
              component={Link}
              to={"/update-ad-form/" + adId}
              variant="contained"
              sx={{
                bgcolor: "#673ab7", // Light Purple color
                color: "#fff",
                "&:hover": {
                  bgcolor: "#512da8", // Darker Purple color on hover
                },
              }}
            >
              Update this ad
            </Button>

            <Button
              component={Link}
              to=""
              variant="contained"
              sx={{
                bgcolor: "#673ab7", // Light Purple color
                color: "#fff",
                "&:hover": {
                  bgcolor: "#512da8", // Darker Purple color on hover
                },
              }}
            >
              Check out who applied!
            </Button>
            <Button
              component={Link}
              to="/profile"
              variant="contained"
              onClick={() => deleteAdAction(adId)}
              sx={{
                bgcolor: "#673ab7", // Light Purple color
                color: "#fff",
                "&:hover": {
                  bgcolor: "#512da8", // Darker Purple color on hover
                },
              }}
            >
              Delete this ad? :c
            </Button>
          </Box>
        </>
      );
    }
  };

  return (
    <>
      <PageContainer>
        <Paper
          elevation={3}
          sx={{
            padding: "20px",
            bgcolor: "#512da8", // Darker Purple background color
            width: "60%", // Set the width to 50% of the page
            margin: "0 auto", // Center the component horizontally
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={2}>
              <Avatar size="50" round={true} name={ad ? ad.title : ""} />
            </Grid>
            <Grid item xs={10}>
              <Typography variant="h4" sx={{ color: "#fff" }}>
                Title: {ad ? ad.title : ""}
              </Typography>
              <Typography variant="body1" sx={{ color: "#fff" }}>
                Summary: {ad ? ad.summary : ""}
              </Typography>
              <Typography variant="body1" sx={{ color: "#fff" }}>
                Skills necessary:{" "}
                {ad ? ad.skills.substring(1, ad.skills.length - 1) : ""}
              </Typography>
              <Typography variant="body1" sx={{ color: "#fff" }}>
                Location: {ad ? ad.location : ""}
              </Typography>
              <Typography variant="body1" sx={{ color: "#fff" }}>
                Status: {ad ? printStatus() : ""}
              </Typography>
            </Grid>
          </Grid>
          <Divider sx={{ my: 2, bgcolor: "#673ab7" }} /> {/* Purple divider */}
          {renderButtons()}
        </Paper>
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