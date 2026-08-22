import { articleOg, articleAlt } from "@/lib/og";

export { size, contentType } from "@/lib/og";

export const alt = articleAlt("what-it-costs");

export default function Image() {
  return articleOg("what-it-costs");
}
