"use client";
import { motion } from "framer-motion";
import { data } from "@/lib/data";
import { Trophy, Award, BookOpen, Star } from "lucide-react";

const ICONS = [Trophy, Award, BookOpen, Star];

export default function Achievements() {
  return (
    <section id="achievements" className="section-gap">
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
            Achievements
          </div>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, letterSpacing: "-0.03em", marginBottom: 12 }}>
            <span className="gradient-text">Achievements</span> & Awards
          </h2>
          <p style={{ fontSize: "1rem", color: "var(--text3)" }}>Recognition for building things that matter.</p>
        </motion.div>

        {/* Achievement cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 18, marginBottom: 72 }}>
          {data.achievements.map((a, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24, scale: 0.94 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.09, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -8, scale: 1.03 }}
                className="glass"
                style={{
                  borderRadius: 22, padding: "28px 22px", textAlign: "center",
                  cursor: "default", position: "relative", overflow: "hidden",
                  border: `1px solid ${a.color}20`,
                }}
              >
                {/* Glow bg */}
                <div style={{
                  position: "absolute", inset: 0,
                  background: `radial-gradient(circle at 50% 0%, ${a.color}10, transparent 65%)`,
                  pointerEvents: "none",
                }} />
                {/* Shimmer line */}
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: 1,
                  background: `linear-gradient(90deg, transparent, ${a.color}60, transparent)`,
                }} />

                <motion.div
                  whileHover={{ rotate: 8, scale: 1.1 }}
                  style={{
                    width: 52, height: 52, borderRadius: 16,
                    background: `${a.color}15`, border: `1px solid ${a.color}25`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 16px",
                  }}
                >
                  <Icon size={22} style={{ color: a.color }} />
                </motion.div>

                <h3 style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--text)", marginBottom: 8 }}>{a.title}</h3>
                <p style={{ fontSize: "0.8rem", color: "var(--text3)", lineHeight: 1.6 }}>{a.desc}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Certifications */}
        <motion.h3
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: 32, letterSpacing: "-0.02em" }}
        >
          Certifications
        </motion.h3>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 18 }}>
          {data.certifications.map((cert, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flip-card"
              style={{ height: 180 }}
            >
              <div className="flip-card-inner">
                {/* Front */}
                <div className="flip-card-front glass" style={{ borderRadius: 18, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 20 }}>
                  <div className="glass" style={{
                    width: 48, height: 48, borderRadius: 14,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "0.75rem", fontWeight: 800, color: "#60a5fa",
                    border: "1px solid rgba(59,130,246,0.2)", marginBottom: 12,
                  }}>
                    {cert.logo}
                  </div>
                  <p style={{ fontWeight: 600, fontSize: "0.85rem", color: "var(--text)", textAlign: "center", marginBottom: 4 }}>{cert.name}</p>
                  <p style={{ fontSize: "0.72rem", color: "var(--text3)", textAlign: "center" }}>{cert.issuer}</p>
                </div>
                {/* Back */}
                <div className="flip-card-back glass" style={{
                  borderRadius: 18, display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center", padding: 20,
                  background: "rgba(59,130,246,0.06)", border: "1px solid rgba(59,130,246,0.2)",
                }}>
                  <p style={{ fontSize: "0.7rem", color: "var(--text3)", marginBottom: 4 }}>Issued {cert.date}</p>
                  <p style={{ fontFamily: "monospace", fontSize: "0.7rem", color: "#60a5fa", marginBottom: 14 }}>{cert.credential}</p>
                  <button style={{
                    padding: "6px 16px", borderRadius: 10,
                    background: "rgba(59,130,246,0.12)", border: "1px solid rgba(59,130,246,0.25)",
                    color: "#60a5fa", fontSize: "0.75rem", fontWeight: 600, cursor: "pointer",
                  }}>
                    Verify ↗
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
