"use client"
import { authClient } from '@/lib/auth-client';
import React, { useState } from 'react';

const UpdateProfilePage = () => {
    const { data: session } = authClient.useSession()

    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState("")


    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true)
        setSuccess(false)
        setError("")

        const formData = new FormData(e.target)
        const name = formData.get("name")
        const image = formData.get("image")

        const { data, error } = await authClient.updateUser({ name, image })

        if (error) {
            setError('Dont Update: ' + error.message)
        } else {
            setSuccess(true)
        }

        setLoading(false)
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-50 px-4'>
            <div className='w-full max-w-xl bg-white p-6 md:p-8 rounded-xl shadow border'>
                <h2 className='text-2xl md:text-3xl font-bold text-center mb-6'>
                    Update Profile
                </h2>
                {success && (
                    <div className='mb-4 p-3 bg-green-100 text-green-700 rounded-lg text-sm text-center'>
                        Profile update successfull
                    </div>
                )}

                {error && (
                    <div className='mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm text-center'>
                        {error}
                    </div>
                )}
                <form onSubmit={handleUpdate} className='space-y-5'>
                    <div>
                        <label
                            htmlFor='name'
                            className='block mb-1 font-medium text-gray-700'>
                            Name
                        </label>
                        <input type="text"
                            name="name"
                            id='name'
                            defaultValue={session?.user?.name || ""}
                            placeholder='Enter Your name'
                            className='w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-purple-500'
                        />
                    </div>

                    <div>
                        <label
                            htmlFor='image'
                            className='block mb-1 font-medium text-gray-700'>
                            Image URL
                        </label>
                        <input type="text"
                            id='image'
                            name="image"
                            defaultValue={session?.user?.image || ""}
                            placeholder='Enter Your Image URL'
                            className='w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-purple-500'
                        />
                    </div>

                    <button
                        type='submit'
                        disabled={loading}
                        className='w-full bg-purple-700 text-white py-2 rounded-lg hover:bg-purple-800 transition disabled:opacity-60 disabled:cursor-not-allowed'
                    >
                        {loading ? 'Updating...' : 'Update information'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateProfilePage;