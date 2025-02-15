"use client"

import React, { useMemo, useState } from 'react'
import SearchContent from './SearchContent';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

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

    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true)
    const [search, setSearch] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<string[]>([])
    const categories = Array.from(new Set(data.map(item => item.category)))

    const pathName = usePathname();
    const isDetailsPage = pathName.startsWith('/details/');

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
        <div className='flex flex-col md:flex-row '>
            <button
                className='fixed md:hidden p-2 m-2 bg-gray-800 text-white rounded-md z-50 top-0 right-0 w-1/12 ms-auto'
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                {isSidebarOpen ? 'X' : 'Aç'}
            </button>
            <div className={`fixed top-0 bottom-0 left-0 w-[200px]  overflow-y-auto text-center bg-gray-900 z-50 
                ${isSidebarOpen ? 'translate-x-0 ]' : '-translate-x-full '} transition-transform duration-300`}>
                <div className="text-gray-100 text-xl ">
                    <div className="p-2.5 mt-1 flex items-center">
                        <Link href={'/'}>
                            <h1 className='font-bold text-gray-200 text-[15] ml-3'>Haber Lorem</h1>
                        </Link>
                    </div>
                    <div className="my-2 bg-gray-600 h-[1px]"></div>
                </div>
                {!isDetailsPage && <div className="p-2.5 mx-2 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-gray-700 text-white">
                    <i className="fas fa-search"></i>
                    <input type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder='Haber Ara'
                        className='text-[15px] ml-4 w-full bg-transparent focus:outline-none'
                    />
                </div>}

                <div className='p-2.5 mt-3 flex item-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white'
                >
                    <i className="fa-solid fa-house"></i>
                    <Link href={"/"} className='text-[20px]  ml-4 text-gray-200 font-bold'>Ana Sayfa</Link>
                </div>
                <div className="my-4 bg-gray-600 h-[1px]"></div>
                <div
                    className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
                >
                    <i className="bi bi-chat-left-text-fill"></i>
                    <div className="flex justify-between w-full items-center">
                        <Link href={`/`} >Kategoriler</Link>
                    </div>
                </div>
                {!isDetailsPage &&
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
                    </ul>}
            </div>

            {!isDetailsPage && <SearchContent filteredData={filteredData} isSidebarOpen={isSidebarOpen} />}

        </div>
    )
}

export default Search
