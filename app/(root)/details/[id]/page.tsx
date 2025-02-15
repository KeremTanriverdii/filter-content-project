

import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import inform from '../../../Data/dummy.json'
import Link from "next/link";

interface TypeData {
    id: string;
    title: string;
    description: string;
    category: string;
    srcUrl: string;
}

async function getData(): Promise<TypeData[]> {
    return inform
}

type Props = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const data = await getData();
    const filteredData = data.filter(item => item.id === params.id)
    if (filteredData.length > 0) {
        return {
            title: filteredData[0].title,
            description: filteredData[0].description,
        }
    } else {
        return {
            title: 'Not Found',
            description: 'Item not found'
        }
    }
}


export default async function Page({
    params,
}: {
    params: { id: string }
}) {
    const data = await getData();
    const item = data.find((item) => item.id === params.id)

    return (
        <div className='grid grid-cols-1 min-h-screen p-3'>
            <h2 className="text-3xl ">Haber Detayı</h2>

            <div className='rounded-xl shadow-lg mx-auto' >
                <div className='p-5 flex flex-col '>
                    <div className="rounded-xl overflow-hidden " >
                        <Image src={`${item?.srcUrl}`} alt='lorem' width={300} height={300} className='w-full' />
                    </div>
                    <h3 className='text-2xl font-medium mt-3'>{item?.title}</h3>
                    <p className='text-slate-500 text-lg mt-3'>{item?.description}</p>
                    {item?.category}
                    <div className='mx-auto'>
                        <Link href={`/`}>
                            <button
                                className='bg-slate-300 rounded-md'
                            >Geri Dön
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}