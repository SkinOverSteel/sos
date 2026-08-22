import { articleOg, articleAlt } from "@/lib/og";

export { size, contentType } from "@/lib/og";

export const alt = articleAlt("telemedicine-visit");

export default function Image() {
  return articleOg("telemedicine-visit");
}
