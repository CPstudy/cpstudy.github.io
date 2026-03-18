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

interface OverlayState {
  active: boolean;
  color: string;
  glowColor: string;
}

export function InkTransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [overlay, setOverlay] = useState<OverlayState>({ active: false, color: "", glowColor: "" });
  const [opacity, setOpacity] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (overlay.active) {
      requestAnimationFrame(() => setOpacity(1));
    }
  }, [overlay.active]);

  const trigger = useCallback(
    (href: string, color: string, glowColor: string) => {
      setOpacity(0);
      setOverlay({ active: true, color, glowColor });
      setTimeout(() => router.push(href), 600);
      setTimeout(() => {
        setOverlay({ active: false, color, glowColor });
        setOpacity(0);
      }, 650);
    },
    [router]
  );

  return (
    <InkTransitionContext.Provider value={{ trigger }}>
      {children}
      {overlay.active && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            backgroundColor: "#000000",
            pointerEvents: "none",
            opacity,
            transition: "opacity 550ms ease-in-out",
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
