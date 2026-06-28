"use client"
import { useSpring, animated } from '@react-spring/web';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

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
];

const Banner = () => {
    const [current, setCurrent] = useState(0);

    // অটো স্লাইডার টাইম (৬ সেকেন্ড)
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 6000);

        return () => clearInterval(interval);
    }, []);

    const prevSlide = () => {
        setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    const nextSlide = () => {
        setCurrent((prev) => (prev + 1) % slides.length);
    };

    // React Spring Animations
    const titleAnimation = useSpring({
        from: { opacity: 0, transform: "translateY(40px)" },
        to: { opacity: 1, transform: 'translateY(0px)' },
        reset: true,
        key: current,
        config: { tension: 120, friction: 14 }
    });

    const descAnimation = useSpring({
        from: { opacity: 0, transform: "translateY(30px)" },
        to: { opacity: 1, transform: 'translateY(0px)' },
        reset: true,
        key: current,
        delay: 200,
        config: { tension: 120, friction: 14 }
    });

    const btnAnimation = useSpring({
        from: { opacity: 0, transform: "scale(0.9)" },
        to: { opacity: 1, transform: "scale(1)" },
        reset: true,
        key: current,
        delay: 400,
        config: { tension: 150, friction: 10 }
    });

    return (
        <div className="w-full relative overflow-hidden h-[60vh] md:h-[80vh] bg-gray-900">
            {/* 🛠️ প্রধান ফিক্সড এরিয়া: টোটাল উইডথ এবং স্লাইডিং ট্রানজিশন ক্যালকুলেশন */}
            <div
                className='flex h-full transition-transform duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)]'
                style={{
                    transform: `translateX(-${(current * 100) / slides.length}%)`,
                    width: `${slides.length * 100}%`
                }}
            >
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className='h-full flex-shrink-0 bg-cover bg-center relative'
                        style={{
                            backgroundImage: `url(${slide.img})`,
                            width: `${100 / slides.length}%` // 👈 প্রতিটি ইমেজ যেন স্ক্রিনের সমান উইডথ পায়
                        }}
                    >
                        {/* ডার্ক গ্রেডিয়েন্ট ওভারলে */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>

                        {/* টেক্সট কন্টেন্ট */}
                        <div className='relative z-10 text-white px-6 md:px-24 h-full flex flex-col justify-center max-w-4xl'>
                            <animated.h1
                                style={index === current ? titleAnimation : {}}
                                className='text-4xl md:text-7xl font-extrabold mb-4 md:mb-6 tracking-tight leading-tight bg-linear-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent'>
                                {slide.title}
                            </animated.h1>

                            <animated.p
                                style={index === current ? descAnimation : {}}
                                className='text-lg md:text-2xl text-gray-300 font-medium max-w-2xl mb-6 md:mb-8 leading-relaxed'>
                                {slide.desc}
                            </animated.p>

                            <animated.div style={index === current ? btnAnimation : {}}>
                                <Link
                                    href='/courses'
                                    className='inline-block btn bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-pink-100 font-semibold text-lg px-8 py-1 rounded-full border-none shadow-lg hover:shadow-purple-500/30 transition-all duration-300 hover:scale-105 active:scale-95'
                                >
                                    Explore Courses
                                </Link>
                            </animated.div>
                        </div>
                    </div>
                ))}
            </div>

            {/* লেফট/রাইট অ্যারো বাটন */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-3 rounded-full border border-white/20 transition-all active:scale-90 hidden md:block"
            >
                <HiChevronLeft size={28} />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-3 rounded-full border border-white/20 transition-all active:scale-90 hidden md:block"
            >
                <HiChevronRight size={28} />
            </button>

            {/* বটম ইন্ডিকেটর ডটস */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-3">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`h-2 rounded-full transition-all duration-500 ${current === index ? 'w-8 bg-purple-500' : 'w-2.5 bg-white/40 hover:bg-white/60'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Banner;