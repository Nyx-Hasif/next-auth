"use client";
import Link from "next/link";
import React, { useState } from "react";
import {  useRouter } from "next/navigation"; //redirect to homepage when done logging in

const Registerform = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const route = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      alert("Sila isi semua maklumat");
      return;
    }

    try {
      // check if user existed
      const userExisted = await fetch("api/userExist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }), // pass email to server side api in route.js
      });

      const { user } = await userExisted.json(); //destruct user to get user from server side api in route.js by NextResponse
      if (user) {
        alert("User existed");
        return;
      }

      // register user
      const response = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      if (response.ok) {
        // Reset state
        setName("");
        setEmail("");
        setPassword("");
        alert("User Registered Successfully");
        route.push("/"); //redirect to homepage,klau guna push bila tekan button register, dia langsung redirect ke homepage,dan ia boleh balik ke register
      }

      return response.json();
    } catch (error) {
      console.log("Error:", error);
      throw Error;
    }
  }

   return (
   <div className='flex flex-1 h-screen items-center justify-center'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 py-8 px-4 w-[600px] border border-black rounded-md shadow-[-7px_7px_0px_#000000]'>
            <h1 className='text-2xl font-medium'>Register</h1>
            <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder='Fullname' className='px-2 py-2 border border-black outline-none' />
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Email' className='px-2 py-2 border border-black outline-none' />
            <input value ={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Password' className='px-2 py-2 border border-black outline-none'/>
            <button className='px-2 py-2  bg-green-500 text-white font-semibold alive'>Register</button>
            <Link href="/" className='text-normal text-right'>Dont have an account? <span className='underline hover:text-red-600 cursor-pointer'>Login</span></Link>
        </form>
    </div>
  )
};

export default Registerform;

