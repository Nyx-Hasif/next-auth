'use client'
import React from 'react'
import { useSession } from 'next-auth/react';


const Homepage = () => {

  const { data: session } = useSession(); //destructure data from next-auth

  return (
    <div className="flex flex-1  ">
      <div className="flex flex-col  gap-6  px-4 py-4">
        <h1 className="text-2xl md:text-6xl font-medium">Welcome to Homepage,<span className="text-red-500">{session?.user?.name}</span>!</h1>

        <form className="flex flex-col border border-black rounded-md shadow-[-7px_7px_0px_#000000] py-4 px-4">
          <div className="flex flex-row gap-1">
            <label htmlFor="name">Name : </label>
            <p>{session?.user?.name}</p>
          </div>
          <div className="flex flex-row gap-1">
            <label htmlFor="name">Email : </label>
            <p>{session?.user?.email}</p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Homepage
