import Link from 'next/link';
import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { FaFacebook } from 'react-icons/fa6';

const Footer = () => {
    return (
        <footer className='footer footer-center p-10 bg-purple-900 text-white text-center flex flex-col  my-20'>
            <div className='max-w-6xl mx-auto py-12 grid grid-cols-1 md:grid-cols-3 gap-8'>
                <div>
                    <h2 className='text-xl font-bold mb-3'>SkillSphere</h2>
                    <p className='text-purple-200 text-sm'>
                        Learn from industry experts and upgrade your skills today.
                    </p>
                </div>
                <div>
                    <h4 className='font-semibold mb-3'>Contact Us</h4>
                    <ul className='space-y-2 text-purple-200 text-sm'>
                        <li>support@skillsphere.com</li>
                        <li>01xxxxxxxxx</li>
                        <li>Dhaka, Bangladesh</li>
                    </ul>
                </div>

                <div className='flex flex-col justify-center items-center'>
                    <h1 className='font-semibold mb-3'>Follow Us</h1>
                    <div className='flex gap-4 mb-4 text-purple-200 text-sm'>
                        <a><FaFacebook /></a>
                        <a><FaLinkedin /></a>
                        <a><FaGithub /></a>
                    </div>
                    <div className='flex gap-4 text-purple-200 text-sm'>
                        <Link className='hover:text-white transition' href="/terms">Terms & Condition</Link>
                        <Link className='hover:text-white transition' href="/terms">Privacy plicy</Link>
                    </div>
                </div>
            </div>
            <div className='border-t border-purple-700 py-4 text-center text-purple-300 text-sm'>
                SkillSphere &copy; 2026 - All Right Reserved
            </div>


        </footer>
    );
};

export default Footer;