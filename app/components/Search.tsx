"use client"

import React, { useState } from 'react'
import Link from 'next/link';
import inform from '../(root)/Data/dummy.json'
import { useRouter } from 'next/navigation';

interface TypeData {
    id: string;
    title: string;
    description: string;
    category: string;
}

const Search = () => {
    const data: TypeData[] = inform;
    const router = useRouter()
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
    const filteredData = data.filter(item => {
        const matchesCategory = selectedCategory.length === 0 || selectedCategory.includes(item.category);
        const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase());
        return matchesCategory && matchesSearch
    })

    const handleClick = (item: TypeData) => {
        router.push(`/details/${item.id}?title=${item.title}&description=${item.description}&category=${item.category}`);
    }
    return (
        <div className='flex min-h-screen'>
            <aside className='w-52 border-r '>
                <h3 className='mb-3 '>Kategoriler</h3>
                {categories.map((category, index) => (
                    <label key={index} className='block mb-2'>
                        <input type='checkbox'
                            checked={selectedCategory.includes(category)}
                            onChange={() => handleCategoryChange(category)}
                            className='text-black' />
                        {category}
                    </label>
                ))}
            </aside>
            <main className=''>
                <input type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className='w-full px-3 py-2 border rounded-md focus:outline-none mb-5'
                />
            </main>
            <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ms-3 mt-12'>
                {filteredData.map((item, index) => (
                    <div key={index} className='card rounded-md shadow-sm p-4 '>
                        <div>
                            {item.title}
                        </div>
                        <div>{item.description}</div>
                        <div>{item.category}</div>
                        <button onClick={() => handleClick(item)}>Detaya Git</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Search
