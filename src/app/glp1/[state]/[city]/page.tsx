import type { Metadata } from "next";
import { CityPage, cityMetadata, cityStaticParams } from "@/components/nearme/CityPage";

export const dynamicParams = false;

export function generateStaticParams() {
  return cityStaticParams("glp1");
}

type Params = Promise<{ state: string; city: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { state, city } = await params;
  return cityMetadata("glp1", state, city);
}

export default async function Page({ params }: { params: Params }) {
  const { state, city } = await params;
  return <CityPage kind="glp1" state={state} slug={city} />;
}
