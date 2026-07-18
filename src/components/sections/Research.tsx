"use client";
import { motion } from "framer-motion";
import { data } from "@/lib/data";
import { BookOpen, Download, ExternalLink } from "lucide-react";

export default function Research() {
  return (
    <section id="research" className="section-gap">
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
            background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.2)",
            color: "#a78bfa", fontSize: "0.72rem", fontWeight: 600,
            letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 16,
          }}>
            Research
          </div>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, letterSpacing: "-0.03em", marginBottom: 12 }}>
            Research & <span className="gradient-text">Publications</span>
          </h2>
          <p style={{ fontSize: "1rem", color: "var(--text3)" }}>Peer-reviewed contributions to AI research.</p>
        </motion.div>

        {data.research.map((paper, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -4 }}
            className="glass gradient-border"
            style={{
              borderRadius: 24, padding: 36, maxWidth: 800,
              boxShadow: "0 0 60px rgba(59,130,246,0.06), var(--shadow-card)",
            }}
          >
            {/* Top row */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                padding: "5px 14px", borderRadius: 20,
                background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.25)",
                color: "#60a5fa", fontSize: "0.75rem", fontWeight: 700,
              }}>
                <BookOpen size={12} /> {paper.conference}
              </div>
              <span style={{ fontSize: "0.75rem", color: "var(--text3)", fontFamily: "monospace" }}>{paper.year}</span>
              <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: "1.1rem", fontWeight: 800, color: "#fbbf24" }}>{paper.citations}</span>
                <span style={{ fontSize: "0.75rem", color: "var(--text3)" }}>citations</span>
              </div>
            </div>

            <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--text)", lineHeight: 1.35, marginBottom: 14 }}>
              {paper.title}
            </h3>
            <p style={{ fontSize: "0.88rem", color: "var(--text2)", lineHeight: 1.75, marginBottom: 20 }}>
              {paper.abstract}
            </p>

            {/* Tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
              {paper.tags.map(tag => (
                <span key={tag} style={{
                  fontSize: "0.72rem", padding: "3px 12px", borderRadius: 20,
                  background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.2)",
                  color: "#a78bfa", fontWeight: 500,
                }}>{tag}</span>
              ))}
            </div>

            {/* Footer */}
            <div style={{ display: "flex", alignItems: "center", gap: 16, paddingTop: 20, borderTop: "1px solid var(--border)", flexWrap: "wrap" }}>
              <span style={{ fontSize: "0.72rem", fontFamily: "monospace", color: "var(--text3)" }}>DOI: {paper.doi}</span>
              <div style={{ display: "flex", gap: 10, marginLeft: "auto" }}>
                <button className="glass" style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  padding: "8px 14px", borderRadius: 10, border: "none",
                  fontSize: "0.78rem", color: "var(--text2)", cursor: "pointer", fontWeight: 500,
                }}>
                  <Download size={13} /> PDF
                </button>
                <button style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  padding: "8px 14px", borderRadius: 10, border: "1px solid rgba(59,130,246,0.25)",
                  background: "rgba(59,130,246,0.08)",
                  fontSize: "0.78rem", color: "#60a5fa", cursor: "pointer", fontWeight: 600,
                }}>
                  <ExternalLink size={13} /> IEEE
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
