
import { getCourseDetaisById } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaHeart } from 'react-icons/fa';
import { FaArrowLeft, FaStar } from 'react-icons/fa6';

const CoursesDetailPage = async ({ params }) => {
    const { id } = await params
    const course = await getCourseDetaisById(id)
    return (
        <div>
            <div className='w-11/12 md:w-10/12 mx-auto py-10'>
                <Link href='/courses' className='flex items-center gap-1 text-lg text-purple-700'><FaArrowLeft /> Back to Courses</Link>

                <div className='space-x-3 grid md:grid-cols-2 gap-3 bg-white p-5 border border-gray-300 rounded-xl shadow md:w-8/12'>
                    <div>
                        <Image
                            src={course?.image}
                            alt={course?.title}
                            width={500}
                            height={500}
                            className='rounded'
                        />
                    </div>
                    <div className='space-y-4'>
                        <h1 className='font-bold text-3xl'>{course?.title}</h1>

                        <div>
                            <div className='flex items-center gap-2'>
                                <Image
                                    src={course?.instructorImage}
                                    alt='instructor'
                                    width={40}
                                    height={40}
                                    className='rounded-full'
                                />
                                <p>{course?.instructor}</p>
                            </div>

                           <div className='flex items-center gap-2 mt-3'>
                                <p className='flex items-center gap-1 text-lg'><FaStar className='text-yellow-400' />
                                    {course?.rating}</p>
                                <p className='text-xs text-start text-gray-500'>({course?.duration})</p>
                           </div>
                            <p className='text-green-500 text-lg font-bold my-2'>Free</p>
                            <div className='flex items-center gap-4 text-4xl overflow-hidden'>
                                <button className='btn block px-20 bg-purple-700 rounded-md text-white'>Enrole Now</button>
                                <span>
                                    <FaHeart className='text-red-500' />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='shadow bg-white my-5 p-5 border border-gray-300 rounded-xl md:w-8/12'>
                    <div className='space-y-3'>
                        <h2 className='text-2xl font-bold'>About This Course</h2>
                        <p>{course?.description}</p>
                    </div>
                    <div className='grid grid-cols-2 md:grid-cols-4 my-5 gap-3'>
                        <div className='border border-gray-200 rounded-lg shadow text-center' >
                            <p className='text-sm text-gray-600'>Level</p>
                            <p className='font-semibold'>{course?.level}</p>
                        </div>
                        <div className='border border-gray-200 rounded-lg shadow text-center' >
                            <p className='text-sm text-gray-600'>Duration</p>
                            <p className='font-semibold'>{course?.duration}</p>
                        </div>
                        <div className='border border-gray-200 rounded-lg shadow text-center' >
                            <p className='text-sm text-gray-600'>Lectures</p>
                            <p className='font-semibold'>{course?.lectures}</p>
                        </div>
                        <div className='border border-gray-200 rounded-lg shadow text-center' >
                            <p className='text-sm text-gray-600'>Certificate</p>
                            <p className='font-semibold'>Yes</p>
                        </div>
                    </div>

                    <div className='bg-white p-5 rounded-xl shadow mt-6'>
                        <h1 className='text-xl font-bold mb-4'>Course Curriculum</h1>
                        
                        <div className='space-y-3'>
                            {[
                                "instroduction to Web Development",
                                "HTML & CSS Basics",
                                "JavaScript Fundamentals",
                                "React JS",
                                "Node.js & Express",
                                "MongoDB Bsics"
                            ].map((item, index) =>  (
                                <div key={index} className='flex justify-between border p-3 rounded-lg'>
                                    <p>
                                        {index + 1}. {item}
                                    </p>
                                    <span className='text-gray-500'>
                                        {Math.floor(Math.random() * 10) + 3} Lectures
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoursesDetailPage;