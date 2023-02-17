import React from 'react';
import { Route, Routes } from "react-router-dom";
import Register from './components/authentication/Register';
import Login from './components/authentication/Login';
import Home from './components/home/Home';
import Request from './components/TheatreAdmin/Request';
import AddMovie from './components/admin/addMovie';
import Movie from './components/movie/Movie';
import Description from './components/movie/Description';
// import Description from './components/movieDescription/Description';

function App() {
  // const user = localStorage.getItem("userdatatoken");
  // console.log(user)

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="signin" element={<Register />}/>
        <Route path="dash" exact element={<Home />} />
        <Route path='/req' element={<Request />} />
        <Route path='/addmovie' element={<AddMovie />} />
        <Route path='/movies' element={<Movie />} />
        <Route path='/description/:id' element={<Description />} />
        {/* <Route path='description' element={<Description />} /> */}
      </Routes>
    </>
  );
}

export default App;
