"use client";

import dynamic from "next/dynamic";

/** The Log tool as an on-demand chunk, so linking to /log from the header does not ship it everywhere. */
export const LogTool = dynamic(() => import("./LogTool").then((m) => m.LogTool), {
  loading: () => <div aria-hidden="true" style={{ minHeight: 420 }} />,
});
