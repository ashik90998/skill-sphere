import { getTopCourses } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaStar } from 'react-icons/fa6';


const PopulerCorses = async () => {
    const topCourses = await getTopCourses()
    return (
        <div>
            <div className='flex justify-between items-center mb-5'>
                <div className='flex items-center'>
                    <h2 className='text-3xl font-bold text-center'>
                        🔥 Popular Courses</h2>

                </div>
                <Link
                    className='text-blue-800'
                    href='/courses'
                >
                    View All
                </Link>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {
                    topCourses.map((course) => {
                        return (
                            <div
                                key={course?.id}
                                className='bg-base-100 rounded-xl shadow-md hover:shadow-2xl transform-3d overflow-hidden card-body border-2 border-gray-200 gap-2 '>
                                <figure className='relative h-54 w-full'>
                                    <Image
                                        src={course?.image}
                                        alt="top courses"
                                        fill
                                        className='object-cover'
                                    />
                                </figure>

                                <div className="spacp-4 flex flex-col flex-growe-y-2">
                                    <h2 className="font-bold text-xl line-clamp-1 mb-1">
                                        {course?.title}
                                    </h2>
                                    <p className='text-gray-600 line-clamp-2 mb-4'>{course?.description}
                                    </p>

                                    <div className='flex items-center justify-between mt-auto'>
                                        <div className='flex gap-2 items-center'>
                                            <Image
                                                src={course?.instructorImage}
                                                alt="instructor" width={35}
                                                height={35}
                                                className='rounded-full'
                                            />
                                            <h3 className='font-semibold text-sm'>
                                                {course?.instructor}
                                            </h3>
                                        </div>
                                        <div className='flex flex-col items-end'>
                                            <p className='flex items-center gap-1 text-yellow-500'>
                                                <FaStar />
                                                <span className='text-black font-medium'>{course?.rating}</span>
                                            </p>
                                            <p className='text-[10px] text-gray-500'>
                                                ({course?.duration})
                                            </p>
                                        </div>
                                    </div>

                                    <div className="my-4">
                                        <button className="btn btn-primary w-full block">
                                            <Link href={`/cours/${course?.id}`} className='block'>
                                                View details
                                            </Link>
                                        </button>
                                    </div>
                                </div>
                            </div>)
                    })}
            </div>
        </div>
    );
};

export default PopulerCorses;