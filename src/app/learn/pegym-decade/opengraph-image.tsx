import { articleOg, articleAlt } from "@/lib/og";

export { size, contentType } from "@/lib/og";

export const alt = articleAlt("pegym-decade");

export default function Image() {
  return articleOg("pegym-decade");
}
