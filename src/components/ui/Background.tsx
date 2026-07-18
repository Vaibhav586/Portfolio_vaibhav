"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { useMousePosition } from "@/hooks/useMousePosition";

interface Particle { left: string; top: string; dur: number; delay: number; size: number; }

export default function Background() {
  const { x, y } = useMousePosition();
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 1200], [0, -80]);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 28 }, () => ({
        left:  `${Math.random() * 100}%`,
        top:   `${Math.random() * 100}%`,
        dur:   4 + Math.random() * 5,
        delay: Math.random() * 5,
        size:  Math.random() > 0.7 ? 2 : 1,
      }))
    );
  }, []);

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, overflow: "hidden", pointerEvents: "none" }}>
      {/* Base */}
      <div style={{ position: "absolute", inset: 0, background: "var(--bg)" }} />

      {/* Aurora gradient — animated */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(125deg, rgba(59,130,246,0.07) 0%, rgba(139,92,246,0.07) 30%, rgba(6,182,212,0.05) 60%, transparent 100%)",
          backgroundSize: "400% 400%",
          animation: "aurora 18s ease infinite",
          opacity: 0.8,
        }}
      />

      {/* Second aurora layer */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse 80% 50% at 20% 80%, rgba(139,92,246,0.08) 0%, transparent 60%)",
          animation: "aurora 24s ease infinite reverse",
          backgroundSize: "400% 400%",
        }}
      />

      {/* Mouse spotlight */}
      <motion.div
        style={{
          position: "absolute",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(59,130,246,0.055) 0%, transparent 65%)",
          left: x - 350,
          top: y - 350,
          pointerEvents: "none",
        }}
        transition={{ type: "spring", damping: 35, stiffness: 180, mass: 0.5 }}
      />

      {/* Floating orbs */}
      <motion.div style={{ y: parallaxY, position: "absolute", inset: 0 }}>
        <div style={{
          position: "absolute", top: "15%", left: "8%",
          width: 500, height: 500, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(59,130,246,0.09), transparent 70%)",
          filter: "blur(80px)",
          animation: "float 7s ease-in-out infinite",
        }} />
        <div style={{
          position: "absolute", top: "60%", right: "10%",
          width: 420, height: 420, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139,92,246,0.09), transparent 70%)",
          filter: "blur(80px)",
          animation: "float 9s ease-in-out infinite",
          animationDelay: "2s",
        }} />
        <div style={{
          position: "absolute", top: "35%", right: "25%",
          width: 320, height: 320, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(6,182,212,0.07), transparent 70%)",
          filter: "blur(60px)",
          animation: "float 11s ease-in-out infinite",
          animationDelay: "4s",
        }} />
      </motion.div>

      {/* Particles — client-only, no SSR mismatch */}
      {particles.map((p, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.35)",
          }}
          animate={{ y: [0, -24, 0], opacity: [0.08, 0.45, 0.08] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* Subtle grid */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
        backgroundSize: "72px 72px",
      }} />

      {/* Noise overlay */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.025,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      }} />
    </div>
  );
}
