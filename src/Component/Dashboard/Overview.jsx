import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { IoMdArrowDropup } from "react-icons/io";
import { HiArrowUpRight } from "react-icons/hi2";
const Overview = () => {

    const { data = {}, isLoading, isError } = useQuery({
        queryKey: ['myOrder'],
        queryFn: async () => {
            const res = await axios('https://task-api-eight-flax.vercel.app/api/overview')
            return res.data
        }
    })

    if (isLoading) return (
        <div className='grid grid-cols-4 gap-4 px-6 py-4'>
            {[...Array(4)].map((_, i) => (
                <div key={i} className='rounded-2xl p-5 bg-white h-36 animate-pulse bg-gray-200' />
            ))}
        </div>
    )

    if (isError) return (
        <div className='px-6 py-4'>
            <div className='bg-red-50 text-red-500 text-sm px-4 py-3 rounded-xl'>
                Something wrong please try again letter.
            </div>
        </div>
    )

    return (
        <div className='grid md:grid-cols-4 grid-cols-1  gap-4 px-6 py-4'>

            {/* Total Users */}
            <div className='rounded-2xl p-5 bg-gradient-to-br from-[#12452d] to-[#1e714a] text-white'>
                <div className='flex items-center justify-between mb-4'>
                    <h4 className=' font-medium text-gray-300'>Total Users</h4>
                    <button className='p-1.5 rounded-full border bg-white'>
                        <HiArrowUpRight size={12} color='black' />
                    </button>
                </div>
                <h1 className='text-4xl font-bold    mb-3'>{data.totalUsers}</h1>
                <div className='flex items-center gap-1.5 text-xs text-[#a8f19f]'>
                    <span className='border  rounded p-0.5 flex items-center'>
                        5 <IoMdArrowDropup />
                    </span>
                    Increased from last month
                </div>
            </div>

            {/* Active Users */}
            <div className='rounded-2xl p-5 bg-white text-gray-900'>
                <div className='flex items-center justify-between mb-4'>
                    <h3 className='font-medium '>Active Users</h3>
                    <button className='p-1.5 rounded-full border '>
                        <HiArrowUpRight size={12} color='black' />
                    </button>
                </div>
                <h1 className='text-4xl font-bold mb-3'>{data.activeUsers}</h1>

                <div className='flex items-center gap-1.5 text-xs text-[#a8f19f]'>
                    <span className='border border-gray-300 rounded p-0.5 flex items-center'>
                        6 <IoMdArrowDropup />
                    </span>
                    Increased from last month
                </div>
            </div>

            {/* Revenue */}
            <div className='rounded-2xl p-5 bg-white text-gray-900'>
                <div className='flex items-center justify-between mb-4'>
                    <h3 className=' font-medium '>Revenue</h3>
                    <button className='p-1.5 rounded-full border  '>
                        <HiArrowUpRight size={12} color='black' />
                    </button>
                </div>
                <h1 className='text-4xl font-bold mb-3'>{data.revenue}</h1>
                <div className='flex items-center gap-1.5 text-xs text-[#96ac97]'>

                    <div className='flex items-center gap-1.5 text-xs text-[#a8f19f]'>
                        <span className='border border-gray-300 rounded p-0.5 flex items-center'>
                            2 <IoMdArrowDropup />
                        </span>
                        Increased from last month
                    </div>

                </div>
            </div>

            {/* Growth */}
            <div className='rounded-2xl p-5 bg-white text-gray-900'>
                <div className='flex items-center justify-between mb-4'>
                    <h3 className='font-medium text-gray-500'>Growth</h3>
                    <button className='p-1.5 rounded-full border'>
                        <HiArrowUpRight size={12} color='black' />
                    </button>
                </div>
                <h1 className='text-4xl font-bold mb-3'>{data.growth}%</h1>
                <div className='flex items-center gap-1.5 text-xs text-[#a8f19f]'>

                    On Discuss
                </div>
            </div>

        </div>
    );
};

export default Overview;