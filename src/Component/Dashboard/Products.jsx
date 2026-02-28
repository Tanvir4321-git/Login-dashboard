import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { IoClose } from 'react-icons/io5';

const Products = () => {

    const [selectedProduct, setSelectedProduct] = useState(null)

    const { data = [], isLoading, isError } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await axios('https://task-api-eight-flax.vercel.app/api/products')
            return res.data
        }
    })

    const getInitials = (name) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase()
    }

    if (isLoading) return (
        <div className='bg-white rounded-2xl p-5'>
            <div className='w-24 h-5 bg-gray-200 rounded-full animate-pulse mb-5' />
            <div className='flex flex-col gap-3'>
                {[...Array(4)].map((_, i) => (
                    <div key={i} className='flex items-center gap-3'>
                        <div className='w-10 h-10 rounded-full bg-gray-200 animate-pulse' />
                        <div className='flex-1 flex flex-col gap-1.5'>
                            <div className='w-28 h-3 bg-gray-200 rounded-full animate-pulse' />
                            <div className='w-40 h-3 bg-gray-100 rounded-full animate-pulse' />
                        </div>
                        <div className='w-14 h-6 bg-gray-100 rounded-full animate-pulse' />
                    </div>
                ))}
            </div>
        </div>
    )

    if (isError) return (
        <div className='bg-white rounded-2xl p-5'>
            <h3 className='font-bold text-gray-900 mb-4'>Products</h3>
            <div className='bg-red-50 text-red-500 text-sm px-4 py-3 rounded-xl'>
                Something went wrong. Please try again later.
            </div>
        </div>
    )

    return (
        <>
        <div className='bg-white rounded-2xl p-5 mt-4'>
            {/* Header */}
            <div className='flex items-center justify-between mb-5'>
                <h3 className='font-bold text-2xl text-gray-900'>Products</h3>
                <span className='text-[16px] text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full'>
                    {data.length} total
                </span>
            </div>

            <table className='w-full'>
                <thead>
                    <tr className='text-xs font-semibold text-gray-700 uppercase tracking-wide border-b border-gray-100'>
                        <th className='text-left pb-3'>Name</th>
                        <th className='text-right pb-3'>Details</th>
                    </tr>
                </thead>
                <tbody className='divide-y divide-gray-50'>
                    {data.map((product) => (
                        <tr key={product.id}>
                            <td className='py-3'>
                                <div className='flex items-center gap-3'>
                                    <div className='w-10 h-10 rounded-full bg-[#d8f3dc] text-[#1a3a2a] flex items-center justify-center text-xs font-bold flex-shrink-0'>
                                        {getInitials(product.name)}
                                    </div>
                                    <div>
                                        <p className='text-sm font-semibold text-gray-800'>{product.name}</p>
                                        <p className='text-xs text-gray-400'>${product.price}</p>
                                    </div>
                                </div>
                            </td>
                            <td className='py-3 text-right'>
                                <p
                                    onClick={() => setSelectedProduct(product)}
                                    className='text-[16px] text-gray-600 cursor-pointer hover:text-[#1a3a2a] transition-colors'
                                >
                                    Details
                                </p>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        {/* Modal*/}
        {selectedProduct && createPortal(
            <div
                className='fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4'
                onClick={() => setSelectedProduct(null)}
            >
                <div
                    className='bg-white rounded-2xl p-6 w-full max-w-sm'
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className='flex justify-end mb-2'>
                        <button
                            onClick={() => setSelectedProduct(null)}
                            className='text-gray-400 hover:text-gray-700 transition-colors'
                        >
                            <IoClose size={20} />
                        </button>
                    </div>

                    <div className='flex flex-col items-center text-center mb-6'>
                        <div className='w-16 h-16 rounded-full bg-[#d8f3dc] text-[#1a3a2a] flex items-center justify-center text-xl font-bold mb-3'>
                            {getInitials(selectedProduct.name)}
                        </div>
                        <h2 className='text-lg font-bold text-gray-900'>{selectedProduct.name}</h2>
                        <p className='text-sm text-gray-400 mt-1'>${selectedProduct.price}</p>
                    </div>

                    <div className='flex flex-col'>
                        <div className='flex justify-between items-center py-3 border-b border-gray-100'>
                            <span className='text-sm text-gray-400 font-medium'>Product ID</span>
                            <span className='text-sm font-semibold text-gray-800'>#{selectedProduct.id}</span>
                        </div>
                        <div className='flex justify-between items-center py-3 border-b border-gray-100'>
                            <span className='text-sm text-gray-400 font-medium'>Category</span>
                            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                                selectedProduct.category === 'subscription'
                                    ? 'bg-[#95d6a0c9] text-[#46b154]'
                                    : 'bg-blue-100 text-blue-400'
                            }`}>
                                {selectedProduct.category}
                            </span>
                        </div>
                        <div className='flex justify-between items-center py-3'>
                            <span className='text-sm text-gray-400 font-medium'>Total Sales</span>
                            <span className='text-sm font-semibold text-gray-800'>{selectedProduct.sales}</span>
                        </div>
                    </div>
                </div>
            </div>,
            document.body
        )}
        </>
    )
}

export default Products;