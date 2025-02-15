
import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import inform from '../../../Data/dummy.json'
import Search from "@/app/components/Search";
import RelevantCategory from "@/app/components/RelevantCategory";

export interface TypeData {
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


    const filterCategory = data.filter((fil => fil.category === item?.category && fil.id !== item.id))
    const relevantCategory = filterCategory.splice(0, 5);


    return (
        <div className="flex flex-col ms-auto p-5">
            <Search data={data} />
            <div className='grid grid-cols-1 p-3 sm:ml-[170px]'>
                <h2 className="text-3xl font-bold">{item?.title}</h2>
                <Image src={`${item?.srcUrl}`} alt='Lorem' width={400} height={300}
                    className="mt-5 w-1/2 mx-auto sm:me-auto" />
                <p className="mt-5 ">
                    <span className="font-bold">{item?.description} </span>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis fugiat deleniti modi
                    autem ut, cumque praesentium doloribus ex doloremque, eveniet rem earum sunt reiciendis dicta
                    fuga facilis quos, minima voluptas!
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Id impedit, nesciunt facilis iusto
                    vitae minus dolore magni deserunt tenetur est vero natus aperiam voluptas. Dolores sapiente
                    dicta natus sit sint.
                </p>
                <h3 className="text-2xl font-bold mt-5">Lorem</h3>
                <p className="mt-5 ">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusantium sint enim ut quas deserunt
                    iure consequatur vero officiis molestias nihil ipsam necessitatibus dolorum perspiciatis reprehenderit
                    placeat, non, fugiat facere sapiente!Ad pariatur rem soluta voluptatibus id fugiat quas quis, libero
                    quaerat dolorem? Nam provident ratione consequatur. Perspiciatis molestias, cupiditate at officiis
                    architecto quasi! Molestiae enim amet ipsam exercitationem, ratione non!
                </p>
                <h3 className="font-bold text-2xl mt-5">İlgili Kategoriyle Haberler</h3>
                <RelevantCategory relevantCategory={relevantCategory} />
            </div>
        </div>

    )
}