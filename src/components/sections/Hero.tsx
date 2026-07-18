"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { Mail, Download, ArrowRight, Code2, BookOpen, Briefcase, Trophy, Users, Award } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/SocialIcons";
import { data } from "@/lib/data";
import { useRef, useEffect, useState } from "react";

const ICON_MAP: Record<string, React.ElementType> = { Code2, BookOpen, Briefcase, Trophy, Users, Award };

/* ── Count-up number ─────────────────────────────────────────────────────── */
function CountUp({ target, inView }: { target: number; inView: boolean }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let cur = 0;
    const step = target / 36;
    const id = setInterval(() => {
      cur += step;
      if (cur >= target) { setN(target); clearInterval(id); }
      else setN(Math.round(cur));
    }, 38);
    return () => clearInterval(id);
  }, [inView, target]);
  return <>{n}</>;
}

/* ── Stat card ───────────────────────────────────────────────────────────── */
function StatCard({ stat, i }: { stat: typeof data.stats[0]; i: number }) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  const Icon = ICON_MAP[stat.icon] ?? Code2;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: i * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -5, scale: 1.03 }}
      className="glass"
      style={{
        borderRadius: 18,
        padding: "20px 16px",
        textAlign: "center",
        cursor: "default",
        transition: "box-shadow 0.3s",
      }}
    >
      <div style={{
        width: 36, height: 36, borderRadius: 10,
        background: "rgba(59,130,246,0.12)",
        border: "1px solid rgba(59,130,246,0.2)",
        display: "flex", alignItems: "center", justifyContent: "center",
        margin: "0 auto 10px",
      }}>
        <Icon size={16} style={{ color: "#60a5fa" }} />
      </div>
      <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "var(--text)", lineHeight: 1 }}>
        <CountUp target={stat.value} inView={inView} />
        <span style={{ color: "#60a5fa" }}>+</span>
      </div>
      <div style={{ fontSize: "0.72rem", color: "var(--text3)", marginTop: 4, fontWeight: 500, letterSpacing: "0.04em", textTransform: "uppercase" }}>
        {stat.label}
      </div>
    </motion.div>
  );
}

/* ── Profile card with 3-D tilt ──────────────────────────────────────────── */
function ProfileCard() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-120, 120], [12, -12]), { stiffness: 280, damping: 28 });
  const ry = useSpring(useTransform(mx, [-120, 120], [-12, 12]), { stiffness: 280, damping: 28 });

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set(e.clientX - r.left - r.width / 2);
    my.set(e.clientY - r.top - r.height / 2);
  };

  return (
    <motion.div
      ref={ref}
      style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d", perspective: 800 }}
      onMouseMove={onMove}
      onMouseLeave={() => { mx.set(0); my.set(0); }}
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="glass gradient-border noise"
        style={{
          borderRadius: 28,
          padding: 24,
          width: 300,
          boxShadow: "0 0 80px rgba(59,130,246,0.12), var(--shadow-card)",
        }}
      >
        {/* Avatar */}
        <div style={{
          width: "100%", height: 220, borderRadius: 18, marginBottom: 18,
          background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0c1a3a 100%)",
          position: "relative", overflow: "hidden",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(circle at 50% 60%, rgba(59,130,246,0.25), transparent 65%)",
          }} />
          <span className="gradient-text" style={{ fontSize: "5.5rem", fontWeight: 900, position: "relative", zIndex: 1 }}>V</span>
          {/* Animated ring */}
          <div style={{
            position: "absolute", inset: 12, borderRadius: "50%",
            border: "1px solid rgba(59,130,246,0.2)",
            animation: "spin-slow 10s linear infinite",
          }} />
        </div>

        <div style={{ fontWeight: 700, fontSize: "1.05rem", color: "var(--text)" }}>Vaibhav</div>
        <div style={{ fontSize: "0.82rem", color: "var(--text3)", marginTop: 2 }}>AI & ML Engineer</div>

        <div style={{ display: "flex", gap: 6, marginTop: 14, flexWrap: "wrap" }}>
          {["Python", "PyTorch", "LLMs"].map(t => (
            <span key={t} style={{
              fontSize: "0.7rem", padding: "3px 10px", borderRadius: 20,
              background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)",
              color: "#60a5fa", fontWeight: 500,
            }}>{t}</span>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 14, fontSize: "0.75rem", color: "#34d399" }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#34d399", animation: "pulse-slow 3s ease-in-out infinite", display: "inline-block" }} />
          Available for opportunities
        </div>

        {/* GitHub badge */}
        <div style={{
          marginTop: 14, padding: "8px 12px", borderRadius: 12,
          background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
          display: "flex", alignItems: "center", gap: 8,
        }}>
          <GithubIcon size={14} style={{ color: "var(--text3)" }} />
          <span style={{ fontSize: "0.72rem", color: "var(--text3)" }}>github.com/vaibhav</span>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Hero ────────────────────────────────────────────────────────────────── */
export default function Hero() {
  const seq = data.titles.flatMap(t => [t, 2200]);

  return (
    <section id="hero" style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", paddingTop: 80, paddingBottom: 120 }}>
      <div className="container-main">
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 64, flexWrap: "wrap" }}>

          {/* Left */}
          <div style={{ flex: 1, minWidth: 300, maxWidth: 620 }}>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                display: "inline-flex", alignItems: "center", gap: 7,
                padding: "6px 14px", borderRadius: 40,
                background: "rgba(59,130,246,0.08)",
                border: "1px solid rgba(59,130,246,0.2)",
                color: "#60a5fa", fontSize: "0.75rem", fontWeight: 600,
                marginBottom: 28, letterSpacing: "0.02em",
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#34d399", animation: "pulse-slow 3s ease-in-out infinite", display: "inline-block" }} />
              Open to AI / ML Roles
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="gradient-text"
              style={{ fontSize: "clamp(3.5rem, 8vw, 6rem)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 0.95, marginBottom: 18 }}
            >
              VAIBHAV
            </motion.h1>

            {/* Typing role */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)", fontWeight: 600, color: "var(--text2)", marginBottom: 22, minHeight: "2rem" }}
            >
              <TypeAnimation sequence={seq} wrapper="span" speed={52} repeat={Infinity} />
            </motion.div>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              style={{ fontSize: "1rem", color: "var(--text3)", lineHeight: 1.75, marginBottom: 36, maxWidth: 480 }}
            >
              {data.bio}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 36 }}
            >
              <motion.a
                href="/resume.pdf" download
                whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.96 }}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "11px 22px", borderRadius: 14,
                  background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                  color: "#fff", fontWeight: 600, fontSize: "0.88rem",
                  textDecoration: "none", boxShadow: "0 4px 20px rgba(59,130,246,0.35)",
                }}
              >
                <Download size={15} /> Download Resume
              </motion.a>
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.96 }}
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                className="glass"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "11px 22px", borderRadius: 14,
                  color: "var(--text2)", fontWeight: 600, fontSize: "0.88rem",
                  border: "1px solid var(--border2)", cursor: "pointer",
                }}
              >
                View Projects <ArrowRight size={15} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.96 }}
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="glass"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "11px 22px", borderRadius: 14,
                  color: "var(--text2)", fontWeight: 600, fontSize: "0.88rem",
                  border: "1px solid var(--border2)", cursor: "pointer",
                }}
              >
                <Mail size={15} /> Hire Me
              </motion.button>
            </motion.div>

            {/* Socials */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              style={{ display: "flex", gap: 10 }}
            >
              {[
                { Icon: GithubIcon,  href: data.github,   label: "GitHub" },
                { Icon: LinkedinIcon, href: data.linkedin, label: "LinkedIn" },
                { Icon: Mail,        href: `mailto:${data.email}`, label: "Email" },
              ].map(({ Icon, href, label }) => (
                <motion.a
                  key={label} href={href} target="_blank" rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, y: -3 }} whileTap={{ scale: 0.9 }}
                  title={label}
                  className="glass"
                  style={{
                    width: 40, height: 40, borderRadius: 12,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "var(--text3)", textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                >
                  <Icon size={17} />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Right */}
          <div style={{ flexShrink: 0 }}>
            <ProfileCard />
          </div>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
            gap: 14,
            marginTop: 72,
          }}
        >
          {data.stats.map((s, i) => <StatCard key={s.label} stat={s} i={i} />)}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        style={{ position: "absolute", bottom: 32, left: "50%", x: "-50%", display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div style={{ width: 1, height: 48, background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.2), transparent)" }} />
      </motion.div>
    </section>
  );
}
