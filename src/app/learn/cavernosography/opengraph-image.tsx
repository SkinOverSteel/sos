import { articleOg, articleAlt } from "@/lib/og";

export { size, contentType } from "@/lib/og";

export const alt = articleAlt("cavernosography");

export default function Image() {
  return articleOg("cavernosography");
}
