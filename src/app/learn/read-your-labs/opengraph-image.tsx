import { articleOg, articleAlt } from "@/lib/og";

export { size, contentType } from "@/lib/og";

export const alt = articleAlt("read-your-labs");

export default function Image() {
  return articleOg("read-your-labs");
}
