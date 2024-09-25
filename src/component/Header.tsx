import React from 'react'
import { useAppKit } from '@reown/appkit/react'
const Header = () => { // Nhận balance từ props
  const {open} = useAppKit()
  return (
    <div className='p-4 bg-black flex justify-between'>
        <div className='flex items-center space-x-4'>
            <h1 className='text-red-500 font-semibold uppercase text-[25px]'>Kien g</h1>
            <nav className='flex text-white mx-4 space-x-4'>
                <a href='#'>Home</a>
                <a href='#'>Contact</a>
                <a href='#'>About</a>
            </nav>
        </div>
        <div>
            <input type='text' placeholder='Search' className="border-r-2 mx-4 p-3 rounded-sm"></input>
            <button className="rounded-md bg-red-500 p-3">Search</button>
            <button onClick={() => open()}  className='bg-blue-600 mx-3 p-3 rounded-md'>Connect Wallet</button>
           
        </div>
    </div>
  )
}

export default Header