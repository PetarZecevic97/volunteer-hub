import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import React from 'react';
import logo from './logo.svg';
import Navbar from './components/Navbar/Navbar'
import Home from './components/pages/Home';
import About from './components/pages/About';
import Signin from './components/pages/Signin';
import Events from './components/pages/Events';
import Profile from './components/pages/Profile';


function App() {
  return (
      <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/events" element={<Events/>}/>
            <Route path="/sign-up" element={<Signin/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/sign-in" element={<Signin/>}/>
          </Routes>
      </Router>
  );
}

export default App;
