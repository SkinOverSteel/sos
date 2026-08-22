import { articleOg, articleAlt } from "@/lib/og";

export { size, contentType } from "@/lib/og";

export const alt = articleAlt("peyronies-disease");

export default function Image() {
  return articleOg("peyronies-disease");
}
