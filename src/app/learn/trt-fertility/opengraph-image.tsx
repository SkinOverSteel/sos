import { articleOg, articleAlt } from "@/lib/og";

export { size, contentType } from "@/lib/og";

export const alt = articleAlt("trt-fertility");

export default function Image() {
  return articleOg("trt-fertility");
}
