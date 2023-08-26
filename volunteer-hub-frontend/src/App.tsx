import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import Profile from "./pages/Profile";
import UpdateProfileForm from "./pages/Forms/UpdateForms/UpdateProfileForm";
import Sidebar from "./components/Navbar/Sidebar";
import Home from "./pages/Home";
import About from "./pages/About";
import Signin from "./pages/Forms/SigninForm";
import Signup from "./pages/Forms/SignupForm";
import CreateOrganizationForm from "./pages/Forms/CreateForms/CreateOrganizationForm";
import CreateVolunteerForm from "./pages/Forms/CreateForms/CreateVolunteerForm";
import CreateAdForm from "./pages/Forms/CreateForms/CreateAdForm";
import UpdateAdForm from "./pages/Forms/UpdateForms/UpdateAdForm";
import Volunteer from "./pages/Volunteer";
import Organization from "./pages/Organization";
import Ad from "./pages/Ad";
import AdList from "./pages/Lists/AdList";
import DebugPanel from "./pages/DebugPanel";
import VolunteerList from "./pages/Lists/VolunteerList";
import OrganizationList from "./pages/Lists/OrganizationList";
import MainThemeProvider from "./components/Providers/MainThemeProvider";
import NotFoundPage from "./pages/NotFound";
import { CssBaseline } from "@mui/material";

function App() {
  return (
    <MainThemeProvider>
      <CssBaseline />
      <Router>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/events" element={<AdList />} />
          <Route path="/volunteers" element={<VolunteerList />} />
          <Route path="/volunteer/:volunteerId" element={<Volunteer />} />
          <Route path="/organizations" element={<OrganizationList />} />
          <Route
            path="/organization/:organizationId"
            element={<Organization />}
          />
          <Route path="/ad/:adId" element={<Ad />} />
          <Route path="/ads" element={<AdList />} />
          <Route path="/sign-in" element={<Signin />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/create-org-form" element={<CreateOrganizationForm />} />
          <Route
            path="/create-volunteer-form"
            element={<CreateVolunteerForm />}
          />
          <Route path="/create-ad-form" element={<CreateAdForm />} />
          <Route path="/update-ad-form/:adId" element={<UpdateAdForm />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/update-profile" element={<UpdateProfileForm />} />
          <Route path="/debug" element={<DebugPanel />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </MainThemeProvider>
  );
}

export default App;
