import React from 'react';
import { Route, Routes } from "react-router-dom";
import Register from './components/authentication/Register';
import Login from './components/authentication/Login';
import Home from './components/home/Home';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="signin" element={<Register />}/>
        <Route path="dash" element={<Home />} />
      </Routes>
      {/* <h1>Hello</h1> */}
    </>
  );
}

export default App;
