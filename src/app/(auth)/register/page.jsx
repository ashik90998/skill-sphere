"use client"
import { authClient } from '@/lib/auth-client';
import Link from 'next/link';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { IoEye, IoEyeOff } from 'react-icons/io5';

const RegisterPage = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors } } = useForm()

    const [isShowPassword, setIsShowPassword] = useState(false)

    const handleRegisterFunc = async (data) => {
        const { email, name, photo, password } = data;

        const { data: res, error } =
            await authClient.signUp.email({
                name: name,
                email: email,
                password: password,
                image: photo,
                callbackURL: "/",
            });

        if (error) {
            alert(error.message)
        }
        if (res) {
            alert('Registered successful')
        }
    }

    const handleGoogleSignin = async () => {
        await authClient.signIn.social({
            provider: "google",
        });
    }
    return (
        <div className='min-h-screen bg-gray-50 py-10 items-center'>
            <div className='bg-white p-6 border border-gray-300 rounded-xl shadow-sm md:max-w-2xl mx-auto'>
                <h2 className='font-bold text-3xl px-4 text-center mb-3'>
                    Creat an account
                </h2>
                <h2 className='font-semibold text-lg px-4 text-center mb-3 text-gray-700'>
                    Register to get started
                </h2>
                <form
                    className='space-y-4 w-80 mx-auto'
                    onSubmit={handleSubmit(handleRegisterFunc)}>

                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">
                            Your Name
                        </legend>
                        <input
                            type="text"
                            className="input"
                            placeholder="Type your Name"
                            {...register('name',
                                { required: "pleas type your Name" }
                            )}
                        />
                        {errors.name &&
                            <p className='text-red-600'>
                                {errors.name.message}
                            </p>}
                    </fieldset>

                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Your Photo url</legend>
                        <input
                            type="text"
                            className="input"
                            placeholder="enter your Photo url"
                            {...register('photo',
                                { required: "pleas enter your Photo url" }
                            )}
                        />
                        {errors.photo &&
                            <p className='text-red-600'>
                                {errors.photo.message}
                            </p>}
                    </fieldset>

                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Your Email address</legend>
                        <input
                            type="email"
                            className="input"
                            placeholder="Type your email"
                            {...register('email',
                                { required: "pleas enter your email" }
                            )}
                        />
                        {errors.email &&
                            <p className='text-red-600'>
                                {errors.email.message}
                            </p>}
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">
                            Your Email Password
                        </legend>
                        <input
                            type={isShowPassword ? "text" : "password"}
                            className="input"
                            placeholder="Type your password"
                            {...register('password',
                                { required: "pleas enter your password" }
                            )}
                        />
                        {errors.password &&
                            <p className='text-red-600'>
                                {errors.password.message}
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
                        Register</button>
                </form>

                <div className="divider">Or continue with</div>

                <div className='my-2'>
                    <button onClick={handleGoogleSignin}
                        className='flex items-center btn w-full block border border-gray-300'>
                        <FcGoogle className='text-xl' />
                        Google
                    </button>
                </div>

                <p>Already have an account? <Link href='/login' className='text-pink-700'>Login</Link> </p>
            </div>
        </div>
    );
};

export default RegisterPage;