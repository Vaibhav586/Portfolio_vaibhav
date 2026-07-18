"use client";
import { useEffect, useRef, useState } from "react";
import { useMousePosition } from "@/hooks/useMousePosition";

export default function Cursor() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const { x, y } = useMousePosition();
  const blobRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!mounted) return;
    let raf: number;
    const tick = () => {
      pos.current.x += (x - pos.current.x) * 0.07;
      pos.current.y += (y - pos.current.y) * 0.07;
      if (blobRef.current) {
        blobRef.current.style.transform =
          `translate(${pos.current.x - 240}px, ${pos.current.y - 240}px)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [mounted, x, y]);

  if (!mounted) return null;

  return (
    <>
      <div
        className="custom-cursor"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 12,
          height: 12,
          borderRadius: "50%",
          background: "#fff",
          mixBlendMode: "difference",
          pointerEvents: "none",
          zIndex: 9999,
          transform: `translate(${x - 6}px, ${y - 6}px)`,
          transition: "transform 60ms linear",
        }}
      />
      <div
        ref={blobRef}
        className="cursor-blob"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 480,
          height: 480,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(59,130,246,0.12) 0%, rgba(139,92,246,0.06) 50%, transparent 70%)",
          filter: "blur(40px)",
          pointerEvents: "none",
          zIndex: 9990,
        }}
      />
    </>
  );
}
