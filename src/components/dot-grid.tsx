"use client";

import { useEffect, useRef } from "react";

interface DotGridProps {
  color?: string;
  gap?: number;
  dotRadius?: number;
  repelRadius?: number;
  repelStrength?: number;
}

export function DotGrid({
  color = "rgba(255,255,255,0.15)",
  gap = 25,
  dotRadius = 1,
  repelRadius = 120,
  repelStrength = 25,
}: DotGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let cols = 0;
    let rows = 0;
    // Store current offset for each dot (for smooth animation)
    let offsets: { x: number; y: number }[] = [];

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      canvas!.width = window.innerWidth * dpr;
      canvas!.height = window.innerHeight * dpr;
      canvas!.style.width = window.innerWidth + "px";
      canvas!.style.height = window.innerHeight + "px";
      ctx!.scale(dpr, dpr);

      const newCols = Math.ceil(window.innerWidth / gap) + 1;
      const newRows = Math.ceil(window.innerHeight / gap) + 1;
      if (newCols !== cols || newRows !== rows) {
        cols = newCols;
        rows = newRows;
        offsets = Array.from({ length: cols * rows }, () => ({ x: 0, y: 0 }));
      }
    }

    function handleMouseMove(e: MouseEvent) {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    }

    function handleMouseLeave() {
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    }

    function draw() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx!.clearRect(0, 0, w, h);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const ease = 0.15;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const idx = row * cols + col;
          const baseX = col * gap;
          const baseY = row * gap;

          const dx = baseX - mx;
          const dy = baseY - my;
          const dist = Math.sqrt(dx * dx + dy * dy);

          let targetX = 0;
          let targetY = 0;

          if (dist < repelRadius && dist > 0) {
            const force = (1 - dist / repelRadius) * repelStrength;
            targetX = (dx / dist) * force;
            targetY = (dy / dist) * force;
          }

          const off = offsets[idx];
          off.x += (targetX - off.x) * ease;
          off.y += (targetY - off.y) * ease;

          ctx!.beginPath();
          ctx!.arc(baseX + off.x, baseY + off.y, dotRadius, 0, Math.PI * 2);
          ctx!.fillStyle = color;
          ctx!.fill();
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, [color, gap, dotRadius, repelRadius, repelStrength]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
