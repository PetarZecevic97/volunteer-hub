import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import Profile from './pages/Profile';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Signin from './pages/Signin';
import Events from './pages/Events';
import Volunteer from './components/Profile/Volunteer';
import Organization from './components/Profile/Organization';


function App() {

  var props = {
    p_id: "1",
    p_role: "volunteer",
  }

  return (
      <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/events" element={<Events/>}/>
            <Route path="/volunteer" element={<Volunteer id={"1"}/>}/>
            <Route path="/organization" element={<Organization id={"1"}/>}/>
            <Route path="/sign-in" element={<Signin/>}/>
            <Route path="/profile" element={<Profile {...props} />}/>
          </Routes>
      </Router>
  );
}

export default App;
