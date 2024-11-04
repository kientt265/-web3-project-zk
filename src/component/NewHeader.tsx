import React from 'react'
import utils from "../lib/utils"
import { useAccount } from 'wagmi'
import { useAppKit } from '@reown/appkit/react'
import { useNavigate, Link, BrowserRouter as Router, Route, Routes } from "react-router-dom";

interface HeaderProps {
  onLoginClick: () => void;
  onSignUpClick: () => void;
  onHomeClick: () => void;
}
//{ onLoginClick, onSignUpClick, onHomeClick }
const Header: React.FC<HeaderProps> = () => {
    
    const { open } = useAppKit()
    const { address, isDisconnected } = useAccount()
    const navigate = useNavigate();
    const onLoginClick = () => {
        navigate("/login");
    }
    const onSignUpClick = () => {
        navigate("/signup");
    }
    const onHomeClick = () => {
        navigate("/")
    }
    const onDiagnoseClick =() => {
        navigate("/")
    }
    const onLogOutClick =() => {
        navigate("/")
    }

    
    return (
        <div className='fixed top-0 left-0 w-full z-50 bg-slate-200'>
            <div className='flex bg-white-300 p-3 items-center'>
                <div className='flex gap-1 w-[20%] ml-5 cursor-pointer' onClick={onHomeClick}>
                    <h1 className='font-bold text-blue-700'>Fantasy</h1>
                    <h1 className='font-bold'>HOSPITAL</h1>
                </div>
                <div className='flex justify-center gap-7 w-[60%] text-[80%] '>
                    <a href="#" className='font-bold'>Home</a>
                    <Link to="profilepatient">Patient Information</Link>
                    <a href="#">Doctor's Insights</a>
                    <a href="#">About Us</a>
                </div>
                <Routes>
                    <Route path="/" element={
                        <div className='flex justify-around items-center w-[25%]'>
                            <p className='font-bold cursor-pointer bg-[#FFFFFF] rounded p-2 ' onClick={onLoginClick}>Log In</p>
                            <div>
                            <p className='font-bold bg-[#525FE1] rounded p-2 cursor-pointer' onClick={onSignUpClick}>Sign Up</p>
                            </div>
                            <button onClick={() => open()} className='bg-blue-600 mx-3 p-3 rounded-md'>{!isDisconnected ? `${utils(address)}` : "Connect Wallet"}</button>
                        </div>}>
                        
                    </Route>
                    <Route path="/logedin" element={
                        <div className='flex justify-around items-center w-[25%]'>
                            <p className='font-bold cursor-pointer bg-[#FFFFFF] rounded p-2 ' onClick={onDiagnoseClick}>Diagnose</p>
                            <div>
                            <p className='font-bold bg-[#525FE1] rounded p-2 cursor-pointer' onClick={onLogOutClick}>Log Out</p>
                            </div>
                            <button onClick={() => open()} className='bg-blue-600 mx-3 p-3 rounded-md'>{!isDisconnected ? `${utils(address)}` : "Connect Wallet"}</button>
                        </div>}>
                        
                    </Route>
                </Routes>
            </div>
        </div>
    )
}

export default Header