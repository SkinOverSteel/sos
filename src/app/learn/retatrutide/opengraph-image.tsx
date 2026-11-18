import { articleOg, articleAlt } from "@/lib/og";

export { size, contentType } from "@/lib/og";

export const alt = articleAlt("retatrutide");

export default function Image() {
  return articleOg("retatrutide");
}
