"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { data } from "@/lib/data";
import { ChevronDown } from "lucide-react";

export default function Experience() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="experience" className="section-gap">
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
            background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.2)",
            color: "#60a5fa", fontSize: "0.72rem", fontWeight: 600,
            letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 16,
          }}>
            Experience
          </div>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, letterSpacing: "-0.03em", marginBottom: 12 }}>
            Work <span className="gradient-text">Experience</span>
          </h2>
          <p style={{ fontSize: "1rem", color: "var(--text3)" }}>Where I've built and shipped real AI systems.</p>
        </motion.div>

        <div style={{ position: "relative", maxWidth: 760 }}>
          {/* Timeline line */}
          <div style={{
            position: "absolute", left: 23, top: 0, bottom: 0, width: 1,
            background: "linear-gradient(to bottom, rgba(59,130,246,0.4), rgba(139,92,246,0.2), transparent)",
          }} />

          {data.experience.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              style={{ position: "relative", paddingLeft: 64, marginBottom: i < data.experience.length - 1 ? 20 : 0 }}
            >
              {/* Logo */}
              <div style={{
                position: "absolute", left: 0, top: 14,
                width: 46, height: 46, borderRadius: 14,
                background: "var(--card2)", border: `1px solid ${exp.color}30`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "0.7rem", fontWeight: 900, color: exp.color,
                boxShadow: `0 0 20px ${exp.color}15`,
              }}>
                {exp.logo}
              </div>

              <motion.div
                className="glass"
                style={{
                  borderRadius: 18,
                  border: `1px solid ${open === i ? exp.color + "30" : "var(--border)"}`,
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "border-color 0.3s",
                }}
                whileHover={{ scale: 1.005 }}
                onClick={() => setOpen(open === i ? null : i)}
              >
                <div style={{ padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                      <span style={{ fontWeight: 700, fontSize: "1.05rem", color: "var(--text)" }}>{exp.company}</span>
                      <span style={{
                        fontSize: "0.7rem", padding: "2px 10px", borderRadius: 20,
                        background: `${exp.color}15`, color: exp.color, fontWeight: 600,
                      }}>
                        {exp.role}
                      </span>
                    </div>
                    <span style={{ fontSize: "0.78rem", color: "var(--text3)", fontFamily: "monospace" }}>{exp.duration}</span>
                  </div>
                  <motion.div animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <ChevronDown size={18} style={{ color: "var(--text3)" }} />
                  </motion.div>
                </div>

                <AnimatePresence>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                      style={{ overflow: "hidden" }}
                    >
                      <div style={{ padding: "0 24px 24px", borderTop: "1px solid var(--border)" }}>
                        <p style={{ fontSize: "0.88rem", color: "var(--text2)", lineHeight: 1.7, marginTop: 16, marginBottom: 16 }}>
                          {exp.description}
                        </p>
                        <div style={{ marginBottom: 16 }}>
                          <p style={{ fontSize: "0.7rem", color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>Key Achievements</p>
                          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 6 }}>
                            {exp.achievements.map((a, j) => (
                              <li key={j} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.85rem", color: "var(--text2)" }}>
                                <span style={{ width: 5, height: 5, borderRadius: "50%", background: exp.color, flexShrink: 0 }} />
                                {a}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                          {exp.skills.map(s => (
                            <span key={s} style={{
                              fontSize: "0.72rem", padding: "3px 10px", borderRadius: 8,
                              background: "rgba(255,255,255,0.04)", border: "1px solid var(--border)",
                              color: "var(--text3)", fontWeight: 500,
                            }}>{s}</span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
