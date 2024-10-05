import React from 'react'

const Signup = () => {
  return (
    <div className='bg-white rounded-xl p-5 w-[40%]  m-40 '>
        <div className='flex flex-col items-center gap-2 p-5'>
            <h2 className='font-bold text-[200%]'>Sign Up</h2>
            <p>Already have an account?<a href="#" className='text-blue-700'>Log In here</a></p>
        </div>
        <div className='mt-2'>
            <p>Username</p>
            <input type="text" placeholder='Username' className='rounded  border-2 w-full p-2'/>
        </div>
        <div className='mt-2'>
            <p>Email Address</p>
            <input type="text" placeholder='A confirmation code will be sent to this address' className=' p-2 rounded  border-2 w-full'/>
        </div>
        <div className='mt-2'>
            <p>Confirm Email Address</p>
            <input type="text" placeholder='Re-enter your email address' className='rounded  border-2 w-full p-2'/>
        </div>
        
        <div className='flex flex-col mt-2'>
            <div className='flex flex-row justify-between'>
                <p>Password</p> 
            </div>
            <input type="password" placeholder='********' className='rounded border-2 p-2' />
        </div>
        <div className='flex flex-col mt-2 '>
            <div className='flex flex-row justify-between'>
                <p>Confirm Password</p> 
            </div>
            <input type="password" placeholder='********' className='rounded border-2 p-2' />
        </div>
        <div className='flex flex-row mt-2 gap-2'>
            <input type="checkbox" />
            <p>I agree to the</p>
            <a href="" className='text-blue-700'> Terms and Conditions.</a>
        </div>
        <div className='flex flex-row mt-2 gap-2'>
            <input type="checkbox" />
            <p>I would like to receive the Etherscan newsletter and understand that I can <span className='cursor-pointer text-blue-700'>unsubscribe</span> at any time.</p>
        </div>
        <div className='m-5'>
            <button className='bg-blue-400 rounded-2xl w-full p-2'>Create An Account</button>
        </div>
    </div>
  )
}

export default Signup