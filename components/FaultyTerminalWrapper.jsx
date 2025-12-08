"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useAnimation } from "@/components/AnimationContext";

const FaultyTerminal = dynamic(() => import("@/components/FaultyTerminal"), {
  ssr: false,
});

export default function FaultyTerminalWrapper() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { userPaused } = useAnimation();

  useEffect(() => {
    // Check if user prefers reduced motion
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(motionQuery.matches);

    // Listen for changes to the preference
    const handleMotionChange = (e) => setPrefersReducedMotion(e.matches);
    motionQuery.addEventListener("change", handleMotionChange);

    // Check if viewport is mobile size
    const mobileQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mobileQuery.matches);

    // Listen for viewport changes
    const handleMobileChange = (e) => setIsMobile(e.matches);
    mobileQuery.addEventListener("change", handleMobileChange);

    return () => {
      motionQuery.removeEventListener("change", handleMotionChange);
      mobileQuery.removeEventListener("change", handleMobileChange);
    };
  }, []);

  const isPaused = prefersReducedMotion || isMobile || userPaused;

  return (
    <>
      <FaultyTerminal
        scale={4}
        gridMul={[2, 1]}
        digitSize={2}
        timeScale={0.2}
        pause={isPaused}
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
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        zIndex: -1,
        transform: "translate3d(0, 0, 0)",
        willChange: "transform"
      }}
    />
    </>
  );
}
