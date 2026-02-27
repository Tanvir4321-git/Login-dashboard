import React from 'react';
import { MdBarChart, MdCalendarMonth, MdDashboard, MdGroup, MdHelp, MdLogout, MdSettings, MdTask } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { MdOutlineEmail } from "react-icons/md";
import { IoIosNotificationsOutline, IoMdAdd } from "react-icons/io";
import profile from '../public/profile.png'

import { NavLink } from 'react-router';
import Overview from './Component/Dashboard/Overview';

const Dashboard = () => {
    return (
        <div className='max-w-7xl mx-auto py-10 px-4'>
            <div className='flex flex-col lg:flex-row gap-8'>
                {/* left side */}
                <div className='bg-[#f7f7f7] rounded-2xl p-4 w-full lg:w-1/5'>
                    <h2 className='text-2xl text-center font-semibold mt-4 mb-10'>Donezo</h2>

                    {/* Menu Section */}
                    <h3 className='text-gray-400 mb-4'>Menu</h3>
                    <div className='flex flex-col gap-2 mb-8'>
                        <NavLink to='/dashboard' className='nav-link text-black'>
                            <MdDashboard size={18} color='green' /> Dashboard
                        </NavLink>

                        <NavLink className='nav-link'>
                            <MdTask size={18} /> Tasks
                        </NavLink>

                        <NavLink className='nav-link'>
                            <MdCalendarMonth size={18} /> Calendar
                        </NavLink>

                        <NavLink className='nav-link'>
                            <MdBarChart size={18} /> Analytics
                        </NavLink>

                        <NavLink className='nav-link'>
                            <MdGroup size={18} /> Team
                        </NavLink>
                    </div>

                    {/* General Section */}
                    <h3 className='text-gray-400 mb-4'>General</h3>
                    <div className='flex flex-col gap-2'>
                        <NavLink className='nav-link'>
                            <MdSettings size={18} /> Settings
                        </NavLink>

                        <NavLink className='nav-link'>
                            <MdHelp size={18} /> Help
                        </NavLink>

                        <NavLink className='nav-link'>
                            <MdLogout size={18} /> Logout
                        </NavLink>
                    </div>
                </div>
                {/* right side */}
                <div className='w-full lg:w-4/5'>
                    {/* upper Section */}
                    <div className='flex flex-col md:flex-row items-center justify-between px-6 py-3 bg-[#f7f7f7] rounded-2xl mb-2 '>

                        {/* Search */}
                        <div className='flex items-center gap-2 bg-white rounded-lg px-3 py-2 w-64'>
                            <CiSearch size={18} className='text-gray-700' />
                            <input
                                type="text"
                                placeholder='Search task'
                                className='bg-transparent text-sm text-gray-600 placeholder-gray-300 outline-none w-full'
                            />
                            <span className='text-xs text-gray-400 bg-gray-200 px-1.5 py-0.5 rounded'>⌘F</span>
                        </div>

                        <div className='flex mt-3 md:mt-0 mx-auto md:mx-0 items-center gap-4 ml-auto'>

                            {/* Email Icon */}
                            <button className='text-gray-600 rounded-full bg-white p-2'>
                                <MdOutlineEmail size={22} />
                            </button>

                            {/* Notification Icon */}
                            <button className='text-gray-600 rounded-full bg-white p-2'>
                                <IoIosNotificationsOutline size={22} />
                            </button>

                            {/* User Info */}
                            <div className='flex items-center gap-2'>
                                <img
                                    src={profile}
                                    alt='profile'
                                    className='w-9 h-9 rounded-full object-cover bg-white p-1.5'
                                />
                                <div className='hidden md:block'>
                                    <p className='text-sm font-semibold text-gray-800 leading-tight'>Totok Michael</p>
                                    <p className='text-xs text-gray-400'>tmichael20@mail.com</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='bg-[#f7f7f7] p-4 rounded-2xl'>
                    {/* dashboard header */}

                    <div className='mb-2' >

                    <div className='flex flex-col md:flex-row gap-3 md:gap-0 items-center justify-between '>

                        <div>
                            <h1 className='text-2xl font-bold text-gray-900 text-center md:text-left'>Dashboard</h1>
                            <p className='text-sm text-center md:text-left text-gray-400 mt-1'>Plan, prioritize, and accomplish your tasks with ease.</p>
                        </div>

                        {/* Right - Buttons */}
                        <div className='flex items-center gap-3'>
                            <button className='flex items-center gap-2 bg-gradient-to-r from-[#144e33] to-[#22744f]  text-white text-sm font-medium px-4 py-2 rounded-lg '>
                                <IoMdAdd size={18} />
                                <span >Add Project</span>
                            </button>
                            <button className=' text-sm font-medium text-gray-700 border border-gray-300  px-4 py-2 rounded-lg'>
                                Import Data
                            </button>
                        </div>
                    </div>
                    </div>
                    {/* overview */}
                    <Overview></Overview>
                    
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;