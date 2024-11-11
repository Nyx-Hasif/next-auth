'use client'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useState } from 'react'

const LogIn = () => {


  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signIn('credentials', { email, password,redirect:false });
      if (response?.error) {
        alert(response.error);
        return;
      }
      router.replace('dashboard'); // redirect to dashboard ..klau guna replace,bila tekan button login, dia langsung redirect ke dashboard..dan takboleh balik ke login
    } catch (error) {
      console.log(error)
      alert(error)
    }
  }

  return (
    <div className='flex flex-1 h-screen items-center justify-center'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 py-8 px-4 w-[600px] border border-black rounded-md shadow-[-7px_7px_0px_#000000]'>
            <h1 className='text-2xl font-medium'>Login</h1>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Email' className='px-2 py-2 border border-black outline-none' />
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Password' className='px-2 py-2 border border-black outline-none'/>
            <button type='submit' className='px-2 py-2  bg-green-500 text-white font-semibold alive'>Login</button>
            <Link href="/register" className='text-normal text-right'>Dont have an account? <span className='underline hover:text-red-600 cursor-pointer'>Register</span></Link>
        </form>
    </div>
  )
}

export default LogIn
