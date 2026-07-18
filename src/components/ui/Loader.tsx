"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const NODES = Array.from({ length: 14 }, (_, i) => ({
  x: Math.round((50 + 38 * Math.cos((i / 14) * Math.PI * 2)) * 1000) / 1000,
  y: Math.round((50 + 38 * Math.sin((i / 14) * Math.PI * 2)) * 1000) / 1000,
}));

export default function Loader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setProgress(p => {
        const next = p + Math.random() * 7 + 3;
        if (next >= 100) {
          clearInterval(id);
          setTimeout(() => { setDone(true); setTimeout(onDone, 500); }, 200);
          return 100;
        }
        return next;
      });
    }, 70);
    return () => clearInterval(id);
  }, [onDone]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="noise"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            background: "#09090b",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "2rem",
          }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Neural net */}
          <div style={{ width: 180, height: 180, position: "relative" }}>
            <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%" }}>
              {NODES.map((n, i) =>
                NODES.slice(i + 1, i + 4).map((m, j) => (
                  <motion.line
                    key={`${i}-${j}`}
                    x1={n.x} y1={n.y} x2={m.x} y2={m.y}
                    stroke="rgba(59,130,246,0.25)"
                    strokeWidth="0.4"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.8, delay: i * 0.04, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                  />
                ))
              )}
              {NODES.map((n, i) => (
                <motion.circle
                  key={i} cx={n.x} cy={n.y} r="1.8"
                  fill="#3b82f6"
                  animate={{ opacity: [0.2, 1, 0.2], r: [1.2, 2.8, 1.2] }}
                  transition={{ duration: 2.2, delay: i * 0.12, repeat: Infinity, ease: "easeInOut" }}
                />
              ))}
              <motion.circle cx="50" cy="50" r="5" fill="#8b5cf6"
                animate={{ r: [3.5, 6.5, 3.5], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </svg>
          </div>

          <motion.div
            className="gradient-text"
            style={{ fontSize: "2.5rem", fontWeight: 900, letterSpacing: "-0.04em" }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
          >
            VAIBHAV
          </motion.div>

          <div style={{ width: 200, display: "flex", flexDirection: "column", gap: "0.5rem", alignItems: "center" }}>
            <div style={{ width: "100%", height: 2, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" }}>
              <motion.div
                style={{ height: "100%", background: "linear-gradient(90deg,#3b82f6,#8b5cf6)", borderRadius: 2 }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.08 }}
              />
            </div>
            <span style={{ fontSize: "0.7rem", fontFamily: "monospace", color: "rgba(255,255,255,0.25)" }}>
              {Math.min(Math.round(progress), 100)}%
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
