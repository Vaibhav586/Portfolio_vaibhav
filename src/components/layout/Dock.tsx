"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState } from "react";
import { useTheme } from "@/components/ui/ThemeProvider";
import {
  Home, User, Briefcase, Code2, BookOpen,
  Zap, Trophy, Users, Mail, Sun, Moon, Download,
} from "lucide-react";

const NAV = [
  { id: "hero",         icon: Home,      label: "Home" },
  { id: "about",        icon: User,      label: "About" },
  { id: "experience",   icon: Briefcase, label: "Experience" },
  { id: "projects",     icon: Code2,     label: "Projects" },
  { id: "research",     icon: BookOpen,  label: "Research" },
  { id: "skills",       icon: Zap,       label: "Skills" },
  { id: "achievements", icon: Trophy,    label: "Achievements" },
  { id: "leadership",   icon: Users,     label: "Leadership" },
  { id: "contact",      icon: Mail,      label: "Contact" },
];

export default function Dock() {
  const { theme, toggle } = useTheme();
  const [hovered, setHovered] = useState<string | null>(null);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 60], [1, 0.92]);
  const scale   = useTransform(scrollY, [0, 120], [1, 0.93]);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const btnStyle = (active = false): React.CSSProperties => ({
    width: 40,
    height: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    border: "none",
    background: active ? "rgba(59,130,246,0.18)" : "transparent",
    color: active ? "#60a5fa" : "rgba(255,255,255,0.5)",
    cursor: "pointer",
    transition: "background 0.2s, color 0.2s",
    flexShrink: 0,
  });

  return (
    <motion.nav
      style={{ scale, opacity, position: "fixed", bottom: 24, left: "50%", x: "-50%", zIndex: 50 }}
    >
      <div
        className="glass"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          padding: "8px 12px",
          borderRadius: 22,
          boxShadow: "0 8px 40px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.07)",
        }}
      >
        {NAV.map(({ id, icon: Icon, label }) => (
          <div key={id} style={{ position: "relative" }}>
            {hovered === id && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  position: "absolute",
                  bottom: "calc(100% + 10px)",
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "rgba(255,255,255,0.08)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 8,
                  padding: "4px 10px",
                  fontSize: 11,
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.85)",
                  whiteSpace: "nowrap",
                  pointerEvents: "none",
                }}
              >
                {label}
              </motion.div>
            )}
            <motion.button
              className="dock-item"
              style={btnStyle()}
              onClick={() => scrollTo(id)}
              onMouseEnter={() => setHovered(id)}
              onMouseLeave={() => setHovered(null)}
              whileTap={{ scale: 0.88 }}
            >
              <Icon size={17} />
            </motion.button>
          </div>
        ))}

        <div style={{ width: 1, height: 24, background: "rgba(255,255,255,0.08)", margin: "0 4px" }} />

        {/* Theme */}
        <div style={{ position: "relative" }}>
          {hovered === "theme" && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                position: "absolute",
                bottom: "calc(100% + 10px)",
                left: "50%",
                transform: "translateX(-50%)",
                background: "rgba(255,255,255,0.08)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 8,
                padding: "4px 10px",
                fontSize: 11,
                fontWeight: 500,
                color: "rgba(255,255,255,0.85)",
                whiteSpace: "nowrap",
                pointerEvents: "none",
              }}
            >
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </motion.div>
          )}
          <motion.button
            className="dock-item"
            style={btnStyle()}
            onClick={toggle}
            onMouseEnter={() => setHovered("theme")}
            onMouseLeave={() => setHovered(null)}
            whileTap={{ scale: 0.88 }}
          >
            {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
          </motion.button>
        </div>

        {/* Resume */}
        <div style={{ position: "relative" }}>
          {hovered === "resume" && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                position: "absolute",
                bottom: "calc(100% + 10px)",
                left: "50%",
                transform: "translateX(-50%)",
                background: "rgba(255,255,255,0.08)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 8,
                padding: "4px 10px",
                fontSize: 11,
                fontWeight: 500,
                color: "rgba(255,255,255,0.85)",
                whiteSpace: "nowrap",
                pointerEvents: "none",
              }}
            >
              Resume
            </motion.div>
          )}
          <motion.a
            href="/resume.pdf"
            download
            className="dock-item"
            style={{ ...btnStyle(), textDecoration: "none" }}
            onMouseEnter={() => setHovered("resume")}
            onMouseLeave={() => setHovered(null)}
            whileTap={{ scale: 0.88 }}
          >
            <Download size={17} />
          </motion.a>
        </div>
      </div>
    </motion.nav>
  );
}
