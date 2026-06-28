"use client"
import { authClient, useSession } from '@/lib/auth-client';
import Image from 'next/image';
import React, { useState } from 'react';
import imgAvater from '@/assets/avater.jpg'
import Link from 'next/link';

const ProfilePage = () => {

    const { data: session} = authClient.useSession()
    const user = session?.user;
    return (
        <div className='min-h-screen bg-gray-50 py-10 px-4'>
            <div className='bg-white p-6 border border-gray-300 rounded-xl shadow-sm md:max-w-2xl mx-auto'>

                <div className='items-center gap-6 mb-8'>
                    <div className='relatibe flex flex-col items-center' >
                        <Image
                            src={user?.image || imgAvater}
                            alt='user'
                            width={200}
                            height={200}
                            className='rounded-full object-cover border-4 border-purple-400'
                        />
                        <div className='text-ceneter md:text-left'>
                            <p className='text-2xl md:text-3xl font-bold'>{user?.name}</p>
                            <p className='text-gray-500 text-sm md:text-base'>{user?.email}</p>
                        </div>
                    </div>

                    <div className='border border-gray-200 p-4 md:p-6 bg-gray-50/50 rounded-lg'>
                        <h1 className='text-2xl font-bold'>Information</h1>

                        <div className='space-y-4'>
                            <div className='flex flex-col sm:flex-row sm:justify-between border border-gray-100 pb-2 gap-1'>
                                <span className='font-medium text-gray-700'>Name:</span>
                                <span className='break-all text-gray-800'>{user?.name}</span>
                            </div>
                            <div className='flex flex-col sm:flex-row sm:justify-between border-b border-gray-100 pb-2 gap-1'>
                                <span className='font-medium text-gray-700'>Email:</span>
                                <span className='break-all text-gray-800'>{user?.email}</span>
                            </div>
                            <div className='flex flex-col sm:flex-row sm:justify-between border-b border-gray-100 pb-2 gap-2 md:gap-50'>
                                <span className='font-medium text-gray-700'>Photo:</span>
                                <span className='break-all text-gray-800 line-clamp-1'>{user?.image}</span>
                            </div>
                        </div>
                    </div>


                    <button
                        className='btn block px-20 my-5 bg-purple-700 rounded-md w-full text-white'>
                        <Link href="/update-profile " className='block '>Edit your Inrotmation</Link>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;