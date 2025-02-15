"use client"

import React, { useMemo, useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import BackToTop from './BackToTop';

interface TypeData {
    id: string;
    title: string;
    description: string;
    category: string;
    srcUrl: string;
}

interface SearchProps {
    data: TypeData[];
}

const Search = ({ data }: SearchProps) => {
    const [search, setSearch] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<string[]>([])
    const categories = Array.from(new Set(data.map(item => item.category)))


    const handleCategoryChange = (category: string) => {
        setSelectedCategory(prevState =>
            prevState.includes(category)
                ? prevState.filter(c => c !== category)
                : [...prevState, category]
        )
    }


    const filteredData = useMemo(() => {
        return data.filter((item) => {
            const matchesCategory = selectedCategory.length === 0 || selectedCategory.includes(item.category);
            const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase());
            return matchesCategory && matchesSearch
        })
    }, [search, selectedCategory, data])

    return (
        <div className='flex flex-col md:flex-row min-h-screen '>
            <div className="fixed top-0 bottom-0 left-0 w-[200px]  overflow-y-auto text-center bg-gray-900 z-50  ">
                <div className="text-gray-100 text-xl ">
                    <div className="p-2.5 mt-1 flex items-center">
                        <i className='px-2 py-1 rounded-md bg-blue-600'></i>
                        <h1 className='font-bold text-gray-200 text-[15] ml-3'>Haber Lorem</h1>
                    </div>
                    <div className="my-2 bg-gray-600 h-[1px]"></div>
                </div>
                <div className="p-2.5 mx-2 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-gray-700 text-white">
                    <i className="fas fa-search"></i>
                    <input type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder='Haber başlığı aratabilirsiniz.'
                        className='text-[15px] ml-4 w-full bg-transparent focus:outline-none'
                    />
                </div>
                <div className='p-2.5 mt-3 flex item-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white'
                >
                    <i className="fa-solid fa-house"></i>
                    <span className='text-[15px] sm:text-[10px] ml-4 text-gray-200 font-bold'>Ana Sayfa</span>
                </div>
                <div className="my-4 bg-gray-600 h-[1px]"></div>
                <div
                    className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
                >
                    <i className="bi bi-chat-left-text-fill"></i>
                    <div className="flex justify-between w-full items-center">
                        <span className="text-[15px] ml-4 text-gray-200 font-bold">Kategoriler</span>
                        <span className="text-sm rotate-180" id="arrow">
                            <i className="bi bi-chevron-down"></i>
                        </span>
                    </div>
                </div>
                <ul className="text-left text-sm mt-2 w-4/5 mx-auto text-gray-200 font-bold">
                    {categories.map((category, index) => (
                        <li key={index} className='mt-2'>
                            <label >
                                <input type='checkbox'
                                    checked={selectedCategory.includes(category)}
                                    onChange={() => handleCategoryChange(category)}
                                />
                                {category}
                            </label>
                        </li>
                    ))}
                </ul>
            </div>
            <main className='flex-1 ml-[220px]  md:ml-[270px]'>
                {filteredData.length > 0 ? (
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-3'>
                        {filteredData.map((item, index) => (
                            <div key={index} className='rounded-xl shadow-lg border-3 border-white-500/100 flex flex-col h-full'>
                                <div className=' flex flex-col'>
                                    <div className="rounded-xl border-white overflow-hidden " >
                                        <div className='relative'>
                                            <Link href={`details/${item.id}`}>
                                                <Image src={item.srcUrl} alt='lorem' width={300} height={300} className='w-full' />
                                                <div className='hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25'>
                                                </div>
                                            </Link>

                                            <div className='text-xs sm:text-[10px] absolute top-0 right-0 bg-indigo-600 px-4 py-2 text-white mt-3 mr-3 hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out'>
                                                {item.category}
                                            </div>
                                        </div>
                                    </div>
                                    <h3 className='text-base sm:text-[12px] font-medium mt-3'>{item.title}</h3>

                                    <p className='text-lg mt-3 flex-grow'>{item.description}</p>
                                    <div className='py-1 items-center justify-between bg-gray-100 mt-auto'>
                                        <Link href={`details/${item.id}`}
                                            className='py-2 rounded-md w-full'
                                        >Detaya Git
                                        </Link>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>
                        Oooops bir sonuç bulunamadı!
                    </p>
                )}
            </main>
            <BackToTop />
        </div>
    )
}

export default Search
