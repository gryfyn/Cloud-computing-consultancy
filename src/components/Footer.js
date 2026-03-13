"use client";

import { useState } from "react";

const QUICK_LINKS = ["Services", "Solutions", "Case Studies", "About Us", "Contact"];
const SERVICES = ["Cloud Strategy", "Migration Services", "Security & Compliance", "Managed Services"];
const SOCIAL = [
  {
    label: "Twitter",
    href: "#",
    icon: <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />,
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />,
  },
  {
    label: "Instagram",
    href: "#",
    icon: <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />,
  },
];

function SocialIcon({ label, href, icon }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      aria-label={label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 40, height: 40, borderRadius: "0.5rem",
        display: "flex", alignItems: "center", justifyContent: "center",
        border: `1px solid ${hovered ? "var(--primary)" : "var(--border-soft)"}`,
        backgroundColor: hovered ? "var(--primary-10)" : "transparent",
        color: hovered ? "var(--primary)" : "var(--text-muted)",
        transition: "all 0.2s",
        textDecoration: "none",
      }}
    >
      <svg style={{ width: 18, height: 18 }} fill="currentColor" viewBox="0 0 24 24">{icon}</svg>
    </a>
  );
}

function FooterLink({ children, href = "#" }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        color: hovered ? "var(--primary)" : "var(--text-muted)",
        textDecoration: "none", fontSize: "0.9rem",
        display: "flex", alignItems: "center", gap: 6,
        transition: "color 0.2s, gap 0.2s",
      }}
    >
      <span style={{
        display: "inline-block", width: 6, height: 6,
        borderRadius: "50%", backgroundColor: "var(--primary)",
        opacity: hovered ? 1 : 0,
        transform: hovered ? "scale(1)" : "scale(0)",
        transition: "all 0.2s",
        flexShrink: 0,
      }} />
      {children}
    </a>
  );
}

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer style={{ position: "relative", backgroundColor: "var(--background)", overflow: "hidden" }}>

      {/* ── Glowing top border ── */}
      <div style={{
        position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
        width: "60%", height: 1,
        background: "linear-gradient(to right, transparent, var(--primary), transparent)",
      }} />

      {/* ── Background grid pattern ── */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: `
          linear-gradient(rgba(129,194,63,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(129,194,63,0.03) 1px, transparent 1px)
        `,
        backgroundSize: "48px 48px",
      }} />

      {/* ── Ambient glow ── */}
      <div style={{
        position: "absolute", bottom: "-20%", left: "50%", transform: "translateX(-50%)",
        width: "50%", height: "50%",
        background: "radial-gradient(ellipse, rgba(129,194,63,0.06) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* ── CTA Banner ── */}
      <div style={{
        position: "relative", borderBottom: "1px solid var(--border-subtle)",
        padding: "3rem 1.5rem",
      }}>
        <div style={{
          maxWidth: "var(--max-width)", margin: "0 auto",
          display: "flex", flexWrap: "wrap", alignItems: "center",
          justifyContent: "space-between", gap: 24,
        }}>
          <div>
            <p style={{ fontSize: "0.75rem", color: "var(--primary)", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 6 }}>
              Ready to scale?
            </p>
            <h3 style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)", fontWeight: 700, color: "var(--foreground)", margin: 0 }}>
              Start your cloud transformation today.
            </h3>
          </div>
          <a
            href="#contact"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              backgroundColor: "var(--primary)", color: "var(--primary-dark)",
              padding: "14px 28px", borderRadius: "var(--radius)", fontWeight: 700,
              textDecoration: "none", fontSize: "0.95rem", whiteSpace: "nowrap",
              boxShadow: "0 0 24px rgba(129,194,63,0.25)", transition: "all 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 0 36px rgba(129,194,63,0.45)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 0 24px rgba(129,194,63,0.25)"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            Get a Free Consultation
            <svg style={{ width: 16, height: 16 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </a>
        </div>
      </div>

      {/* ── Main footer grid ── */}
      <div style={{ maxWidth: "var(--max-width)", margin: "0 auto", padding: "4rem 1.5rem 2rem" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 48,
          marginBottom: 48,
        }}>

          {/* Brand column */}
          <div style={{ gridColumn: "span 1" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <img
                src="/assets/logocompcon.PNG"
                alt="Cloud Computing Consultancy"
                style={{ height: 40, width: "auto", objectFit: "contain" }}
              />
              <span style={{ fontWeight: 700, fontSize: "1rem", lineHeight: 1.2 }}>
                Cloud Computing<br />
                <span style={{ color: "var(--primary)" }}>Consultancy</span>
              </span>
            </div>
            <p style={{ color: "var(--text-muted)", lineHeight: 1.8, fontSize: "0.875rem", marginBottom: 24 }}>
              Empowering modern businesses through secure, scalable cloud solutions. We translate complex technology into measurable business value.
            </p>

            {/* Status badge */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "6px 12px", borderRadius: "9999px",
              border: "1px solid rgba(129,194,63,0.2)",
              backgroundColor: "rgba(129,194,63,0.05)",
              marginBottom: 24,
            }}>
              <span style={{
                width: 7, height: 7, borderRadius: "50%",
                backgroundColor: "var(--primary)",
                boxShadow: "0 0 6px var(--primary)",
                animation: "pulse 2s infinite",
              }} />
              <span style={{ fontSize: "0.75rem", color: "var(--primary)", fontWeight: 500 }}>All systems operational</span>
            </div>

            {/* Social icons */}
            <div style={{ display: "flex", gap: 8 }}>
              {SOCIAL.map((s, i) => <SocialIcon key={i} {...s} />)}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{
              fontSize: "0.95rem", fontWeight: 700, letterSpacing: "0.08em",
              textTransform: "uppercase", color: "var(--primary)",
              marginBottom: 20, paddingBottom: 12,
              borderBottom: "1px solid var(--border-subtle)",
            }}>
              Navigation
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {QUICK_LINKS.map((link, i) => (
                <FooterLink key={i} href={`#${link.toLowerCase().replace(/ /g, "-")}`}>
                  {link}
                </FooterLink>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 style={{
              fontSize: "0.95rem", fontWeight: 700, letterSpacing: "0.08em",
              textTransform: "uppercase", color: "var(--primary)",
              marginBottom: 20, paddingBottom: 12,
              borderBottom: "1px solid var(--border-subtle)",
            }}>
              Services
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {SERVICES.map((s, i) => (
                <FooterLink key={i}>{s}</FooterLink>
              ))}
            </div>
          </div>

          {/* Contact + Newsletter */}
          <div>
            <h4 style={{
              fontSize: "0.95rem", fontWeight: 700, letterSpacing: "0.08em",
              textTransform: "uppercase", color: "var(--primary)",
              marginBottom: 20, paddingBottom: 12,
              borderBottom: "1px solid var(--border-subtle)",
            }}>
              Contact
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
              {[
                { icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z", text: "AMC Boulevard-B Building\nAjman Media City\nDubai, United Arab Emirates" },
                { icon: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9", text: "www.cloudccllc.com" },
                { icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", text: "info@cloudccllc.com" },
                { icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z", text: "+971 52 364 6786" },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <div style={{
                    flexShrink: 0, width: 28, height: 28,
                    backgroundColor: "var(--primary-10)", borderRadius: 6,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    marginTop: 1,
                  }}>
                    <svg style={{ width: 13, height: 13, color: "var(--primary)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d={item.icon} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    </svg>
                  </div>
                  <span style={{ color: "var(--text-muted)", fontSize: "0.875rem", lineHeight: 1.6, whiteSpace: "pre-line" }}>{item.text}</span>
                </div>
              ))}
            </div>

            {/* Newsletter */}
            <div style={{
              padding: 16, borderRadius: "var(--radius)",
              border: "1px solid var(--border-subtle)",
              backgroundColor: "rgba(255,255,255,0.02)",
            }}>
              <p style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--foreground)", marginBottom: 10 }}>
                Stay in the loop
              </p>
              {subscribed ? (
                <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--primary)", fontSize: "0.8rem" }}>
                  <svg style={{ width: 16, height: 16 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                  You're subscribed!
                </div>
              ) : (
                <div style={{ display: "flex", gap: 8 }}>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && handleSubscribe()}
                    placeholder="your@email.com"
                    style={{
                      flex: 1, padding: "8px 12px",
                      borderRadius: "0.5rem", border: "1px solid var(--border-soft)",
                      backgroundColor: "var(--surface)", color: "var(--foreground)",
                      fontSize: "0.8rem", outline: "none",
                      fontFamily: "var(--font-sans)",
                    }}
                  />
                  <button
                    onClick={handleSubscribe}
                    style={{
                      padding: "8px 14px", borderRadius: "0.5rem",
                      backgroundColor: "var(--primary)", color: "var(--primary-dark)",
                      border: "none", cursor: "pointer", fontWeight: 700,
                      fontSize: "0.8rem", transition: "opacity 0.2s",
                    }}
                    onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                    onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                  >
                    →
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* ── Bottom bar ── */}
        <div style={{
          paddingTop: 24,
          borderTop: "1px solid var(--border-subtle)",
          display: "flex", flexWrap: "wrap",
          justifyContent: "space-between", alignItems: "center", gap: 16,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
            <span style={{ fontSize: "0.8rem", color: "var(--text-subtle)" }}>
              © 2024 Cloud Computing Consultancy. All rights reserved.
            </span>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              fontSize: "0.7rem", color: "var(--text-subtle)",
              padding: "3px 8px", borderRadius: "9999px",
              border: "1px solid var(--border-subtle)",
            }}>
              <svg width="10" height="14" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="1" y="1" width="8" height="12" rx="1" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              Powered with Glass Inc
            </span>
          </div>
          <div style={{ display: "flex", gap: 20 }}>
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((link, i) => (
              <a
                key={i}
                href="#"
                style={{ fontSize: "0.8rem", color: "var(--text-subtle)", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => e.target.style.color = "var(--foreground)"}
                onMouseLeave={e => e.target.style.color = "var(--text-subtle)"}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Pulse animation keyframe ── */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>

    </footer>
  );
}