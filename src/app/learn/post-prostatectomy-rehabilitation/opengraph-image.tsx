import { articleOg, articleAlt } from "@/lib/og";

export { size, contentType } from "@/lib/og";

export const alt = articleAlt("post-prostatectomy-rehabilitation");

export default function Image() {
  return articleOg("post-prostatectomy-rehabilitation");
}
