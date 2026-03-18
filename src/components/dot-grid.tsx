"use client";

import { useEffect, useRef } from "react";

interface DotGridProps {
  color?: string;
  gap?: number;
  dotRadius?: number;
  repelRadius?: number;
  repelStrength?: number;
}

interface Meteor {
  col: number;
  row: number;
  nextCol: number;
  nextRow: number;
  progress: number;
  dir: { dx: number; dy: number };
  speed: number;
  trail: { x: number; y: number }[];
  state: "alive" | "dying";
  dyingProgress: number;
  dyingX: number;
  dyingY: number;
}

const DIRS = [
  { dx: 1, dy: 0 },
  { dx: -1, dy: 0 },
  { dx: 0, dy: 1 },
  { dx: 0, dy: -1 },
];

const MAX_METEORS = 5;
const TRAIL_LEN = 90;
const BASE_SPEED = 0.04;   // 기본 progress/frame
const MAX_SPEED = 0.32;    // 블랙홀 중심 근처 최대 속도
const ACCEL = 0.006;       // 가속량/frame
const DECEL = 0.025;       // 감속량/frame (가속보다 빠르게)
const SPAWN_INTERVAL_MS = 3000;
const ATTRACT_RADIUS = 220;
const DEATH_RADIUS = 14;   // 픽셀 거리 — 이 이내면 소멸
const DEATH_FRAMES = 45;

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
  const meteorsRef = useRef<Meteor[]>([]);
  const lastSpawnRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rgbMatch = color.match(/[\d.]+/g);
    const [mr, mg, mb] = rgbMatch ? rgbMatch.map(Number) : [255, 255, 255];

    let cols = 0;
    let rows = 0;
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
        meteorsRef.current = [];
      }
    }

    function spawnMeteor() {
      if (meteorsRef.current.length >= MAX_METEORS || cols === 0 || rows === 0)
        return;

      // 4개 엣지 바깥에서 생성
      const edge = Math.floor(Math.random() * 4);
      let col: number, row: number, dir: { dx: number; dy: number };

      if (edge === 0) {
        col = -1; row = Math.floor(Math.random() * rows); dir = { dx: 1, dy: 0 };
      } else if (edge === 1) {
        col = cols; row = Math.floor(Math.random() * rows); dir = { dx: -1, dy: 0 };
      } else if (edge === 2) {
        col = Math.floor(Math.random() * cols); row = -1; dir = { dx: 0, dy: 1 };
      } else {
        col = Math.floor(Math.random() * cols); row = rows; dir = { dx: 0, dy: -1 };
      }

      meteorsRef.current.push({
        col, row,
        nextCol: col + dir.dx,
        nextRow: row + dir.dy,
        progress: 0,
        dir,
        speed: BASE_SPEED,
        trail: [],
        state: "alive",
        dyingProgress: 0,
        dyingX: 0,
        dyingY: 0,
      });
    }

    function handleMouseMove(e: MouseEvent) {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    }

    function handleMouseLeave() {
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    }

    function draw(timestamp: number) {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx!.clearRect(0, 0, w, h);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const mouseActive = mx > -100;

      // 점 그리기 (repel)
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const idx = row * cols + col;
          const baseX = col * gap;
          const baseY = row * gap;
          const dx = baseX - mx;
          const dy = baseY - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          let targetX = 0, targetY = 0;
          if (dist < repelRadius && dist > 0) {
            const force = (1 - dist / repelRadius) * repelStrength;
            targetX = (dx / dist) * force;
            targetY = (dy / dist) * force;
          }
          const off = offsets[idx];
          off.x += (targetX - off.x) * 0.15;
          off.y += (targetY - off.y) * 0.15;
          ctx!.beginPath();
          ctx!.arc(baseX + off.x, baseY + off.y, dotRadius, 0, Math.PI * 2);
          ctx!.fillStyle = color;
          ctx!.fill();
        }
      }

      // 스폰
      if (timestamp - lastSpawnRef.current > SPAWN_INTERVAL_MS) {
        spawnMeteor();
        lastSpawnRef.current = timestamp;
      }

      const meteors = meteorsRef.current;
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];

        // ── 소멸 애니메이션 ──
        if (m.state === "dying") {
          m.dyingProgress += 1 / DEATH_FRAMES;
          if (m.dyingProgress >= 1) {
            meteors.splice(i, 1);
            lastSpawnRef.current = timestamp;
            continue;
          }
          const p = m.dyingProgress;
          const inv = 1 - p;

          // 꼬리 페이드
          for (let t = 1; t < m.trail.length; t++) {
            const a = (t / m.trail.length) * 0.8 * inv;
            const p1 = m.trail[t - 1];
            const p2 = m.trail[t];
            ctx!.beginPath();
            ctx!.moveTo(p1.x, p1.y);
            ctx!.lineTo(p2.x, p2.y);
            ctx!.strokeStyle = `rgba(${mr}, ${mg}, ${mb}, ${a})`;
            ctx!.lineWidth = (t / m.trail.length) * 2.5;
            ctx!.lineCap = "round";
            ctx!.stroke();
          }
          // 팽창 링 1
          ctx!.beginPath();
          ctx!.arc(m.dyingX, m.dyingY, p * 30, 0, Math.PI * 2);
          ctx!.strokeStyle = `rgba(${mr}, ${mg}, ${mb}, ${inv * 0.9})`;
          ctx!.lineWidth = 2 * inv;
          ctx!.stroke();
          // 팽창 링 2 (빠름)
          ctx!.beginPath();
          ctx!.arc(m.dyingX, m.dyingY, p * 15, 0, Math.PI * 2);
          ctx!.strokeStyle = `rgba(${mr}, ${mg}, ${mb}, ${Math.max(0, inv - 0.3) * 1.2})`;
          ctx!.lineWidth = 3 * Math.max(0, inv - 0.3);
          ctx!.stroke();
          // 중심 글로우
          const grad = ctx!.createRadialGradient(m.dyingX, m.dyingY, 0, m.dyingX, m.dyingY, 12 * inv);
          grad.addColorStop(0, `rgba(${mr}, ${mg}, ${mb}, ${inv})`);
          grad.addColorStop(1, `rgba(${mr}, ${mg}, ${mb}, 0)`);
          ctx!.beginPath();
          ctx!.arc(m.dyingX, m.dyingY, 12 * inv, 0, Math.PI * 2);
          ctx!.fillStyle = grad;
          ctx!.fill();
          continue;
        }

        // ── 현재 헤드 픽셀 위치 ──
        const hx = m.col * gap + (m.nextCol - m.col) * gap * m.progress;
        const hy = m.row * gap + (m.nextRow - m.row) * gap * m.progress;
        const pdx = mx - hx;
        const pdy = my - hy;
        const dist = Math.sqrt(pdx * pdx + pdy * pdy);

        // ── 속도 조절 ──
        if (mouseActive && dist < ATTRACT_RADIUS) {
          const t = 1 - dist / ATTRACT_RADIUS;
          const target = BASE_SPEED + t * t * (MAX_SPEED - BASE_SPEED);
          m.speed = Math.min(target, m.speed + ACCEL);

          // 소멸 판정
          if (dist < DEATH_RADIUS) {
            m.state = "dying";
            m.dyingX = hx;
            m.dyingY = hy;
            continue;
          }
        } else {
          // 감속 — 기본 속도로 복귀
          m.speed = Math.max(BASE_SPEED, m.speed - DECEL);
        }

        // ── progress 진행 ──
        m.progress += m.speed;

        // ── 교차점 도달 ──
        if (m.progress >= 1) {
          m.progress -= 1;
          m.col = m.nextCol;
          m.row = m.nextRow;

          let newDir = m.dir; // 기본: 직진

          // 블랙홀 범위 내 → 마우스에 가장 가까운 방향 선택
          if (mouseActive && dist < ATTRACT_RADIUS) {
            let bestDist = Infinity;
            for (const d of DIRS) {
              const nc = m.col + d.dx;
              const nr = m.row + d.dy;
              // 너무 멀리 벗어난 방향 제외
              if (nc < -2 || nc > cols + 1 || nr < -2 || nr > rows + 1) continue;
              const nx = nc * gap;
              const ny = nr * gap;
              const dd = Math.sqrt((mx - nx) ** 2 + (my - ny) ** 2);
              if (dd < bestDist) {
                bestDist = dd;
                newDir = d;
              }
            }
          }

          const nc = m.col + newDir.dx;
          const nr = m.row + newDir.dy;

          // 화면 밖으로 나가면 제거
          if (nc < -2 || nc > cols + 1 || nr < -2 || nr > rows + 1) {
            meteors.splice(i, 1);
            lastSpawnRef.current = timestamp;
            continue;
          }

          m.dir = newDir;
          m.nextCol = nc;
          m.nextRow = nr;
        }

        // ── 꼬리 업데이트 ──
        const chx = m.col * gap + (m.nextCol - m.col) * gap * m.progress;
        const chy = m.row * gap + (m.nextRow - m.row) * gap * m.progress;
        m.trail.push({ x: chx, y: chy });
        if (m.trail.length > TRAIL_LEN) m.trail.shift();

        // ── 꼬리 렌더 ──
        for (let t = 1; t < m.trail.length; t++) {
          const a = (t / m.trail.length) * 0.85;
          const p1 = m.trail[t - 1];
          const p2 = m.trail[t];
          ctx!.beginPath();
          ctx!.moveTo(p1.x, p1.y);
          ctx!.lineTo(p2.x, p2.y);
          ctx!.strokeStyle = `rgba(${mr}, ${mg}, ${mb}, ${a})`;
          ctx!.lineWidth = (t / m.trail.length) * 2.5;
          ctx!.lineCap = "round";
          ctx!.stroke();
        }

        // ── 헤드 글로우 ──
        const headGrad = ctx!.createRadialGradient(chx, chy, 0, chx, chy, 7);
        headGrad.addColorStop(0, `rgba(${mr}, ${mg}, ${mb}, 1)`);
        headGrad.addColorStop(0.4, `rgba(${mr}, ${mg}, ${mb}, 0.6)`);
        headGrad.addColorStop(1, `rgba(${mr}, ${mg}, ${mb}, 0)`);
        ctx!.beginPath();
        ctx!.arc(chx, chy, 7, 0, Math.PI * 2);
        ctx!.fillStyle = headGrad;
        ctx!.fill();

        ctx!.beginPath();
        ctx!.arc(chx, chy, 2, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${mr}, ${mg}, ${mb}, 1)`;
        ctx!.fill();
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
      meteorsRef.current = [];
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
