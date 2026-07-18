"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { data } from "@/lib/data";
import { ExternalLink, X, ChevronRight } from "lucide-react";

function Modal({ p, onClose }: { p: typeof data.projects[0]; onClose: () => void }) {
  return (
    <motion.div
      style={{ position: "fixed", inset: 0, zIndex: 9000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.75)", backdropFilter: "blur(12px)" }} />
      <motion.div
        className="glass"
        style={{
          position: "relative", borderRadius: 24, maxWidth: 680, width: "100%",
          maxHeight: "88vh", overflowY: "auto",
          border: `1px solid ${p.color}25`,
          boxShadow: `0 0 80px ${p.color}15, var(--shadow-card)`,
        }}
        initial={{ scale: 0.92, y: 24 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.92, y: 24 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ padding: "28px 28px 20px", borderBottom: "1px solid var(--border)" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}>
            <div>
              <h3 style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--text)", marginBottom: 6 }}>{p.title}</h3>
              <p style={{ fontSize: "0.88rem", color: "var(--text3)", lineHeight: 1.6 }}>{p.description}</p>
            </div>
            <button onClick={onClose} className="glass" style={{
              width: 34, height: 34, borderRadius: 10, border: "none",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "var(--text3)", cursor: "pointer", flexShrink: 0,
            }}>
              <X size={15} />
            </button>
          </div>
        </div>

        <div style={{ padding: 28, display: "flex", flexDirection: "column", gap: 24 }}>
          {/* Metrics */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
            {p.metrics.map((m, i) => (
              <div key={i} className="glass" style={{
                borderRadius: 14, padding: "14px 12px", textAlign: "center",
                border: `1px solid ${p.color}20`,
              }}>
                <div style={{ fontSize: "0.82rem", fontWeight: 700, color: p.color }}>{m}</div>
              </div>
            ))}
          </div>

          {/* Problem / Solution */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {[{ label: "Problem", text: p.problem }, { label: "Solution", text: p.solution }].map(({ label, text }) => (
              <div key={label} className="glass" style={{ borderRadius: 14, padding: 16 }}>
                <p style={{ fontSize: "0.68rem", color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>{label}</p>
                <p style={{ fontSize: "0.85rem", color: "var(--text2)", lineHeight: 1.6 }}>{text}</p>
              </div>
            ))}
          </div>

          {/* Features */}
          <div>
            <p style={{ fontSize: "0.68rem", color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>Features</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {p.features.map((f, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.85rem", color: "var(--text2)" }}>
                  <ChevronRight size={13} style={{ color: p.color, flexShrink: 0 }} />{f}
                </div>
              ))}
            </div>
          </div>

          {/* Tech */}
          <div>
            <p style={{ fontSize: "0.68rem", color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>Tech Stack</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {p.tech.map(t => (
                <span key={t} style={{
                  fontSize: "0.75rem", padding: "4px 12px", borderRadius: 20,
                  background: `${p.color}12`, border: `1px solid ${p.color}25`,
                  color: p.color, fontWeight: 500,
                }}>{t}</span>
              ))}
            </div>
          </div>

          {p.demo && (
            <div style={{ display: "flex", gap: 10 }}>
              <a href={p.demo} target="_blank" rel="noopener noreferrer" style={{
                display: "inline-flex", alignItems: "center", gap: 7,
                padding: "9px 16px", borderRadius: 12,
                background: p.color, color: "#fff",
                fontSize: "0.82rem", textDecoration: "none", fontWeight: 600,
              }}>
                <ExternalLink size={14} /> Live Demo
              </a>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const [sel, setSel] = useState<typeof data.projects[0] | null>(null);

  return (
    <section id="projects" className="section-gap">
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
            background: "rgba(6,182,212,0.08)", border: "1px solid rgba(6,182,212,0.2)",
            color: "#67e8f9", fontSize: "0.72rem", fontWeight: 600,
            letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 16,
          }}>
            Projects
          </div>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, letterSpacing: "-0.03em", marginBottom: 12 }}>
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p style={{ fontSize: "1rem", color: "var(--text3)" }}>Production-grade AI systems built from research to deployment.</p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
          {data.projects.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.09, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8, scale: 1.015 }}
              className="glass gradient-border"
              style={{ borderRadius: 22, overflow: "hidden", cursor: "pointer" }}
              onClick={() => setSel(p)}
            >
              {/* Thumbnail */}
              <div style={{
                height: 180, position: "relative", overflow: "hidden",
                background: `linear-gradient(135deg, ${p.color}18, ${p.color}06)`,
              }}>
                <div style={{
                  position: "absolute", inset: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <span style={{ fontSize: "5rem", fontWeight: 900, color: p.color, opacity: 0.08 }}>
                    {p.title.charAt(0)}
                  </span>
                </div>
                {/* Hover overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  style={{
                    position: "absolute", inset: 0,
                    background: `${p.color}12`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  <span className="glass" style={{
                    padding: "8px 18px", borderRadius: 20,
                    fontSize: "0.8rem", fontWeight: 600, color: "var(--text)",
                  }}>
                    View Case Study →
                  </span>
                </motion.div>
                {/* Bottom gradient */}
                <div style={{
                  position: "absolute", bottom: 0, left: 0, right: 0, height: 60,
                  background: `linear-gradient(to top, ${p.color}20, transparent)`,
                }} />
              </div>

              <div style={{ padding: "20px 22px 22px" }}>
                <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text)", marginBottom: 8 }}>{p.title}</h3>
                <p style={{ fontSize: "0.83rem", color: "var(--text3)", lineHeight: 1.65, marginBottom: 14 }}>{p.description}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
                  {p.tech.slice(0, 4).map(t => (
                    <span key={t} style={{
                      fontSize: "0.7rem", padding: "2px 9px", borderRadius: 8,
                      background: "rgba(255,255,255,0.04)", border: "1px solid var(--border)",
                      color: "var(--text3)", fontWeight: 500,
                    }}>{t}</span>
                  ))}
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                  <span style={{ fontSize: "0.75rem", color: "var(--text3)", display: "flex", alignItems: "center", gap: 4 }}>
                    Open <ChevronRight size={12} />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>{sel && <Modal p={sel} onClose={() => setSel(null)} />}</AnimatePresence>
    </section>
  );
}
