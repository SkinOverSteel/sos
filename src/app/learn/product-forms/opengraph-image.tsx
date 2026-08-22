import { articleOg, articleAlt } from "@/lib/og";

export { size, contentType } from "@/lib/og";

export const alt = articleAlt("product-forms");

export default function Image() {
  return articleOg("product-forms");
}
