"use client";

import { createContext, useContext, useState } from "react";

const AnimationContext = createContext();

export function AnimationProvider({ children }) {
  const [userPaused, setUserPaused] = useState(false);

  return (
    <AnimationContext.Provider value={{ userPaused, setUserPaused }}>
      {children}
    </AnimationContext.Provider>
  );
}

export function useAnimation() {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error("useAnimation must be used within AnimationProvider");
  }
  return context;
}
