import { articleOg, articleAlt } from "@/lib/og";

export { size, contentType } from "@/lib/og";

export const alt = articleAlt("atx-304");

export default function Image() {
  return articleOg("atx-304");
}
