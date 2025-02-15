"use client"
import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react'

const BackToTop = () => {
    const [height, setHeight] = useState<number>(0);
    const [scrollY, setScrollY] = useState<number>(0)
    const [clientWindow, setClientWindow] = useState<Window>();

    const handleEvent = useCallback(() => {
        setHeight(window.innerHeight);
        setScrollY(window.scrollY);
        setClientWindow(window);
    }, []);
    useEffect(() => {
        window.addEventListener("scroll", handleEvent);
        handleEvent();
        return () => {
            window.removeEventListener('scroll', handleEvent)
        }
    }, []);

    const showArrowTop = scrollY > height ? true : false;
    const handleClick = () => {
        clientWindow?.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }
    return (
        <button
            onClick={handleClick}
            className={`${showArrowTop ? "fixed text-black bottom-10 right-2 bg-red-200 hover:bg-red-300 z-50 rounded-3xl h-5 w-10 mb-10 me-1"
                : "hidden"}`}
        >
            <span>
                <Image src={"/arrowup.png"} width={50} height={50} alt='top' />
            </span>
        </button>
    )
}

export default BackToTop