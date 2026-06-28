"use client"
import { authClient } from '@/lib/auth-client';
import Link from 'next/link';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { toast, ToastContainer } from 'react-toastify';

const LoginPage = () => {
    const {
        register,
        handleSubmit,
        watch, formState: { errors } } = useForm();

    const [isShowPassword, setIsShowPassword] = useState(false)

    const handleLoginFunc = async (data) => {
        const { data: res, error } = await authClient.signIn.email({
            email: data.email,
            password: data.password,
            rememberMe: true,
            callbackURL: "/",
        });
        if (error) {
            toast.error('Login Failed' + error.message)
        } else {
            toast.success("login Successful ")
        }
    }
    const handleGoogleSignin = async () => {
        await authClient.signIn.social({
            provider: "google",
        });
    }


    return (
        <div className='min-h-screen bg-gray-50 py-10 items-center'>
            <ToastContainer />
            <div className='bg-white p-6 border border-gray-300 rounded-xl shadow-sm md:max-w-2xl mx-auto'>
                <h2 className='font-bold text-3xl px-4 text-center mb-3'>Welcome back</h2>
                <h2 className='font-semibold text-lg px-4 text-center mb-3'>Login to your account</h2>

                <form
                    className='space-y-4 w-80 mx-auto'
                    onSubmit={handleSubmit(handleLoginFunc)}>

                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Your Email address</legend>
                        <input
                            type="email"
                            className="input"
                            placeholder="Type your email"
                            {...register('email', { required: "pleas enter your email" })}
                        />
                        {errors.email && <p className='text-red-600'>{errors.email.message}</p>}
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Your Email Password</legend>
                        <input

                            type={isShowPassword ? "text" : "password"}
                            className="input"
                            placeholder="Type your password"
                            {...register('password', { required: "pleas enter your password" })}
                        />
                        {errors.password &&
                            <p className='text-red-600'>{errors.password.message}
                            </p>}

                        <p
                            onClick={() => setIsShowPassword(!isShowPassword)}
                            className="label cursor-pointer ">
                            Show Password
                            <span>
                                {isShowPassword ? <IoEye /> : <IoEyeOff />}
                            </span>
                        </p>
                    </fieldset>

                    <button className="btn w-full block bg-purple-800 text-white rounded-md">
                        Login</button>
                </form>


                <div className="divider">Or continue with</div>

                <div className='my-2'>
                    <button onClick={handleGoogleSignin}
                        className='flex items-center btn w-full block border border-gray-300'>
                        <FcGoogle className='text-xl' />
                        Google
                    </button>
                </div>

                <p>Don't have an account? <Link href='/register' className='text-pink-700'>Register</Link> </p>
            </div>
        </div>
    );
};

export default LoginPage;