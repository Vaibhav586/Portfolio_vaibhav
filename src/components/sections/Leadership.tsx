"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { data } from "@/lib/data";
import { Users, Calendar, ChevronDown } from "lucide-react";

export default function Leadership() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="leadership" className="section-gap">
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
            background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)",
            color: "#34d399", fontSize: "0.72rem", fontWeight: 600,
            letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 16,
          }}>
            Leadership
          </div>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, letterSpacing: "-0.03em", marginBottom: 12 }}>
            <span className="gradient-text">Leadership</span> & Community
          </h2>
          <p style={{ fontSize: "1rem", color: "var(--text3)" }}>Building communities and mentoring the next generation.</p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 18, maxWidth: 900 }}>
          {data.leadership.map((l, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="glass"
              style={{ borderRadius: 22, overflow: "hidden", cursor: "pointer" }}
              onClick={() => setOpen(open === i ? null : i)}
            >
              <div style={{ padding: "22px 24px" }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
                  <div>
                    <h3 style={{ fontWeight: 700, fontSize: "1.05rem", color: "var(--text)", marginBottom: 3 }}>{l.role}</h3>
                    <p style={{ fontSize: "0.82rem", color: "#34d399", fontWeight: 500 }}>{l.org}</p>
                  </div>
                  <motion.div animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <ChevronDown size={18} style={{ color: "var(--text3)" }} />
                  </motion.div>
                </div>

                <div style={{ display: "flex", gap: 16, fontSize: "0.78rem", color: "var(--text3)" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <Calendar size={13} /> {l.duration}
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <Users size={13} /> {l.students} students
                  </span>
                </div>

                <AnimatePresence>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      style={{ overflow: "hidden" }}
                    >
                      <div style={{ paddingTop: 16, marginTop: 16, borderTop: "1px solid var(--border)" }}>
                        <p style={{ fontSize: "0.85rem", color: "var(--text2)", lineHeight: 1.7, marginBottom: 16 }}>
                          {l.description}
                        </p>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                          {[
                            { label: "Events", value: l.events, color: "#3b82f6" },
                            { label: "Students", value: l.students, color: "#8b5cf6" },
                          ].map(({ label, value, color }) => (
                            <div key={label} className="glass" style={{ borderRadius: 12, padding: "12px", textAlign: "center" }}>
                              <div style={{ fontSize: "1.5rem", fontWeight: 900, color }}>{value}</div>
                              <div style={{ fontSize: "0.7rem", color: "var(--text3)", marginTop: 2 }}>{label}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
