"use client"
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import imgAvater from '@/assets/avater.jpg'
import NavLink from './NavLink';
import { HiMenu, HiX } from 'react-icons/hi';
import { authClient } from '@/lib/auth-client';

const Navbar = () => {
    const [open, setOpen] = useState(false)

    const { data: session, isPending } = authClient.useSession()
    const user = session?.user;

    return (
        <div className='bg-white shadow-md sticky top-0 z-50'>
            <div className='hidden md:flex justify-between items-center py-3 w-11/12 mx-auto'>
                <Link
                    href="/"
                    className='bg-linear-to-r from-purple-900 to-pink-900 bg-clip-text text-transparent font-bold text-3xl'>
                    SkillSphere
                </Link>

                <div className='flex gap-6 items-center'>
                    <NavLink className='font-semibold text-gray-800' href='/'>Home</NavLink>
                    <NavLink className='font-semibold text-gray-800' href='/courses'>All Courses</NavLink>
                    <NavLink className='font-semibold text-gray-800' href='/profile'>My Profile</NavLink>
                </div>

                <div className='block felx'>
                    {isPending ?
                        (<span className="loading loading-spinner text-error"></span>)
                        : user ? (
                            <div className='flex gap-2 items-center justify-center'>
                                <div className='flex flex-col justify-center items-center' >
                                    <Image
                                        src={user?.image || imgAvater}
                                        alt='user'
                                        width={40}
                                        height={40}
                                        className='rounded-full'
                                    />
                                    <p className='text-ceneter text-sm'>{user?.name}</p>
                                </div>
                                <button onClick={async () => await authClient.signOut()}
                                    className='btn bg-linear-to-r to-purple-700 from-pink-700 text-white rounded-full'>
                                    <Link href='/login'
                                    >
                                        Log out
                                    </Link>
                                </button>
                            </div>
                        ) : (
                            <div className='flex gap-2'>
                                <button
                                    className='block btn bg-linear-to-r to-purple-700 from-pink-700 text-white rounded-full'>
                                    <Link href='/register'>Register</Link>
                                </button>
                                <button
                                    className='block btn bg-linear-to-r to-purple-700 from-pink-700 text-white rounded-full'>
                                    <Link href='/login'>Login</Link>
                                </button>
                            </div>
                        )}
                </div>
            </div>

            <div>
                <button
                    className='md:hidden text-2xl p-4 flex items-center gap-2'
                    onClick={() => setOpen(!open)}>
                    {open ? <HiX /> : <HiMenu />}
                    <h2
                        className='md:hidden bg-linear-to-r from-purple-900 to-pink-900 bg-clip-text text-transparent font-bold text-xl'>
                        SkillSphere
                    </h2>
                </button>

                {open && (
                    <div className='md:hidden bg-white shadow-md px-6 py-4 space-y-4 drawer'>
                        {user && (
                            <div className='flex flex-col justify-center items-center' >
                                <Image
                                    src={user?.image || imgAvater}
                                    alt='user'
                                    width={40}
                                    height={40}
                                    className='rounded-full'
                                />
                                <p className='text-ceneter text-sm'>{user?.name}</p>
                            </div>
                        )}

                        {user ? (
                            <button onClick={async () => await authClient.signOut()}
                                className='btn bg-linear-to-r to-purple-700 from-pink-700 text-white rounded-full'>
                                <Link href='/login'
                                >
                                    Log out
                                </Link>
                            </button>
                        ) : (
                            <div className='flex gap-2'>
                                <button
                                    className='block btn bg-linear-to-r to-purple-700 from-pink-700 text-white rounded-full'>
                                    <Link href='/login'>Login</Link>
                                </button>
                                <button
                                    className='block btn bg-linear-to-r to-purple-700 from-pink-700 text-white rounded-full'>
                                    <Link href='/register'>Register</Link>
                                </button>
                            </div>
                        )}
                        <div className='flex flex-col'>
                            <NavLink className='font-semibold text-gray-800' href='/'>Home</NavLink>
                            <NavLink className='font-semibold text-gray-800' href='/courses'>All Courses</NavLink>
                            <NavLink className='font-semibold text-gray-800' href='/profile'>My Profile</NavLink>
                        </div>
                    </div>
                )}

            </div>
        </div>

    );
};

export default Navbar;