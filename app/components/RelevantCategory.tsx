import React from 'react'
import { TypeData } from '../(root)/details/[id]/page'
import Image from 'next/image'
import Link from 'next/link'


interface RelevantCategoryProps {
    relevantCategory: TypeData[]
}

const RelevantCategory = ({ relevantCategory }: RelevantCategoryProps) => {
    return (

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
            {relevantCategory.map(({ id, title, description, srcUrl, category }) => (
                <div className='rounded-xl shadow-lg border-3 border-white-500/100 flex flex-col'>
                    <div className='flex flex-col'>
                        <div className="rounded-xl border-white " >
                            <Link href={`details/${id}`}>
                                <Image src={srcUrl} alt='lorem' width={300} height={300} className='w-full min-h-[300px] aspect-[4/3] object-cover sm:aspect-[4/2]' />
                                <div className='hover:bg-transparent transition duration-300  bg-gray-900 opacity-25'>
                                </div>
                            </Link>

                            <div className="flex flex-col items-center">
                                <h4 className='text-xl center font-bold mt-3 p-2'>{title}</h4>
                                <p className='mt-3 p-2 font-medium text-md '>{description}</p>
                            </div>
                            <div className='p-2 bg-gray-100 w-full  hover:bg-transparent '>
                                <Link href={`details/${id}`}
                                    className='py-2 rounded-lg font-bold flex justify-center '
                                >Detaya Git
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default RelevantCategory