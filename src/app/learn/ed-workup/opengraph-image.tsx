import { articleOg, articleAlt } from "@/lib/og";

export { size, contentType } from "@/lib/og";

export const alt = articleAlt("ed-workup");

export default function Image() {
  return articleOg("ed-workup");
}
