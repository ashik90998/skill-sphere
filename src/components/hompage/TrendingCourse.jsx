import { getTrendingCourses } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaStar } from 'react-icons/fa6';


const PopulerCorses = async () => {
    const trendingCourses = await getTrendingCourses()
    return (
        <div>
            <div className='flex justify-between items-center mb-5'>
                <div className='flex items-center'>
                    <h2 className='text-3xl font-bold text-center'>
                        Trending Courses
                    </h2>
                </div>
                <Link
                    className='text-blue-800'
                    href='/trending'
                >
                    View All
                </Link>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {
                    trendingCourses.map((course) => {
                        return (
                            <div
                                key={course?.id}
                                className='bg-base-100 rounded-xl shadow-md card-body border-2 border-gray-200 gap-2 '>
                                <figure className='relative h-37 w-full'>
                                    <Image
                                        src={course?.image}
                                        alt="top courses"
                                        fill
                                        className='object-cover'
                                    />
                                </figure>

                                <div className="spacp-4 flex-1">
                                    <h2 className="font-bold text-xl line-clamp-1 mb-1">
                                        {course?.title}
                                    </h2>
                                    <div className='flex items-center'>
                                        <p className='flex flex-0 items-center gap-1 text-yellow-500'>
                                            <FaStar />
                                            <span className='text-black font-medium'>{course?.rating}</span>
                                        </p>
                                        <p className='text-gray-500 pl-2'>
                                            ({course?.students})
                                        </p>
                                    </div>
                                </div>
                            </div>)
                    })}
            </div>
        </div>
    );
};

export default PopulerCorses;