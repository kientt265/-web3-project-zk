import React from 'react'

const ProfilePatient = () => {
  return (
    <div className='bg-white rounded-xl p-5 w-[40%]  m-40'>
        <div className='flex flex-col items-center gap-2 p-5 '>
            <h2 className='font-bold text-[200%]'>Your Profile</h2>
            
        </div>
        <div>
            <div className='flex '>
              <p>Full Name:</p>
              <p className='ml-[200px]'>Age:</p>
            </div>
        </div>
        <div className='flex flex-col mt-2'>
            <div className='flex flex-row justify-between'>
                <p>Your address wallet: </p> 
              
            </div>
            <input type="password" placeholder='********' className=' p-2 rounded  border-2 w-full' />
        </div>
        
        <div className='flex justify-center m-5'>
            <button className='bg-blue-500 rounded-2xl w-full p-2'>UPLOAD YOUR PROFILE TO IPFS</button>
        </div>
    </div>
  )
}

export default ProfilePatient