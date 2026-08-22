import { articleOg, articleAlt } from "@/lib/og";

export { size, contentType } from "@/lib/og";

export const alt = articleAlt("testosterone-therapy");

export default function Image() {
  return articleOg("testosterone-therapy");
}
