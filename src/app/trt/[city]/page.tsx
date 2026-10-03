import type { Metadata } from "next";
import { CityPage, cityMetadata, cityStaticParams } from "@/components/nearme/CityPage";

export const dynamicParams = false;

export function generateStaticParams() {
  return cityStaticParams("trt");
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city } = await params;
  return cityMetadata("trt", city);
}

export default async function Page({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  return <CityPage kind="trt" slug={city} />;
}
