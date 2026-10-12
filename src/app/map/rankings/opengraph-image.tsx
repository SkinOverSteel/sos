import { rankingsOg, rankingsAlt } from "@/lib/og";

export { size, contentType } from "@/lib/og";

export const alt = rankingsAlt();

export default function Image() {
  return rankingsOg();
}
