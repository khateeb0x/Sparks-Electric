"use client";

import dynamic from "next/dynamic";

const AmbientCanvas = dynamic(() => import("@/components/3d/AmbientCanvas"), {
  ssr: false,
});

export function AmbientCanvasMount() {
  return <AmbientCanvas />;
}
