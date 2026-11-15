import { pageOg } from "@/lib/og";

export { size, contentType } from "@/lib/og";

export const alt = "Lab checklists: what gets drawn, and why · Skin Over Steel";

export default function Image() {
  return pageOg("The workup", "Lab checklists: what gets drawn, and why", "Established", "established");
}
