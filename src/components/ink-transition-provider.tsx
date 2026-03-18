"use client";

import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DotGrid } from "@/components/dot-grid";

interface InkTransitionContextType {
  trigger: (href: string, color: string, glowColor: string) => void;
}

const InkTransitionContext = createContext<InkTransitionContextType>({
  trigger: () => {},
});

type Phase = "idle" | "visible" | "hiding";

interface OverlayState {
  phase: Phase;
  color: string;
  glowColor: string;
}

export function InkTransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [overlay, setOverlay] = useState<OverlayState>({ phase: "idle", color: "", glowColor: "" });
  const [opacity, setOpacity] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (overlay.phase === "visible") {
      requestAnimationFrame(() => setOpacity(1));
    } else if (overlay.phase === "hiding") {
      setOpacity(0);
    }
  }, [overlay.phase]);

  const trigger = useCallback(
    (href: string, color: string, glowColor: string) => {
      setOpacity(0);
      setOverlay({ phase: "visible", color, glowColor });
      setTimeout(() => router.push(href), 600);
      setTimeout(() => setOverlay((prev) => ({ ...prev, phase: "hiding" })), 650);
      setTimeout(() => setOverlay((prev) => ({ ...prev, phase: "idle" })), 1150);
    },
    [router]
  );

  return (
    <InkTransitionContext.Provider value={{ trigger }}>
      {children}
      {overlay.phase !== "idle" && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            backgroundColor: "#000000",
            pointerEvents: "none",
            opacity,
            transition: overlay.phase === "visible"
              ? "opacity 550ms ease-in-out"
              : "opacity 450ms ease-out",
          }}
        >
          <DotGrid color={overlay.color} />
          <div
            style={{
              position: "absolute",
              inset: 0,
              boxShadow: `inset 0 0 500px 50px ${overlay.glowColor}`,
            }}
          />
        </div>
      )}
    </InkTransitionContext.Provider>
  );
}

export function useInkTransition() {
  return useContext(InkTransitionContext);
}
