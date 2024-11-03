import React from 'react'

const ProfilePatient = () => {
  return (
    <div className=''>
        <div className='flex justify-center text-2xl font-bold'>
            Your Profile
        </div>
        <div className='flex justify-center gap-5'>
            <div>Full Name: </div>
            <div>Age:</div>
        </div>
        <div className='flex justify-center'>Your Wallet Address:</div>
        <div className=' flex justify-center'>
            <div>Your File Profile Detail:</div>
            <button className='bg-blue-600 '>Upload</button>
        </div>
    </div>
  )
}

export default ProfilePatient