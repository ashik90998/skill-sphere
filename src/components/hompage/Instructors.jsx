
import { getTopCourses} from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaChalkboardTeacher } from 'react-icons/fa';
import { FaStar } from 'react-icons/fa6';

const Instructors = async () => {
    const topInstruntors = await getTopCourses()

    return (
        <div className=''>
            <div className='flex justify-between items-center'>
                <div className='flex items-center'>
                    <FaChalkboardTeacher />
                    <h2 className='font-bold text-3xl py-5 flex items-center gap-2'>Top Instructors</h2>
                </div>
                <Link
                    className='text-blue-800'
                    href='/instructors'
                >
                    View All
                </Link>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 '>
                {
                    topInstruntors.map((instructor) => {
                        return (
                            <div key={instructor.id}
                                className="bg-base-100 shadow-lg border border-gray-200 flex gap-5  items-center p-2 rounded ">
                                <Image
                                    src={instructor?.instructorImage}
                                    alt="instructor"
                                    width={80}
                                    height={80}
                                    className='rounded-full '
                                />
                                <div className="">
                                    <h2 className="text-lg font-bold">{instructor?.instructor}</h2>
                                    <p className='text-gray-600 text-sm'>{instructor?.title}</p>
                                    <div className='flex gap-2 items-center mt-3'>
                                        <p className='flex items-center gap-1 text-lg '><FaStar className='text-yellow-400' />
                                            {instructor?.rating}</p>
                                        <p className='text-xs text-start text-gray-500'>({instructor?.students} students)</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default Instructors;