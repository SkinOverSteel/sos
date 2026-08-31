import { articleOg, articleAlt } from "@/lib/og";

export { size, contentType } from "@/lib/og";

export const alt = articleAlt("death-grip");

export default function Image() {
  return articleOg("death-grip");
}
