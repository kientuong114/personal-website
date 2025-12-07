"use client";

import dynamic from "next/dynamic";

const FaultyTerminal = dynamic(() => import("@/components/FaultyTerminal"), {
  ssr: false,
});

export default function FaultyTerminalWrapper() {
  return (
    <FaultyTerminal
      scale={4}
      gridMul={[2, 1]}
      digitSize={2}
      timeScale={0.3}
      pause={false}
      scanlineIntensity={0.1}
      glitchAmount={1}
      flickerAmount={1}
      noiseAmp={1}
      chromaticAberration={0}
      dither={0}
      curvature={0.1}
      tint="#eeeeee"
      mouseReact={false}
      pageLoadAnimation={false}
      brightness={1}
      style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "110%", zIndex: -1 }}
    />
  );
}
