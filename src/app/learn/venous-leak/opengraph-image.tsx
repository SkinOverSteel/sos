import { articleOg, articleAlt } from "@/lib/og";

export { size, contentType } from "@/lib/og";

export const alt = articleAlt("venous-leak");

export default function Image() {
  return articleOg("venous-leak");
}
