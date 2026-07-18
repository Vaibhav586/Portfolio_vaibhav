"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { data } from "@/lib/data";

const CAT_COLORS: Record<string, string> = {
  Programming: "#3b82f6",
  AI:          "#8b5cf6",
  Backend:     "#06b6d4",
  Frontend:    "#f97316",
  Database:    "#10b981",
  Cloud:       "#f59e0b",
  DevOps:      "#ef4444",
  Tools:       "#6b7280",
};

export default function Skills() {
  const [active, setActive] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section id="skills" className="section-gap">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: 64 }}
        >
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            padding: "4px 12px", borderRadius: 40,
            background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)",
            color: "#fbbf24", fontSize: "0.72rem", fontWeight: 600,
            letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 16,
          }}>
            Skills
          </div>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, letterSpacing: "-0.03em", marginBottom: 12 }}>
            Skills & <span className="gradient-text">Expertise</span>
          </h2>
          <p style={{ fontSize: "1rem", color: "var(--text3)" }}>Technologies I use to build intelligent systems.</p>
        </motion.div>

        {/* Category filter */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 48 }}>
          <button
            onClick={() => setActive(null)}
            style={{
              padding: "7px 16px", borderRadius: 20, fontSize: "0.8rem", fontWeight: 600,
              background: active === null ? "rgba(59,130,246,0.15)" : "rgba(255,255,255,0.04)",
              border: `1px solid ${active === null ? "rgba(59,130,246,0.35)" : "var(--border)"}`,
              color: active === null ? "#60a5fa" : "var(--text3)",
              cursor: "pointer", transition: "all 0.2s",
            }}
          >
            All
          </button>
          {Object.keys(data.skills).map(cat => (
            <button
              key={cat}
              onClick={() => setActive(active === cat ? null : cat)}
              style={{
                padding: "7px 16px", borderRadius: 20, fontSize: "0.8rem", fontWeight: 600,
                background: active === cat ? `${CAT_COLORS[cat]}15` : "rgba(255,255,255,0.04)",
                border: `1px solid ${active === cat ? CAT_COLORS[cat] + "35" : "var(--border)"}`,
                color: active === cat ? CAT_COLORS[cat] : "var(--text3)",
                cursor: "pointer", transition: "all 0.2s",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills grid */}
        <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
          {Object.entries(data.skills)
            .filter(([cat]) => !active || cat === active)
            .map(([cat, skills]) => (
              <motion.div
                key={cat}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: CAT_COLORS[cat] }} />
                  <span style={{ fontSize: "0.72rem", color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }}>
                    {cat}
                  </span>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                  {skills.map((skill, i) => (
                    <motion.button
                      key={skill}
                      initial={{ opacity: 0, scale: 0.85 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.04, duration: 0.4 }}
                      whileHover={{ scale: 1.07, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      onMouseEnter={() => setHovered(skill)}
                      onMouseLeave={() => setHovered(null)}
                      style={{
                        padding: "8px 16px", borderRadius: 12, fontSize: "0.83rem", fontWeight: 500,
                        background: hovered === skill ? `${CAT_COLORS[cat]}15` : "rgba(255,255,255,0.04)",
                        border: `1px solid ${hovered === skill ? CAT_COLORS[cat] + "40" : "var(--border)"}`,
                        color: hovered === skill ? CAT_COLORS[cat] : "var(--text2)",
                        cursor: "pointer", transition: "all 0.2s",
                        boxShadow: hovered === skill ? `0 0 16px ${CAT_COLORS[cat]}20` : "none",
                      }}
                    >
                      {skill}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
}
