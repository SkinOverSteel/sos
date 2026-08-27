import { articleOg, articleAlt } from "@/lib/og";

export { size, contentType } from "@/lib/og";

export const alt = articleAlt("apomorphine-troches");

export default function Image() {
  return articleOg("apomorphine-troches");
}
