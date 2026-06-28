"use client"
import { useSpring, animated } from '@react-spring/web';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const slides = [
    {
        img: "/banner-1.jpg",
        title: "Upgrade your skills Today",
        desc: "Discover top quality courses and take your skills to the next level."
    },
    {
        img: "/banner-bg-2.png",
        title: "Learn Anytime, Anywhere",
        desc: "Access world-class courses from anywhere at your own pace.",
    },

]

const Banner = () => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length)
        }, 5000);

        return () => clearInterval(interval)
    }, [])

    const titleAnimation = useSpring({
        from: { opacity: 0, transform: "translateY(-30px)" },
        to: { opacity: 1, transform: 'translateY(0px)' },
        reset: true,
        key: current,
        config: { transion: 80, friction: 20 }
    })
    const descAnimation = useSpring({
        from: { opacity: 0, transform: "translateY(-30px)" },
        to: { opacity: 1, transform: 'translateY(0px)' },
        reset: true,
        key: current,
        delay: 150,
        config: { transion: 80, friction: 20 }
    })
    const btnAnimation = useSpring({
        from: { opacity: 0 },
        to: { opacity: 1 },
        reset: true,
        key: current,
        delay: 500,
        config: { transion: 80, friction: 20 }
    })

    return (
        <div className="w-full mt-10 flex justify-center">
            <div className="w-11/12 rounded overflow-hidden md:h-[70vh]">

                <div
                    className='flex h-full transition-transform duration-700 ease-in-out'
                    style={{
                        transform: `translateX(-${current * 100}%)`
                    }}
                >
                    {slides.map((slide, index) => (
                        <div
                            key={index}
                            className='w-full flex-shrink-0 bg-cover bg-center'
                            style={{ backgroundImage: `url(${slide.img})` }}
                        >
                            <div className='text-white md:pl-20 p-5 h-full flex flex-col justify-center'>
                                <animated.h1
                                    style={index === current ? titleAnimation : {} }
                                    className='text-3xl md:text-6xl font-bold md:mb-9'>
                                    {slide.title}
                                </animated.h1>

                                <animated.p 
                                    style={index === current ? descAnimation : {}}
                                className='text-xl'>{slide.desc}</animated.p>

                                <animated.button
                                    style={index === current ? btnAnimation : {}}
                                 className='btn bg-purple-700 text-white rounded-lg mt-5 border-none w-fit'>
                                    <Link href='/courses'>Explore Courses</Link>
                                </animated.button>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    );
};

export default Banner;