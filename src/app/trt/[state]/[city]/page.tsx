import type { Metadata } from "next";
import { CityPage, cityMetadata, cityStaticParams } from "@/components/nearme/CityPage";

// Prerender only the busiest cities (generateStaticParams); the rest render on
// first request and are then cached (ISR), keeping the long tail out of each
// deployment's build output. Unknown/ineligible slugs still 404 in CityPage.
export const dynamicParams = true;

export function generateStaticParams() {
  return cityStaticParams("trt");
}

type Params = Promise<{ state: string; city: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { state, city } = await params;
  return cityMetadata("trt", state, city);
}

export default async function Page({ params }: { params: Params }) {
  const { state, city } = await params;
  return <CityPage kind="trt" state={state} slug={city} />;
}
