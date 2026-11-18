import { articleOg, articleAlt } from "@/lib/og";

export { size, contentType } from "@/lib/og";

export const alt = articleAlt("wolverine-blend");

export default function Image() {
  return articleOg("wolverine-blend");
}
