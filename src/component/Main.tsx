import React, { useState } from 'react'
import Login from './Login'
import Signup from './Signup'
import Header from './NewHeader' // Nhập Header
import Display from './Display'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Router and Route


const Main = () => {
  const [isLogin, setIsLogin] = useState(true); // Trạng thái để theo dõi chế độ hiển thị

  const handleLoginClick = () => {
    setIsLogin(true); // Hàm để hiển thị Login
    // Thêm điều hướng đến trang đăng nhập
    window.location.href = '/login';
  }; 
  const handleSignUpClick = () => {
    setIsLogin(false); // Hàm để hiển thị Signup
    // Thêm điều hướng đến trang đăng ký
    window.location.href = '/signup';
  }; 
  const handleHomeClick = () => {
    window.location.href = '/';
  };  

  return (
    <Router> {/* Wrap the return with Router */}
      <div className='flex flex-col'>
        <Header onLoginClick={handleLoginClick} onSignUpClick={handleSignUpClick} onHomeClick={handleHomeClick} />
        <div className='flex justify-center items-center h-full bg-gray-500'>
          <Routes> 
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Display />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default Main