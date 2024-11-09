'use client'
import React, { useState, useEffect, useRef } from "react";
import { FiSearch } from "react-icons/fi";
import { IoPersonAddSharp } from "react-icons/io5";
import { AiOutlineMessage } from "react-icons/ai";
import { FaBell } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { RiLogoutBoxLine } from "react-icons/ri";


const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false);

    // Ref untuk merujuk kepada dropdown container
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    }

    // UseEffect untuk mendengar klik di luar dropdown
    useEffect(() => {
    // Fungsi untuk handle klik di luar dropdown
        const handleClickOutside = (event) => {
            // Semak sama ada klik berlaku di luar dropdown
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        // Tambah event listener apabila component dimuat
        document.addEventListener('mousedown', handleClickOutside);
        
        // Bersihkan event listener apabila component di unmount
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []); // Array kosong bermakna effect hanya berjalan sekali

  return (
    <div className='flex flex-row justify-between items-center px-4 py-2 border border-black'>
    {/* logo */}
      <div className="flex flex-row  items-center">
            <h1 className="text-3xl font-bold">xXx</h1>
      </div>
      {/* search bar */}
      <div className="sm:flex flex-row gap-12 items-center hidden">
             <div className="w-full max-w-md">
                <div className="relative">
                    <input type="text" placeholder="Search" className="w-full py-3 pl-4 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"/>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <i className=" text-gray-400"><FiSearch/></i>
                    </div>
                </div>
            </div>
      </div>
      {/* icons */}
      <div className='flex flex-row gap-4'>
        <i className=" text-black text-2xl"><IoPersonAddSharp/></i>
        <i className=" text-black text-2xl"><AiOutlineMessage /></i>
        <i className=" text-black text-2xl"><FaBell /></i>
        <div className='relative' ref={dropdownRef}>
          <button onClick={toggleDropdown} className=" text-black text-2xl"><IoMdArrowDropdown /></button>
          {isOpen?<div className="absolute end-0 z-10 mt-2 w-56 rounded-md border border-gray-100 bg-white shadow-lg" role="menu">
                <div className="p-2">
                    <a href="#" className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700" role="menuitem">My Profile</a>
                    <a href="#" className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700" role="menuitem">My Account</a>
                    <form method="POST" action="#">
                        <button type="submit" className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50" role="menuitem"><RiLogoutBoxLine className='text-lg'/>Log Out</button>
                    </form>
                </div>
            </div>:null}
            
        </div>
      </div>
    </div>
  );
};

export default Navbar;
