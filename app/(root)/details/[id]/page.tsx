"use client"
import { useRouter, useSearchParams } from "next/navigation";


export default function Page({ params }: { params: { id: string } }) {
    const { id } = params;
    const searchParams = useSearchParams();

    const title = searchParams.get('title');
    const description = searchParams.get('description');
    const category = searchParams.get('category');
    return (
        <div>
            {title}
        </div>
    )
}