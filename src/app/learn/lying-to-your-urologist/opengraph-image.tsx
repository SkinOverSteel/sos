import { articleOg, articleAlt } from "@/lib/og";

export { size, contentType } from "@/lib/og";

export const alt = articleAlt("lying-to-your-urologist");

export default function Image() {
  return articleOg("lying-to-your-urologist");
}
