import Link from 'next/link'
import React from 'react'

const LogIn = () => {
  return (
    <div className='flex flex-1 h-screen items-center justify-center'>
        <form className='flex flex-col gap-4 py-8 px-4 w-[600px] border border-black rounded-md shadow-[-7px_7px_0px_#000000]'>
            <h1 className='text-2xl font-medium'>Login</h1>
            <input type="email" placeholder='Email' className='px-2 py-2 border border-black outline-none' />
            <input type="password" placeholder='Password' className='px-2 py-2 border border-black outline-none'/>
            <button className='px-2 py-2  bg-green-500 text-white font-semibold alive'>Login</button>
            <Link href="/register" className='text-normal text-right'>Dont have an account? <span className='underline hover:text-red-600 cursor-pointer'>Register</span></Link>
        </form>
    </div>
  )
}

export default LogIn
