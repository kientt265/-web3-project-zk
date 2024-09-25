import React from 'react'

const Footer = () => {
    return(
        <div className='bg-black fixed bottom-0 w-full'>
            <p className='text-white    p-4'>&copy; {new Date().getFullYear()} Kieng, Inc</p><br/>
        </div>
    );
}

export default Footer