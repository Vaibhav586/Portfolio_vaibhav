"use client";
import { motion } from "framer-motion";
import { data } from "@/lib/data";
import { Mail, ArrowUp } from "lucide-react";
import { LinkedinIcon } from "@/components/ui/SocialIcons";

export default function Footer() {
  const links = ["About", "Experience", "Projects", "Research", "Skills", "Contact"];

  return (
    <footer style={{ borderTop: "1px solid var(--border)", paddingBlock: "64px 40px" }}>
      <div className="container-main">
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 48, marginBottom: 48, flexWrap: "wrap" }}>
          {/* Brand */}
          <div>
            <div className="gradient-text" style={{ fontSize: "1.8rem", fontWeight: 900, letterSpacing: "-0.04em", marginBottom: 12 }}>
              VAIBHAV
            </div>
            <p style={{ fontSize: "0.88rem", color: "var(--text3)", lineHeight: 1.7, maxWidth: 300 }}>
              {data.tagline}
            </p>
          </div>

          {/* Nav */}
          <div>
            <p style={{ fontSize: "0.7rem", color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600, marginBottom: 16 }}>
              Navigation
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {links.map(l => (
                <button
                  key={l}
                  onClick={() => document.getElementById(l.toLowerCase())?.scrollIntoView({ behavior: "smooth" })}
                  style={{ background: "none", border: "none", cursor: "pointer", textAlign: "left", fontSize: "0.88rem", color: "var(--text3)", padding: 0, transition: "color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "var(--text)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "var(--text3)")}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          {/* Socials */}
          <div>
            <p style={{ fontSize: "0.7rem", color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600, marginBottom: 16 }}>
              Connect
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { Icon: LinkedinIcon, href: data.linkedin,          label: "LinkedIn" },
                { Icon: Mail,         href: `mailto:${data.email}`, label: "Email"    },
              ].map(({ Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 4 }}
                  style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.88rem", color: "var(--text3)", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "var(--text)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "var(--text3)")}
                >
                  <Icon size={14} /> {label}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 24, borderTop: "1px solid var(--border)" }}>
          <p style={{ fontSize: "0.8rem", color: "var(--text3)" }}>
            © {new Date().getFullYear()} Vaibhav. Built with Next.js & ♥
          </p>
          <motion.button
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="glass"
            style={{
              width: 38, height: 38, borderRadius: 10, border: "none",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "var(--text3)", cursor: "pointer",
            }}
          >
            <ArrowUp size={16} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
