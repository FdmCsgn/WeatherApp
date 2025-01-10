// src/App.js
import React, { useState } from 'react'; 
import './App.css';
import { BackgroundLayout, HistoricalData, HistoricalData2, HistoricalDataMonth, HistoricalDataMonth2, HistoricalData3, HistoricalDataMonth3, Map, BasicMenu, SignUp, WeatherApp, ForgotPass, ResetPassword, LogOut,HomePage, Login } from './Components/';
import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import Season from './assets/icons/season.png';
import { Flex, Box, Heading, FormControl, Input } from "@chakra-ui/react";
import { AuthProvider, useAuth } from './Components/AuthContext'; // AuthProvider ve useAuth'u içe aktarın

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/" />;
};

function App() {
  return (
    <AuthProvider>
      <div className='w-full h-screen text-white px-8'>
        <nav className='w-full p-3 flex justify-between items-center nav-color mt-5'>
          <div className='nav-container flex items-center'>
            <img src={Season} alt="Season" className='w-[4rem]' />
            <Link to='/WeatherApp'>
              <h1 className='font-bold tracking-wide text-[3rem] text-weatherapp ml-3'>Weather App</h1>
            </Link>
          </div>
          <div><BasicMenu /></div>
        </nav>
        <BackgroundLayout />
        <Routes>
          <Route path='/' element={<Login/>} />
          <Route path='/HistoricalData' element={<PrivateRoute><HistoricalData /></PrivateRoute>} />
          <Route path='/HistoricalData2' element={<PrivateRoute><HistoricalData2 /></PrivateRoute>} />
          <Route path='/HistoricalDataMonth' element={<PrivateRoute><HistoricalDataMonth /></PrivateRoute>} />
          <Route path='/HistoricalDataMonth2' element={<PrivateRoute><HistoricalDataMonth2 /></PrivateRoute>} />
          <Route path='/HistoricalData3' element={<PrivateRoute><HistoricalData3 /></PrivateRoute>} />
          <Route path='/HistoricalDataMonth3' element={<PrivateRoute><HistoricalDataMonth3 /></PrivateRoute>} />
          <Route path='/Map' element={<PrivateRoute><Map /></PrivateRoute>} />
          <Route path='/WeatherApp' element={<PrivateRoute><WeatherApp /></PrivateRoute>} />
          <Route path='/SignUp' element={<SignUp />} />
          <Route path='/ForgotPass' element={<ForgotPass />} />
          <Route path="/ResetPassword" element={<ResetPassword />} />
          <Route path="/LogOut" element={<PrivateRoute><LogOut /></PrivateRoute>} />
          <Route path="/HomePage" element={<HomePage />} />
          <Route path="/Login" element={<Login />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
