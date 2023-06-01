import React, { useEffect } from 'react';
import { Route, Routes } from "react-router-dom";
import Register from './components/authentication/Register';
import Login from './components/authentication/Login';
import Home from './components/home/Home';
import Request from './components/TheatreAdmin/Request';
import AddMovie from './components/admin/addMovie';
import Movie from './components/movie/Movie';
import Description from './components/movie/Description';
import AddShow from './components/TheatreAdmin/AddShow';
import Tlogin from './components/TheatreAdmin/Tlogin';
import AdminHome from './components/admin/adminHome';
import Thome from './components/TheatreAdmin/Thome';
import Error from './components/error/Error';
import BookNow from './components/booknow/BookNow';
import Shows from './components/shows/Shows';
import AdminDash from './components/admin/AdminDash';
import Book from './components/booknow/Book';
import Payment from './components/payment/Payment';
import Profile from './components/authentication/Profile';
import History from './components/authentication/history';
import FinalPay from './components/payment/FinalPay';
import UpdateMovie from './components/admin/updateMovie';
import Customer from './components/admin/Customer';

function App() {
  useEffect(() => {
    document.title = 'Cinemagic';
  })
  // const user = localStorage.getItem("userdatatoken");
  // console.log(user)

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="signin" element={<Register />}/>
        <Route path="home" exact element={<Home />} />
        <Route path='/req' element={<Request />} />
        <Route path='/addmovie' element={<AddMovie />} />
        <Route path='/movies' element={<Movie />} />
        <Route path='/description/:id' element={<Description />} />
        <Route path='/addShow' element={<AddShow />} />
        <Route path='/tlogin' element={<Tlogin />} />
        <Route path='/admin' element={<AdminHome />} />
        <Route path='/thome' element={<Thome />} />
        <Route path='/book/:name/:theatre/:time/:seat' element={<BookNow />} />
        <Route path='/shows/:name' element={<Shows />} />
        <Route path='/adminDash' element={<AdminDash />} />
        <Route path='/adminHome' element={<AdminHome />} />
        <Route path='/seat' element={<Book />} />
        <Route path='/pay' element={<Payment />} />
        <Route path='/finalpay' element={<FinalPay />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/history' element={<History />} />
        <Route path='/updateMovie/:id' element={<UpdateMovie />} />
        <Route path='/users' element={<Customer />} />
        <Route path="*" element={<Error />} />
        {/* <Route path='description' element={<Description />} /> */}
      </Routes>
    </>
  );
}

export default App;
