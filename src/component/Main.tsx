import React, { useState } from 'react'
import Login from './Login'
import Signup from './SignupDoctor'
import Header from './NewHeader' // Nhập Header
import Display from './Display'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; // Import Router and Route
import SignupPatient from './SignupPatient'


const Main = () => {


  return (
      <div className='flex flex-col'>
        <div className='flex justify-center items-center h-full bg-gray-500'>
          <Routes> 
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignupPatient />} />
            <Route path="/" element={<Display />} />
          </Routes>
        </div>
      </div>

  )
}

export default Main