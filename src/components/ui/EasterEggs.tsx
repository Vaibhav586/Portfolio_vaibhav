"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const KONAMI = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];

export default function EasterEggs() {
  const [toast, setToast]   = useState<string | null>(null);
  const [kIdx, setKIdx]     = useState(0);
  const [matrix, setMatrix] = useState(false);

  const show = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 4000); };

  useEffect(() => {
    let buf = "";
    const onKey = (e: KeyboardEvent) => {
      // Konami
      if (e.key === KONAMI[kIdx]) {
        const next = kIdx + 1;
        if (next === KONAMI.length) {
          setKIdx(0);
          setMatrix(m => { const nm = !m; show(nm ? "🟢 Matrix mode activated. Welcome, Neo." : "Matrix mode deactivated."); return nm; });
        } else { setKIdx(next); }
      } else { setKIdx(0); }

      // Text commands
      buf = (buf + e.key).slice(-24);
      if (buf.includes("sudo hire vaibhav")) { buf = ""; show("✅ Offer Letter Generated Successfully. Welcome aboard!"); }
      if (buf.includes("coffee"))            { buf = ""; show("☕ Brewing… ████████████ 100% — Coffee ready!"); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [kIdx]);

  useEffect(() => {
    document.body.classList.toggle("matrix-mode", matrix);
    return () => { document.body.classList.remove("matrix-mode"); };
  }, [matrix]);

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.92 }}
          style={{
            position: "fixed", bottom: 160, left: "50%", transform: "translateX(-50%)",
            zIndex: 9999, padding: "12px 22px", borderRadius: 16,
            background: "rgba(59,130,246,0.15)", backdropFilter: "blur(20px)",
            border: "1px solid rgba(59,130,246,0.3)",
            fontSize: "0.85rem", fontWeight: 500, color: "var(--text)",
            whiteSpace: "nowrap",
          }}
        >
          {toast}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
