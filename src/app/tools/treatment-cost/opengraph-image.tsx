import { toolOg, toolAlt } from "@/lib/og";

export { size, contentType } from "@/lib/og";

export const alt = toolAlt("treatment-cost");

export default function Image() {
  return toolOg("treatment-cost");
}
