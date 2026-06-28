"use client"
import React from 'react';
import { FaBookOpen, FaRegClock } from 'react-icons/fa6';
import { MdTipsAndUpdates } from 'react-icons/md';

const LearningTips = () => {
    return (
        <div>
            <h2 className='font-bold text-3xl py-5 flex items-center gap-2'><MdTipsAndUpdates /> Learning Tips</h2>
            <div className='flex flex-col md:flex-row gap-3 justify-between'>
                <div className='w-full flex border border-gray-300 py-7 md:pr-30 rounded-2xl'>
                    <span className='text-6xl text-gray-600 bg-gray-200 h-20 mx-5 rounded-xl px-3 py-2'>
                        <FaBookOpen /></span>
                    <div>
                        <h2 className='font-bold text-xl'>Study Techniques</h2>
                        <p className='text-gray-500'>
                            Break problems down, practice consistently, build project, <br /> debug actively, review concepts, teach others, use spaced repetition, stay curious, avoid distraction
                            </p>
                    </div>
                </div>

                <div className='w-full flex border border-gray-300 py-7 md:pr-30 rounded-2xl'>
                    <span className='text-6xl text-gray-600 bg-gray-200 h-20 mx-5 rounded-xl px-3 py-2'>
                        <FaRegClock /></span>
                    <div>
                        <h2 className='font-bold text-xl'>Time Management</h2>
                        <p className='text-gray-500'>
                            Priortize tasks with the Time managment technique, set clear <br /> daily goals, and minimize distractions. Use Time Bloking for <br /> deep work and automate repetitive coding tasks to maximize productivity.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LearningTips;