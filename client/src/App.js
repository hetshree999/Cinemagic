import React from 'react';
import { Route, Routes } from "react-router-dom";
import Register from './components/authentication/Register';
import Login from './components/authentication/Login';
import Home from './components/home/Home';
import Description from './components/movieDescription/Description';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="signin" element={<Register />}/>
        <Route path="dash" element={<Home />} />
        <Route path='description' element={<Description />} />
      </Routes>
    </>
  );
}

export default App;
