import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './views/home/home.component';
import Profile from './views/profile/profile.component';
import Login from './views/login/login.component';
import Registro from './views/login/registro.component'; 

import './App.css';
import Questions from './views/questions/Questions';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/registro" element={<Registro />} />
      </Routes>
    </div>
  );
}

export default App;
