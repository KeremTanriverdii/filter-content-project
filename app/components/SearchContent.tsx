import Image from "next/image";
import Link from "next/link";
import { TypeData } from "../(root)/page";

interface SearchContentProps {
    filteredData: TypeData[];
    isSidebarOpen: boolean;
}

const SearchContent = ({ filteredData, isSidebarOpen }: SearchContentProps) => {
    return (
        <div>
            <main className={`transition-all duration-300  mt-10 ${isSidebarOpen ? 'sm:ml-[200px] z-0' : 'ml-0'}`}>
                {filteredData.length > 0 ? (
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 mt-3 '>
                        {filteredData.map((item, index) => (
                            <div key={index} className='rounded-md bg-blue-100 shadow-2xl ml-1 mr-1 flex flex-col h-full'>
                                <div className='flex flex-col p-5'>
                                    <div className="rounded-xl border-white " >

                                        <div className='relative'>
                                            <Link href={`details/${item.id}`}>
                                                <Image src={item.srcUrl} alt='lorem' width={300} height={300} className='w-full aspect-[4/3] object-cover z-0' />
                                                <div className='hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25'>
                                                </div>
                                            </Link>

                                            <div className='text-xs sm:text-[10px] absolute  top-0 right-0 bg-indigo-600 px-4 py-2 text-white mt-3 mr-3 hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out'>
                                                {item.category}
                                            </div>
                                        </div>

                                        <h4 className='text-xl flex justify-center font-bold mt-3 p-2'>{item.title}</h4>
                                        <p className='mt-3 p-2 font-medium text-md'>{item.description}</p>
                                        <div className='p-2 bg-gray-100 w-full hover:bg-transparent'>
                                            <Link href={`details/${item.id}`}
                                                className='py-2 rounded-lg font-bold flex justify-center '
                                            >Detaya Git
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex justify-center ml-2 ">
                        <p>
                            Oooops bir sonuç bulunamadı!
                        </p>
                    </div>
                )}
            </main>
        </div>
    )
}

export default SearchContent