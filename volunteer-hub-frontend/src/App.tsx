import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Events from "./pages/Events";
import Volunteer from "./components/Profile/Volunteer";
import Organization from "./components/Profile/Organization";

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
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
