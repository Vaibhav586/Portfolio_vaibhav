"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { data } from "@/lib/data";
import { MessageCircle, X, Send, Bot } from "lucide-react";

interface Msg { role: "bot" | "user"; text: string; }

const SUGGESTED = ["About Vaibhav", "Projects", "Skills", "Experience", "Research", "Contact", "Resume"];

function getReply(q: string): string {
  const t = q.toLowerCase();
  if (t.includes("project"))                          return data.chatbot.projects;
  if (t.includes("skill") || t.includes("tech"))     return data.chatbot.skills;
  if (t.includes("experience") || t.includes("work") || t.includes("intern")) return data.chatbot.experience;
  if (t.includes("research") || t.includes("paper")) return data.chatbot.research;
  if (t.includes("contact") || t.includes("email"))  return data.chatbot.contact;
  if (t.includes("resume") || t.includes("cv"))      return data.chatbot.resume;
  return data.chatbot.about;
}

export default function Chatbot() {
  const [open, setOpen]     = useState(false);
  const [msgs, setMsgs]     = useState<Msg[]>([
    { role: "bot", text: "Hi 👋 I'm VaibhavGPT. Ask me anything about Vaibhav." },
  ]);
  const [input, setInput]   = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, typing]);

  const send = async (text: string) => {
    if (!text.trim()) return;
    setMsgs(m => [...m, { role: "user", text }]);
    setInput("");
    setTyping(true);
    await new Promise(r => setTimeout(r, 700 + Math.random() * 500));
    setTyping(false);
    setMsgs(m => [...m, { role: "bot", text: getReply(text) }]);
  };

  return (
    <>
      {/* Pulse button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => setOpen(o => !o)}
        style={{
          position: "fixed", bottom: 96, right: 24, zIndex: 50,
          width: 52, height: 52, borderRadius: 16, border: "none",
          background: "linear-gradient(135deg,#3b82f6,#8b5cf6)",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer",
          boxShadow: "0 4px 24px rgba(59,130,246,0.4)",
        }}
      >
        <AnimatePresence mode="wait">
          {open
            ? <motion.div key="x"    initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}><X size={20} style={{ color: "#fff" }} /></motion.div>
            : <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }}  animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}><MessageCircle size={20} style={{ color: "#fff" }} /></motion.div>
          }
        </AnimatePresence>
      </motion.button>

      {/* Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 16 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            style={{
              position: "fixed", bottom: 160, right: 24, zIndex: 50,
              width: 320, borderRadius: 24, overflow: "hidden",
              border: "1px solid rgba(59,130,246,0.2)",
              boxShadow: "0 24px 64px rgba(0,0,0,0.5)",
            }}
          >
            {/* Header */}
            <div style={{
              padding: "14px 18px", display: "flex", alignItems: "center", gap: 10,
              background: "linear-gradient(135deg,rgba(59,130,246,0.15),rgba(139,92,246,0.15))",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}>
              <div style={{
                width: 32, height: 32, borderRadius: 10,
                background: "linear-gradient(135deg,#3b82f6,#8b5cf6)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Bot size={16} style={{ color: "#fff" }} />
              </div>
              <div>
                <p style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text)" }}>VaibhavGPT</p>
                <p style={{ fontSize: "0.7rem", color: "#34d399", display: "flex", alignItems: "center", gap: 4 }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#34d399", display: "inline-block", animation: "pulse-slow 3s ease-in-out infinite" }} />
                  Online
                </p>
              </div>
            </div>

            {/* Messages */}
            <div style={{ height: 260, overflowY: "auto", padding: "14px 14px 8px", background: "rgba(9,9,11,0.96)", display: "flex", flexDirection: "column", gap: 10 }}>
              {msgs.map((m, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                  style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                  <div style={{
                    maxWidth: "85%", padding: "8px 12px", fontSize: "0.82rem", lineHeight: 1.55,
                    borderRadius: m.role === "bot" ? "4px 14px 14px 14px" : "14px 4px 14px 14px",
                    background: m.role === "bot" ? "rgba(255,255,255,0.06)" : "rgba(59,130,246,0.2)",
                    color: "var(--text2)",
                  }}>
                    {m.text}
                  </div>
                </motion.div>
              ))}
              {typing && (
                <div style={{ display: "flex", gap: 4, padding: "8px 12px" }}>
                  {[0,1,2].map(i => (
                    <motion.div key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: "rgba(255,255,255,0.3)" }}
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 0.55, delay: i * 0.12, repeat: Infinity }} />
                  ))}
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Suggestions */}
            {msgs.length <= 1 && (
              <div style={{
                padding: "8px 12px", display: "flex", gap: 6, overflowX: "auto",
                background: "rgba(9,9,11,0.96)", borderTop: "1px solid rgba(255,255,255,0.04)",
              }}>
                {SUGGESTED.slice(0, 4).map(s => (
                  <button key={s} onClick={() => send(s)} style={{
                    flexShrink: 0, padding: "4px 12px", borderRadius: 20, border: "1px solid rgba(59,130,246,0.2)",
                    background: "rgba(59,130,246,0.08)", color: "#60a5fa",
                    fontSize: "0.72rem", fontWeight: 500, cursor: "pointer", whiteSpace: "nowrap",
                  }}>{s}</button>
                ))}
              </div>
            )}

            {/* Input */}
            <div style={{
              display: "flex", gap: 8, padding: "10px 12px",
              background: "rgba(9,9,11,0.96)", borderTop: "1px solid rgba(255,255,255,0.04)",
            }}>
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter") send(input); }}
                placeholder="Ask me anything…"
                style={{
                  flex: 1, background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12,
                  padding: "8px 12px", fontSize: "0.82rem", color: "var(--text)",
                  outline: "none", fontFamily: "inherit",
                }}
              />
              <motion.button
                whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }}
                onClick={() => send(input)}
                disabled={!input.trim()}
                style={{
                  width: 36, height: 36, borderRadius: 10, border: "none",
                  background: "linear-gradient(135deg,#3b82f6,#8b5cf6)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", opacity: !input.trim() ? 0.4 : 1, flexShrink: 0,
                }}
              >
                <Send size={14} style={{ color: "#fff" }} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
