import React, { useState } from 'react'
import Login from './Login'
import Signup from './Signup'
import Header from './NewHeader' // Nhập Header

const Main = () => {
  const [isLogin, setIsLogin] = useState(true); // Trạng thái để theo dõi chế độ hiển thị

  const handleLoginClick = () => setIsLogin(true); // Hàm để hiển thị Login
  const handleSignUpClick = () => setIsLogin(false); // Hàm để hiển thị Signup

  return (
    <div className='flex flex-col'>
      <Header onLoginClick={handleLoginClick} onSignUpClick={handleSignUpClick} /> {/* Truyền các hàm vào Header */}
      <div className='flex justify-center items-center h-full bg-gray-500'>
        {isLogin ? <Login /> : <Signup />} {/* Hiển thị Login hoặc Signup */}
      </div>
    </div>
  )
}

export default Main