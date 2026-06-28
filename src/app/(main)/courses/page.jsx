"use client"
import { getCourses } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { FaStar } from 'react-icons/fa6';
import { useEffect, useState } from 'react';

const AllCouses = () => {

    const [courses, setCourses] = useState([])
    const [search, setSearch] = useState('')
    const [searchQuery, setSearchQuery] = useState('')

    useEffect(() => {
        const loadCoursor = async () => {
            const data = await getCourses()
            setCourses(data)
        }
        loadCoursor();
    }, []);

    const handlesearch = () => {
        const results = courses.filter(course =>
            course.title.toLowerCase().includes(search.toLowerCase())
        );
        setSearchQuery(results)
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handlesearch()
        }
    }

    const filteredCourses = courses.filter(course =>
        course.title.toLowerCase().includes(search.toLowerCase())
    )


    return (
        <div className='w-10/12 lg:w-10/12 py-10 mx-auto'>
            <div className='flex flex-col md:flex-row justify-between items-center gap-4 mb-10 '>
                <h2 className='text-3xl font-bold'>All Courses</h2>
                <label className="input">

                    <input
                        type="search"
                        required placeholder="Search by title..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <button onClick={handlesearch}
                        className='p-2 h-full'>
                        <svg
                            className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.3-4.3"></path>
                            </g>
                        </svg>
                    </button>
                </label>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                {filteredCourses.map((course) => {
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

                            <div className="p-4 flex flex-col flex-grow">
                                <h2 className="font-bold text-xl line-clamp-1 mb-1">
                                    {course?.title}
                                </h2>
                                <p className='text-gray-600 line-clamp-2 mb-4'>
                                    {course?.description}
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

                                <div className="mt-4">
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
            {filteredCourses.length === 0 && (
                <p className='text-center mt-10 text-gray-600'>No course founded</p>
            )}
        </div>
    );
};

export default AllCouses;