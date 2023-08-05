import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import CreateOrganizationForm from "./pages/CreateOrganizationForm";
import CreateVolunteerForm from "./pages/CreateVolunteerForm";
import CreateAdForm from "./pages/CreateAdForm";
import UpdateAdForm from "./pages/UpdateAdForm";
import Events from "./pages/Events";
import Volunteer from "./components/Profile/Volunteer";
import Organization from "./components/Profile/Organization";
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
        <Route path="/debug" element={<DebugPanel />} />
      </Routes>
    </Router>
  );
}

export default App;
