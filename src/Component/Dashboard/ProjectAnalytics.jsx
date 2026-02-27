import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';

const ProjectAnalytics = () => {

    const { data = [], isLoading, isError } = useQuery({
        queryKey: ['analytics'],
        queryFn: async () => {
            const res = await axios('https://task-api-eight-flax.vercel.app/api/analytics')
            return res.data
        }
    })

    // সর্বোচ্চ value বের করো — bar এর height calculate করার জন্য
    const maxViews = Math.max(...data.map(d => d.views), 1)

    // date থেকে শুধু weekday নাম বের করো
    const getDay = (dateStr) => {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        return days[new Date(dateStr).getDay()]
    }

    // সর্বোচ্চ views যেটার সেটা highlight হবে
    const maxIndex = data.findIndex(d => d.views === Math.max(...data.map(d => d.views)))

    if (isLoading) return (
        <div className='bg-white rounded-2xl p-5'>
            <h3 className='font-bold text-gray-900 mb-4'>Project Analytics</h3>
            <div className='flex items-end gap-3 h-36'>
                {[...Array(5)].map((_, i) => (
                    <div key={i} className='flex-1 bg-gray-200 animate-pulse rounded-full h-full' />
                ))}
            </div>
        </div>
    )

    if (isError) return (
        <div className='bg-white rounded-2xl p-5'>
            <h3 className='font-bold text-gray-900 mb-4'>Project Analytics</h3>
            <div className='bg-red-50 text-red-500 text-sm px-4 py-3 rounded-xl'>
                Something wrong please try again later.
            </div>
        </div>
    )

    return (
        <div className='bg-white rounded-2xl p-5'>
            <h3 className='font-bold text-gray-900 mb-6'>Project Analytics</h3>

            <div className='flex items-end gap-3 h-40'>
                {data.map((item, index) => {
                    const heightPercent = (item.views / maxViews) * 100
                    const isHighlight = index === maxIndex

                    return (
                        <div key={item.date} className='flex flex-col items-center gap-2 flex-1'>

                            {/* percentage label — শুধু highlight bar এ */}
                            {isHighlight && (
                                <span className='text-[10px] font-semibold text-gray-700'>
                                    {Math.round(heightPercent)}%
                                </span>
                            )}

                            {/* Bar */}
                            <div className='w-full flex items-end justify-center' style={{ height: '130px' }}>
                                <div
                                    className={`w-full rounded-full transition-all duration-500
                                        ${isHighlight
                                            ? 'bg-[#52b788]'
                                            : index % 2 === 0
                                                ? 'bg-[#1a3a2a]'
                                                : 'bg-[repeating-linear-gradient(135deg,#d1d5db_0px,#d1d5db_2px,transparent_2px,transparent_6px)] border-2 border-gray-300'
                                        }`}
                                    style={{
                                        height: `${heightPercent}%`,
                                        backgroundImage: index % 2 !== 0 && !isHighlight
                                            ? 'repeating-linear-gradient(135deg, #d1d5db 0px, #d1d5db 2px, transparent 2px, transparent 6px)'
                                            : undefined
                                    }}
                                />
                            </div>

                            {/* Day label */}
                            <span className='text-xs text-gray-400'>{getDay(item.date)}</span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ProjectAnalytics;