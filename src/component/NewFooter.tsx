import React from 'react'
import ytb from '../assets/ytb.png';
import fb from '../assets/fb.png';
import x from '../assets/x.png';
import insta from '../assets/insta.png';

const Footer = () => {
  return (
    <div className='bg-[#111538] '>
        <div className='flex gap-2 justify-around '>
            <div className='text-white w-[30%] m-4'>
                <h1 className='font-bold text-[200%]'>Healthcare Services</h1>
                <p className='text-[60%]'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                <div className=' flex gap-2 mt-2'>
                    <img src={ytb} alt="" />
                    <img src={x} alt="" />
                    <img src={fb} alt="" />
                    <img src={insta} alt="" />
                </div>
            </div>
            <div className='flex flex-col text-white m-4'>
                <h2>Departments</h2>
                <a href="#" className='text-[60%]'>Menu</a>
                <a href="#" className='text-[60%]'>Features</a>
                <a href="#" className='text-[60%]'>News & Blogs</a>
                <a href="#" className='text-[60%]'>Help & Supports</a>
            </div>
            <div className='flex flex-col text-white m-4'>
                <h2>Patient Care</h2>
                <a href="#" className='text-[60%]'>How we care</a>
                <a href="#" className='text-[60%]' >Terms of service</a>
                <a href="#" className='text-[60%]'>Pricing</a>
                <a href="#" className='text-[60%]'>FAQ</a>
            </div>
            <div className='flex flex-col text-white m-4'>
                <h2>Contact Us</h2>
                <p className='text-[60%]'>Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016</p>
                <p className='text-[60%]' >+1 202-918-2132</p>
                <p className='text-[60%]'>education@mail.com</p>
                <p className='text-[60%]'>www.education.com</p>
            </div>
        </div>
    </div>
  )
}

export default Footer