"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { data } from "@/lib/data";

function SectionHeader({ label, title, sub }: { label: string; title: React.ReactNode; sub: string }) {
  return (
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
        {label}
      </div>
      <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 12 }}>
        {title}
      </h2>
      <p style={{ fontSize: "1rem", color: "var(--text3)", maxWidth: 480 }}>{sub}</p>
    </motion.div>
  );
}

export default function About() {
  return (
    <section id="about" className="section-gap">
      <div className="container-main">
        <SectionHeader
          label="About"
          title={<>My <span className="gradient-text">Journey</span></>}
          sub="From curiosity to crafting production AI systems — the story so far."
        />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }}>

          {/* Left — avatar */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <div style={{ position: "relative", width: 280, height: 280 }}>
              {/* Outer ring */}
              <div style={{
                position: "absolute", inset: 0, borderRadius: "50%",
                border: "1px solid rgba(59,130,246,0.15)",
                animation: "spin-slow 10s linear infinite",
              }} />
              {/* Inner ring */}
              <div style={{
                position: "absolute", inset: 20, borderRadius: "50%",
                border: "1px solid rgba(139,92,246,0.15)",
                animation: "spin-reverse 14s linear infinite",
              }} />
              {/* Profile photo */}
              <Image
                src="/vaibhav2.png"
                alt="Vaibhav"
                fill
                sizes="232px"
                style={{
                  inset: 24, width: "calc(100% - 48px)", height: "calc(100% - 48px)",
                  borderRadius: "50%", objectFit: "cover", objectPosition: "center top",
                  border: "3px solid rgba(255,255,255,0.12)",
                  boxShadow: "0 0 60px rgba(59,130,246,0.2)",
                }}
              />
              {/* Floating chips */}
              {[
                { top: "2%",  left: "60%", label: "AI",      color: "#3b82f6", delay: 0 },
                { top: "75%", left: "2%",  label: "ML",      color: "#8b5cf6", delay: 1 },
                { top: "10%", left: "0%",  label: "GenAI",   color: "#06b6d4", delay: 2 },
                { top: "80%", left: "65%", label: "Research", color: "#10b981", delay: 1.5 },
              ].map((c, i) => (
                <motion.div
                  key={i}
                  style={{
                    position: "absolute", top: c.top, left: c.left,
                    padding: "4px 10px", borderRadius: 20,
                    background: `${c.color}15`, border: `1px solid ${c.color}30`,
                    color: c.color, fontSize: "0.7rem", fontWeight: 600,
                    animation: `float ${5 + i}s ease-in-out infinite`,
                    animationDelay: `${c.delay}s`,
                  }}
                >
                  {c.label}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — timeline */}
          <div style={{ position: "relative" }}>
            <div style={{
              position: "absolute", left: 15, top: 0, bottom: 0, width: 1,
              background: "linear-gradient(to bottom, rgba(59,130,246,0.5), rgba(139,92,246,0.3), transparent)",
            }} />

            {data.timeline.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.09, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                style={{ position: "relative", paddingLeft: 44, paddingBottom: i < data.timeline.length - 1 ? 28 : 0 }}
              >
                {/* Dot */}
                <div style={{
                  position: "absolute", left: 0, top: 4,
                  width: 30, height: 30, borderRadius: "50%",
                  background: "var(--card2)", border: "1px solid rgba(59,130,246,0.35)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#3b82f6" }} />
                </div>

                <div
                  className="glass"
                  style={{ borderRadius: 14, padding: "14px 18px" }}
                >
                  <span style={{ fontSize: "0.7rem", fontFamily: "monospace", color: "#60a5fa", fontWeight: 600, display: "block", marginBottom: 4 }}>
                    {item.year}
                  </span>
                  <span style={{ fontSize: "0.9rem", color: "var(--text2)", fontWeight: 500 }}>{item.event}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
