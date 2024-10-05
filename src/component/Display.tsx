import React from 'react'
import VectorImage from '../assets/Vector.png'
import Kiendeptrai from '../assets/anhcuatoi-removebg-preview.png'
import cam from '../assets/cam.png'
import xanh from '../assets/xanh.png'
import rectangle from '../assets/Rectangle 2037.png'
import purplebook from '../assets/purple-book.png'
import videos from '../assets/videos/TheWolfofWallStreet.mp4'
import chidep from '../assets/chidep.png'
import xanhduoi from '../assets/xanhduoi.png'
import vangtrai from '../assets/vangtrai.png'
import vangphai from '../assets/vangphai.png'
const Display = () => {
return (
    <div className='relative mt-[63px]'>
        <div className='w-full h-[590px] bg-gray-400 flex relative absolute '>
            <div>
                <img src={xanh} alt="" />
            </div>
            <div className=' ml-[123px] flex flex-col'>
                <div className='mt-[100px] text-[40px] '>
                    <p>Online <span className='font-bold text-[#525FE1]'>Learning</span></p>
                    <p><span className='font-bold text-[#525FE1]'>you can access</span> any</p>
                    <p>where easily!</p>
                </div>
                <div>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. <br /> Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.....</p>
                </div>
                <div className=' flex flex-row mt-3 items-center'>
                    <p className='bg-[#FFCF59] p-3 rounded font-bold cursor-pointer'>JOIN FREE</p>
                    <p className='ml-2 cursor-pointer'>See how it work?</p>
                </div>
            </div>
            <div className='relative'>
                <img src={cam} alt="" />
                <img src={VectorImage} alt="" className='ababsolute top-0 left-0 '/>
                <img src={Kiendeptrai} alt="" className='absolute top-0 left-0'/>
            </div>
        
        </div>
        <div className='absolute right-0'>
            <img src={rectangle}  alt="" className='scale-x-125' />
        </div>
        <div className='bg-gray-400 mt-40'>
            <div className='p-10 '>
                <div className='flex  flex-col items-center '>
                    <h1 className='text-[35px]'><span className='font-bold text-[#525FE1]   '>Why we are</span> best from others?</h1>
                    <p className='w-[70%]'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.....</p>
                </div>
            </div>
            <div className='flex flex-wrap gap-5 justify-center '>
                <div className='w-[25%] bg-gray-300 rounded-2xl flex flex-col items-center gap-2 p-4 hover:brightness-125'>
                    <img src={purplebook} alt="" className='scale-5 mt-5'/>
                    <p className='font-bold'>Digital Platform</p>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.....</p>
                </div>
                <div className='w-[25%] bg-gray-300 rounded-2xl flex flex-col items-center gap-2 p-4 hover:brightness-125'>
                    <img src={purplebook} alt="" className='scale-5 mt-5'/>
                    <p className='font-bold'>Digital Platform</p>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.....</p>
                </div>
                <div className='w-[25%] bg-gray-300 rounded-2xl flex flex-col items-center gap-2 p-4 hover:brightness-125'>
                    <img src={purplebook} alt="" className='scale-5 mt-5'/>
                    <p className='font-bold'>Digital Platform</p>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.....</p>
                </div>
                <div className='w-[25%] bg-gray-300 rounded-2xl flex flex-col items-center gap-2 p-4 hover:brightness-125'>
                    <img src={purplebook} alt="" className='scale-5 mt-5'/>
                    <p className='font-bold'>Digital Platform</p>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.....</p>
                </div>
                <div className='w-[25%] bg-gray-300 rounded-2xl flex flex-col items-center gap-2 p-4 hover:brightness-125'>
                    <img src={purplebook} alt="" className='scale-5 mt-5'/>
                    <p className='font-bold'>Digital Platform</p>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.....</p>
                </div>
                <div className='w-[25%] bg-gray-300 rounded-2xl flex flex-col items-center gap-2 p-4 hover:brightness-125'>
                    <img src={purplebook} alt="" className='scale-5 mt-5'/>
                    <p className='font-bold'>Digital Platform</p>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.....</p>
                </div>
            </div>
            <div className='relative'>
                <div className='mt-10 flex flex-col items-center'>
                    <div className='flex flex-col items-center'>
                        <h1 className='text-[35px]'><span className='font-bold text-[#525FE1] '>About</span> Company</h1>
                        <p className='w-[70%]'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.....</p>
                    </div>
                    <video className='m-24 scale-150 rounded-2xl z-10' controls width="500px" src={videos}></video>
                    
                </div>
                <img src={xanhduoi } className='scale-100 absolute left-[-148px] top-0 ' alt="" />
                <img src={chidep} alt="" className=' scale-90 absolute left-0'/>
                
                <div className='w-full bg-yellow-500 h-[794px] pr-5 flex justify-end'>
                    <div className='flex flex-col  w-[45%]'>
                        <div className=''>
                            <h1 className=' font-bold text-[40px] mt-10'>Effortless Enrollment</h1>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry....</p>
                        </div>
                        <div>
                            <div className='bg-white my-5 rounded-xl p-4 font-bold cursor-pointer'>
                                01 Choose a Program
                            </div>
                            <div className='bg-white my-5 rounded-xl p-4 font-bold cursor-pointer'>
                                02 Enroll and Submit Documents
                            </div>
                            <div className='bg-white my-5 rounded-xl p-4 font-bold cursor-pointer'>
                                03 Choose a Date and Time
                            </div>
                            <div className='bg-white my-5 rounded-xl p-4 font-bold cursor-pointer'>
                                04 Pick an Instructor
                            </div>
                            <div className='bg-white my-5 rounded-xl p-4 font-bold cursor-pointer'>
                                05 Then Start
                            </div>
                        </div>
                    </div> 
                </div>
            </div>
            
            
        </div>
    </div>
)
}

export default Display