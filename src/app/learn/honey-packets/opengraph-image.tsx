import { articleOg, articleAlt } from "@/lib/og";

export { size, contentType } from "@/lib/og";

export const alt = articleAlt("honey-packets");

export default function Image() {
  return articleOg("honey-packets");
}
