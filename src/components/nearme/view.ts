/** Map view types and the national bounding box, importable without pulling in the map itself. */
export type Bbox = { south: number; west: number; north: number; east: number };
export const US_VIEW: Bbox = { south: 24.0, west: -125.5, north: 49.8, east: -66.5 };
