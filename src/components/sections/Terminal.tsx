"use client";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { data } from "@/lib/data";

const CMDS: Record<string, string> = {
  help:         "Commands: about · skills · projects · experience · research · contact · github · resume · whoami · ls · clear · coffee",
  about:        data.chatbot.about,
  skills:       data.chatbot.skills,
  projects:     data.chatbot.projects,
  experience:   data.chatbot.experience,
  research:     data.chatbot.research,
  contact:      data.chatbot.contact,
  github:       `GitHub → ${data.github}`,
  resume:       data.chatbot.resume,
  whoami:       "vaibhav — AI & ML Engineer",
  ls:           "about/   projects/   experience/   research/   skills/   contact/   resume.pdf",
  "cat resume": "→ Redirecting to resume download…",
  coffee:       "☕  Brewing… ████████████ 100% — Coffee ready! Vaibhav runs on coffee and PyTorch.",
};

interface Line { type: "in" | "out"; text: string; }

export default function Terminal() {
  const [lines, setLines] = useState<Line[]>([
    { type: "out", text: "Welcome to Vaibhav's terminal. Type 'help' to get started." },
  ]);
  const [input, setInput] = useState("");
  const [hist, setHist] = useState<string[]>([]);
  const [hIdx, setHIdx] = useState(-1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLInputElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [lines]);

  const run = (cmd: string) => {
    const t = cmd.trim().toLowerCase();
    setLines(l => [...l, { type: "in", text: cmd }]);
    setHist(h => [cmd, ...h]);
    setHIdx(-1);
    if (t === "clear") { setLines([]); return; }
    const out = CMDS[t] ?? `command not found: ${t}  (type 'help' for available commands)`;
    setLines(l => [...l, { type: "out", text: out }]);
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") { if (input.trim()) run(input); setInput(""); }
    else if (e.key === "ArrowUp")   { const i = Math.min(hIdx + 1, hist.length - 1); setHIdx(i); setInput(hist[i] ?? ""); }
    else if (e.key === "ArrowDown") { const i = Math.max(hIdx - 1, -1); setHIdx(i); setInput(i === -1 ? "" : hist[i]); }
  };

  return (
    <section className="section-gap">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: 48 }}
        >
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            padding: "4px 12px", borderRadius: 40,
            background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.2)",
            color: "#60a5fa", fontSize: "0.72rem", fontWeight: 600,
            letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 16,
          }}>
            Terminal
          </div>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, letterSpacing: "-0.03em", marginBottom: 12 }}>
            Interactive <span className="gradient-text">Terminal</span>
          </h2>
          <p style={{ fontSize: "1rem", color: "var(--text3)" }}>Explore my portfolio the hacker way.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ maxWidth: 720, cursor: "text" }}
          onClick={() => inputRef.current?.focus()}
        >
          <div style={{
            borderRadius: 18, overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 24px 64px rgba(0,0,0,0.5)",
          }}>
            {/* Title bar */}
            <div style={{
              display: "flex", alignItems: "center", gap: 7,
              padding: "12px 18px",
              background: "rgba(255,255,255,0.03)",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}>
              {["#ef4444","#f59e0b","#22c55e"].map(c => (
                <div key={c} style={{ width: 12, height: 12, borderRadius: "50%", background: c, opacity: 0.7 }} />
              ))}
              <span style={{ marginLeft: 8, fontSize: "0.72rem", color: "rgba(255,255,255,0.25)", fontFamily: "monospace" }}>
                vaibhav@portfolio ~ %
              </span>
            </div>

            {/* Output */}
            <div style={{
              padding: "16px 20px", height: 300, overflowY: "auto",
              background: "rgba(0,0,0,0.65)", fontFamily: "monospace", fontSize: "0.82rem",
            }}>
              {lines.map((l, i) => (
                <div key={i} style={{ marginBottom: 4 }}>
                  {l.type === "in" ? (
                    <div style={{ display: "flex", gap: 8 }}>
                      <span style={{ color: "#22c55e" }}>❯</span>
                      <span style={{ color: "#fafafa" }}>{l.text}</span>
                    </div>
                  ) : (
                    <div style={{ color: "rgba(255,255,255,0.55)", paddingLeft: 20, whiteSpace: "pre-wrap", lineHeight: 1.6 }}>
                      {l.text}
                    </div>
                  )}
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Input row */}
            <div style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "10px 20px",
              background: "rgba(0,0,0,0.65)",
              borderTop: "1px solid rgba(255,255,255,0.05)",
            }}>
              <span style={{ color: "#22c55e", fontFamily: "monospace", fontSize: "0.82rem" }}>❯</span>
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={onKey}
                placeholder="Type a command…"
                autoComplete="off"
                spellCheck={false}
                style={{
                  flex: 1, background: "transparent", border: "none", outline: "none",
                  color: "#fafafa", fontFamily: "monospace", fontSize: "0.82rem",
                }}
              />
              <span className="terminal-cursor" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
