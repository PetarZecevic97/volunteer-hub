import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import React from 'react';
import logo from './logo.svg';
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home';
import About from './pages/About';
import Signin from './pages/Signin';
import Events from './pages/Events';
import Volunteer from './components/Profile/Volunteer';


function App() {
  return (
      <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/events" element={<Events/>}/>
            <Route path="/sign-up" element={<Signin/>}/>
            <Route path="/volunteer" element={<Volunteer id={"1"}/>}/>
            <Route path="/sign-in" element={<Signin/>}/>
          </Routes>
      </Router>
  );
}

export default App;
