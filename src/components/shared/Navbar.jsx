"use client"
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import imgAvater from '@/assets/avater.jpg';
import NavLink from './NavLink';
import { HiMenu, HiX } from 'react-icons/hi';
import { authClient } from '@/lib/auth-client';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [open, setOpen] = useState(false);

    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    const menuVariants = {
        hidden: {
            opacity: 0,
            y: -20,
            scale: 0.95
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15,
                staggerChildren: 0.1, 
                delayChildren: 0.2
            }
        },
        exit: {
            opacity: 0,
            y: -20,
            scale: 0.95,
            transition: { duration: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 }
    };

    return (
        <div className='bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100'>
            {/* Desktop Navbar */}
            <div className='hidden md:flex justify-between items-center py-4 w-11/12 mx-auto'>
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Link
                        href="/"
                        className='bg-linear-to-r from-purple-900 to-pink-900 bg-clip-text text-transparent font-black text-3xl tracking-tight'>
                        SkillSphere
                    </Link>
                </motion.div>

                {/* Desktop Menu with Hover Animation */}
                <div className='flex gap-8 items-center'>
                    {['/', '/courses', '/profile'].map((path, index) => (
                        <motion.div
                            key={path}
                            whileHover={{ y: -2, scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <NavLink className='font-semibold text-gray-800 hover:text-purple-700 transition-colors' href={path}>
                                {index === 0 ? 'Home' : index === 1 ? 'All Courses' : 'My Profile'}
                            </NavLink>
                        </motion.div>
                    ))}
                </div>

                <div className='flex items-center gap-4'>
                    {isPending ? (
                        <span className="loading loading-spinner text-error"></span>
                    ) : user ? (
                        <div className='flex gap-4 items-center justify-center'>
                            <motion.div
                                className='flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100'
                                whileHover={{ scale: 1.02 }}
                            >
                                <Image
                                    src={user?.image || imgAvater}
                                    alt='user'
                                    width={35}
                                    height={35}
                                    className='rounded-full ring-2 ring-purple-500 object-cover'
                                />
                                <p className='text-sm font-medium text-gray-700 pr-1'>{user?.name}</p>
                            </motion.div>
                            <motion.button
                                onClick={async () => await authClient.signOut()}
                                whileHover={{ scale: 1.05, shadow: "0px 10px 20px rgba(126, 34, 206, 0.2)" }}
                                whileTap={{ scale: 0.95 }}
                                className='btn bg-linear-to-r to-purple-700 from-pink-700 text-white rounded-full px-6 border-none shadow-md'>
                                <Link href='/login'>Log out</Link>
                            </motion.button>
                        </div>
                    ) : (
                        <div className='flex gap-3'>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className='btn bg-transparent hover:bg-gray-50 text-gray-800 border border-gray-300 rounded-full px-6'>
                                <Link href='/login'>Login</Link>
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05, shadow: "0px 10px 20px rgba(126, 34, 206, 0.2)" }}
                                whileTap={{ scale: 0.95 }}
                                className='btn bg-linear-to-r to-purple-700 from-pink-700 text-white rounded-full px-6 border-none shadow-md'>
                                <Link href='/register'>Register</Link>
                            </motion.button>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile Navbar */}
            <div className='md:hidden flex justify-between items-center p-4'>
                <Link href="/">
                    <h2 className='bg-linear-to-r from-purple-900 to-pink-900 bg-clip-text text-transparent font-black text-2xl tracking-tight'>
                        SkillSphere
                    </h2>
                </Link>

                {/* Animated Menu Trigger Icon */}
                <motion.button
                    className='text-2xl p-2 bg-gray-50 rounded-full border border-gray-100 text-gray-800'
                    onClick={() => setOpen(!open)}
                    whileTap={{ scale: 0.9 }}
                    animate={{ rotate: open ? 90 : 0 }}
                    transition={{ type: "spring", stiffness: 200 }}
                >
                    {open ? <HiX /> : <HiMenu />}
                </motion.button>
            </div>

            {/* Mobile Dropdown with AnimatePresence */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        variants={menuVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className='absolute top-full left-0 w-full bg-white/95 backdrop-blur-lg shadow-xl px-6 py-6 border-b border-gray-100 flex flex-col gap-6 md:hidden z-40 origin-top'
                    >
                        {user && (
                            <motion.div variants={itemVariants} className='flex items-center gap-3 bg-purple-50/50 p-3 rounded-2xl border border-purple-100/50' >
                                <Image
                                    src={user?.image || imgAvater}
                                    alt='user'
                                    width={45}
                                    height={45}
                                    className='rounded-full ring-2 ring-purple-600'
                                />
                                <div>
                                    <p className='text-xs text-gray-500 font-medium'>Logged in as</p>
                                    <p className='text-base font-bold text-gray-800'>{user?.name}</p>
                                </div>
                            </motion.div>
                        )}

                        {/* Mobile Links */}
                        <div className='flex flex-col gap-3'>
                            {['/', '/courses', '/profile'].map((path, index) => (
                                <motion.div variants={itemVariants} key={path}>
                                    <NavLink className='block text-lg font-semibold text-gray-800 p-2 hover:bg-purple-50 rounded-xl transition-all' href={path}>
                                        {index === 0 ? 'Home' : index === 1 ? 'All Courses' : 'My Profile'}
                                    </NavLink>
                                </motion.div>
                            ))}
                        </div>

                        <hr className="border-gray-100" />

                        {/* Mobile Auth Buttons */}
                        <motion.div variants={itemVariants} className="w-full">
                            {user ? (
                                <button onClick={async () => await authClient.signOut()}
                                    className='w-full btn bg-linear-to-r to-purple-700 from-pink-700 text-white rounded-xl py-3 shadow-md border-none'>
                                    <Link href='/login' className='w-full block'>Log out</Link>
                                </button>
                            ) : (
                                <div className='flex flex-col gap-2 w-full'>
                                    <button className='w-full btn bg-gray-50 hover:bg-gray-100 text-gray-800 border border-gray-200 rounded-xl py-3'>
                                        <Link href='/login' className='w-full block'>Login</Link>
                                    </button>
                                    <button className='w-full btn bg-linear-to-r to-purple-700 from-pink-700 text-white rounded-xl py-3 shadow-md border-none'>
                                        <Link href='/register' className='w-full block'>Register</Link>
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Navbar;