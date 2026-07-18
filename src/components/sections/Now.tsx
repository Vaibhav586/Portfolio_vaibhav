"use client";
import { motion } from "framer-motion";
import { data } from "@/lib/data";
import { Hammer, BookOpen, Headphones, Tv, CheckCircle } from "lucide-react";

const ITEMS = [
  { key: "building",  icon: Hammer,      label: "Building"  },
  { key: "learning",  icon: BookOpen,    label: "Learning"  },
  { key: "reading",   icon: BookOpen,    label: "Reading"   },
  { key: "listening", icon: Headphones,  label: "Listening" },
  { key: "watching",  icon: Tv,          label: "Watching"  },
] as const;

export default function Now() {
  return (
    <section className="section-gap">
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
            Now
          </div>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, letterSpacing: "-0.03em", marginBottom: 12 }}>
            What I'm Doing <span className="gradient-text">Now</span>
          </h2>
          <p style={{ fontSize: "1rem", color: "var(--text3)" }}>Current focus, interests, and availability.</p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, maxWidth: 900 }}>
          {/* Availability card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass"
            style={{
              borderRadius: 20, padding: 22,
              border: "1px solid rgba(16,185,129,0.25)",
              boxShadow: "0 0 30px rgba(16,185,129,0.08)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 8 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#34d399", animation: "pulse-slow 3s ease-in-out infinite", display: "inline-block" }} />
              <span style={{ fontSize: "0.7rem", color: "#34d399", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>Available</span>
            </div>
            <p style={{ fontWeight: 600, fontSize: "0.9rem", color: "var(--text)", marginBottom: 4 }}>Open to Opportunities</p>
            <p style={{ fontSize: "0.78rem", color: "var(--text3)" }}>Full-time, internship, or research</p>
          </motion.div>

          {ITEMS.map(({ key, icon: Icon, label }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
              className="glass"
              style={{ borderRadius: 20, padding: 22 }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 8 }}>
                <Icon size={14} style={{ color: "var(--text3)" }} />
                <span style={{ fontSize: "0.7rem", color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 }}>{label}</span>
              </div>
              <p style={{ fontSize: "0.85rem", color: "var(--text2)", fontWeight: 500, lineHeight: 1.5 }}>
                {data.now[key]}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
