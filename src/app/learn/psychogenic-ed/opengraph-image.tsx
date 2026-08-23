import { articleOg, articleAlt } from "@/lib/og";

export { size, contentType } from "@/lib/og";

export const alt = articleAlt("psychogenic-ed");

export default function Image() {
  return articleOg("psychogenic-ed");
}
