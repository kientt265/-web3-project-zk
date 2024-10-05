import React from 'react'

const Login = () => {
  return (
    <div className='bg-white rounded-xl p-5 w-[40%]  m-40'>
        <div className='flex flex-col items-center gap-2 p-5 '>
            <h2 className='font-bold text-[200%]'>Sign In</h2>
            <p>Don't have a account?<a href="#" className='text-blue-700'>Sign Up</a></p>
        </div>
        <div>
            <p>Username</p>
            <input type="text" placeholder='kientran@gmail.com' className=' p-2 rounded  border-2 w-full'/>
        </div>
        <div className='flex flex-col mt-2'>
            <div className='flex flex-row justify-between'>
                <p>Password</p> 
                <a href="" className='text-blue-700'>Forgot your password?</a>
            </div>
            <input type="password" placeholder='********' className=' p-2 rounded  border-2 w-full' />
        </div>
        <div className='flex flex-row mt-2 gap-2'>
            <input type="checkbox" />
            <p>Remember & Auto Login</p>
        </div>
        <div className='flex justify-center m-5'>
            <button className='bg-blue-500 rounded-2xl w-full p-2'>LOGIN</button>
        </div>
    </div>
  )
}

export default Login