import React, { useState } from 'react'
import Login from './Login'
import Signup from './SignupDoctor'
import Header from './NewHeader' // Nhập Header
import Display from './Display'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; // Import Router and Route
import SignupPatient from './SignupPatient'
import ProfilePatient from './ProfilePatient'


const Main = () => {


  return (
      <div className='flex flex-col'>
        <div className='flex justify-center items-center h-full bg-gray-500'>
          <Routes> 
            <Route path="/login" element={<Login onLogedInClick={() => console.log('Login clicked')}/>} />
            <Route path="/signup" element={<SignupPatient />} />
            <Route path="/" element={<Display />} />
            <Route path='/profilepatient' element = {<ProfilePatient/>} />
          </Routes>
        </div>
      </div>

  )
}

export default Main