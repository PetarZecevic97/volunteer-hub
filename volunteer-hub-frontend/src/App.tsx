import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import Profile from "./pages/Profile";
import UpdateProfileForm from "./pages/Forms/UpdateForms/UpdateProfileForm";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Signin from "./pages/Forms/SigninForm";
import Signup from "./pages/Forms/SignupForm";
import CreateOrganizationForm from "./pages/Forms/CreateForms/CreateOrganizationForm";
import CreateVolunteerForm from "./pages/Forms/CreateForms/CreateVolunteerForm";
import CreateAdForm from "./pages/Forms/CreateForms/CreateAdForm";
import UpdateAdForm from "./pages/Forms/UpdateForms/UpdateAdForm";
import Events from "./pages/Events";
import Volunteer from "./pages/Volunteer";
import Organization from "./pages/Organization";
import Ad from "./pages/Ad";
import DebugPanel from "./pages/DebugPanel";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/events" element={<Events />} />
        <Route path="/volunteer/:volunteerId" element={<Volunteer />} />
        <Route path="/organization/:organizationId" element={<Organization />} />
        <Route path="/ad/:adId" element={<Ad />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/create-org-form" element={<CreateOrganizationForm />} />
        <Route path="/create-volunteer-form" element={<CreateVolunteerForm />} />
        <Route path="/create-ad-form" element={<CreateAdForm />} />
        <Route path="/update-ad-form/:adId" element={<UpdateAdForm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/update-profile" element={<UpdateProfileForm />} />
        <Route path="/debug" element={<DebugPanel />} />
      </Routes>
    </Router>
  );
}

export default App;
