"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { data } from "@/lib/data";
import { Send, CheckCircle } from "lucide-react";

const FIELDS = [
  { key: "name",    label: "What's your name?",           placeholder: "Your name…",                    type: "text"     },
  { key: "email",   label: "What's your email?",          placeholder: "your@email.com",                type: "email"    },
  { key: "message", label: "What would you like to say?", placeholder: "Tell me about your project…",   type: "textarea" },
] as const;

export default function Contact() {
  const [step, setStep]   = useState(0);
  const [form, setForm]   = useState({ name: "", email: "", message: "" });
  const [sent, setSent]   = useState(false);
  const [busy, setBusy]   = useState(false);

  const next = async () => {
    if (step < FIELDS.length - 1) { setStep(s => s + 1); return; }
    setBusy(true);
    await new Promise(r => setTimeout(r, 1400));
    setBusy(false);
    setSent(true);
  };

  const cur = FIELDS[step];

  return (
    <section id="contact" className="section-gap">
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
            Contact
          </div>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, letterSpacing: "-0.03em", marginBottom: 12 }}>
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p style={{ fontSize: "1rem", color: "var(--text3)" }}>Have an opportunity or project? Let's talk.</p>
        </motion.div>

        <div style={{ maxWidth: 520 }}>
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass"
                style={{ borderRadius: 24, padding: 48, textAlign: "center", border: "1px solid rgba(16,185,129,0.25)" }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 220, delay: 0.15 }}
                  style={{
                    width: 64, height: 64, borderRadius: "50%",
                    background: "rgba(16,185,129,0.12)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 20px",
                  }}
                >
                  <CheckCircle size={30} style={{ color: "#34d399" }} />
                </motion.div>
                <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--text)", marginBottom: 8 }}>Message Sent!</h3>
                <p style={{ fontSize: "0.88rem", color: "var(--text3)" }}>I'll get back to you within 24 hours.</p>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                className="glass"
                style={{ borderRadius: 24, padding: 32, border: "1px solid var(--border)" }}
              >
                {/* Previous answers */}
                <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: step > 0 ? 20 : 0 }}>
                  {FIELDS.slice(0, step).map(f => (
                    <motion.div
                      key={f.key}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      {/* Bot */}
                      <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 6 }}>
                        <div style={{
                          width: 28, height: 28, borderRadius: 8, flexShrink: 0,
                          background: "linear-gradient(135deg,#3b82f6,#8b5cf6)",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: "0.7rem", fontWeight: 800, color: "#fff",
                        }}>V</div>
                        <div className="glass" style={{ borderRadius: "4px 14px 14px 14px", padding: "8px 14px", fontSize: "0.85rem", color: "var(--text2)" }}>
                          {f.label}
                        </div>
                      </div>
                      {/* User reply */}
                      {form[f.key] && (
                        <div style={{ display: "flex", justifyContent: "flex-end" }}>
                          <div style={{
                            padding: "8px 14px", borderRadius: "14px 4px 14px 14px",
                            background: "rgba(59,130,246,0.15)", border: "1px solid rgba(59,130,246,0.2)",
                            fontSize: "0.85rem", color: "var(--text)", maxWidth: "80%",
                          }}>
                            {form[f.key]}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Current question */}
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 16 }}>
                    <div style={{
                      width: 28, height: 28, borderRadius: 8, flexShrink: 0,
                      background: "linear-gradient(135deg,#3b82f6,#8b5cf6)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "0.7rem", fontWeight: 800, color: "#fff",
                    }}>V</div>
                    <div className="glass" style={{ borderRadius: "4px 14px 14px 14px", padding: "8px 14px", fontSize: "0.85rem", color: "var(--text2)" }}>
                      {cur.label}
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: 10 }}>
                    {cur.type === "textarea" ? (
                      <textarea
                        value={form[cur.key]}
                        onChange={e => setForm(f => ({ ...f, [cur.key]: e.target.value }))}
                        placeholder={cur.placeholder}
                        rows={3}
                        onKeyDown={e => { if (e.key === "Enter" && e.ctrlKey) next(); }}
                        style={{
                          flex: 1, background: "rgba(255,255,255,0.04)",
                          border: "1px solid var(--border2)", borderRadius: 14,
                          padding: "12px 16px", fontSize: "0.88rem", color: "var(--text)",
                          outline: "none", resize: "none", fontFamily: "inherit",
                        }}
                      />
                    ) : (
                      <input
                        type={cur.type}
                        value={form[cur.key]}
                        onChange={e => setForm(f => ({ ...f, [cur.key]: e.target.value }))}
                        placeholder={cur.placeholder}
                        onKeyDown={e => { if (e.key === "Enter") next(); }}
                        style={{
                          flex: 1, background: "rgba(255,255,255,0.04)",
                          border: "1px solid var(--border2)", borderRadius: 14,
                          padding: "12px 16px", fontSize: "0.88rem", color: "var(--text)",
                          outline: "none", fontFamily: "inherit",
                        }}
                      />
                    )}
                    <motion.button
                      whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }}
                      onClick={next}
                      disabled={!form[cur.key] || busy}
                      style={{
                        width: 46, height: 46, borderRadius: 14, border: "none",
                        background: "linear-gradient(135deg,#3b82f6,#8b5cf6)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        cursor: "pointer", flexShrink: 0, opacity: !form[cur.key] ? 0.4 : 1,
                        alignSelf: "flex-end",
                      }}
                    >
                      {busy ? (
                        <motion.div
                          style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%" }}
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}
                        />
                      ) : (
                        <Send size={16} style={{ color: "#fff" }} />
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
