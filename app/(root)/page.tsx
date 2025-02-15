import { Suspense } from "react";
import Search from "../components/Search";
import inform from '../Data/dummy.json'
import { Skeleton } from "../components/ui/skeleton";

export interface TypeData {
  id: string;
  title: string;
  description: string;
  category: string;
  srcUrl: string;
}

async function getData(): Promise<TypeData[]> {
  return inform;
}

export default async function Home() {
  const data = await getData();
  return (
    <div className="">
      <Suspense fallback={<Skeleton />}>
        <Search data={data} />
      </Suspense>
    </div>
  );
}
