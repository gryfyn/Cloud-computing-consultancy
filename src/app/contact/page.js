"use client";

import { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

function useGSAP(callback) {
  useEffect(() => {
    let ctx;
    import("gsap").then(({ gsap }) => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);
        ctx = gsap.context(() => callback(gsap, ScrollTrigger));
      });
    });
    return () => ctx?.revert();
  }, []);
}

const SERVICES = [
  "Cloud Services",
  "Data Security",
  "Infrastructure Management",
  "Database Services",
  "Wireless Solutions",
  "CCTV Surveillance",
  "Firewall Installation",
  "Website Development",
  "Digital Marketing",
  "Mobile App Development",
  "Other",
];

const SOCIALS = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: (
      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/971523646786",
    icon: (
      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
  {
    label: "Twitter / X",
    href: "https://x.com",
    icon: (
      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

// Why contact us tiles
const WHY_TILES = [
  { img: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&q=80", label: "Strategy Consultation" },
  { img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80", label: "Cloud Infrastructure" },
  { img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80", label: "Expert Team" },
  { img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80", label: "Digital Growth" },
];

export default function Contact() {
  const heroRef   = useRef(null);
  const ctaRef    = useRef(null);
  const infoRef   = useRef(null);
  const formRef   = useRef(null);
  const whyRef    = useRef(null);
  const whyHeadRef= useRef(null);

  const [form, setForm]         = useState({ name: "", company: "", email: "", phone: "", service: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [focused, setFocused]   = useState(null);

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1400);
  };

  // Hero
  useGSAP((gsap) => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(heroRef.current?.children ?? [],
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, stagger: 0.15, duration: 0.7 });
  });

  // CTA banner
  useGSAP((gsap, ST) => {
    gsap.fromTo(ctaRef.current, { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
        scrollTrigger: { trigger: ctaRef.current, start: "top 85%" } });
  });

  // Info cards
  useGSAP((gsap, ST) => {
    gsap.fromTo(infoRef.current?.children ?? [], { opacity: 0, y: 40 },
      { opacity: 1, y: 0, stagger: 0.12, duration: 0.7, ease: "back.out(1.4)",
        scrollTrigger: { trigger: infoRef.current, start: "top 80%" } });
  });

  // Form
  useGSAP((gsap, ST) => {
    gsap.fromTo(formRef.current, { opacity: 0, x: 40 },
      { opacity: 1, x: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: formRef.current, start: "top 80%" } });
  });

  // Why tiles
  useGSAP((gsap, ST) => {
    gsap.fromTo(whyHeadRef.current, { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7, scrollTrigger: { trigger: whyHeadRef.current, start: "top 85%" } });
    gsap.fromTo(whyRef.current?.children ?? [], { opacity: 0, scale: 0.93 },
      { opacity: 1, scale: 1, stagger: 0.08, duration: 0.6, ease: "power2.out",
        scrollTrigger: { trigger: whyRef.current, start: "top 80%" } });
  });

  const inputStyle = (name) => ({
    width: "100%", padding: "14px 16px", borderRadius: "0.65rem",
    border: `1.5px solid ${focused === name ? "var(--primary)" : "#e5e7eb"}`,
    backgroundColor: focused === name ? "#f8fef4" : "#f9fafb",
    fontSize: "0.95rem", color: "#111", outline: "none",
    fontFamily: "var(--font-sans)", transition: "border-color 0.2s, background-color 0.2s",
    boxSizing: "border-box",
    boxShadow: focused === name ? "0 0 0 3px rgba(129,194,63,0.15)" : "none",
  });

  const labelStyle = {
    display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#374151",
    marginBottom: 6, letterSpacing: "0.03em",
  };

  return (
    <div style={{ backgroundColor: "var(--background)", color: "var(--foreground)", fontFamily: "var(--font-sans)", minHeight: "100vh" }}>
      <Header />
      <main style={{ paddingTop: "var(--nav-height)" }}>

        {/* ══════════════════════════════════════
            HERO  (dark) — with background image
        ══════════════════════════════════════ */}
        <section style={{ position: "relative", overflow: "hidden", padding: "7rem 0 9rem", backgroundColor: "var(--background)" }}>
          {/* Background image */}
          <div style={{ position: "absolute", inset: 0 }}>
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80"
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.06 }}
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, var(--background) 0%, transparent 40%, var(--background) 100%)" }} />
          </div>

          <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
            <div style={{ position: "absolute", top: "-15%", right: "5%", width: "40%", height: "50%", background: "var(--primary-10)", filter: "blur(130px)", borderRadius: "9999px" }} />
            <div style={{ position: "absolute", bottom: "-10%", left: "5%",  width: "30%", height: "40%", background: "var(--primary-05-bg)", filter: "blur(100px)", borderRadius: "9999px" }} />
          </div>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(129,194,63,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(129,194,63,0.04) 1px, transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />

          <div ref={heroRef} style={{ position: "relative", zIndex: 10, maxWidth: "var(--max-width)", margin: "0 auto", padding: "0 1.5rem", textAlign: "center" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 14px", borderRadius: "9999px", border: "1px solid var(--primary-30-border)", backgroundColor: "var(--primary-05-bg)", color: "var(--primary)", fontSize: "0.72rem", fontWeight: 700, marginBottom: 28, letterSpacing: "0.14em", textTransform: "uppercase" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "var(--primary)", display: "inline-block" }} />
              Get In Touch
            </div>
            <h1 style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)", fontWeight: 700, lineHeight: 1.05, marginBottom: 24, color: "var(--foreground)" }}>
              Let's Build Something{" "}
              <span style={{ color: "var(--primary)" }}>Great Together</span>
            </h1>
            <p style={{ fontSize: "1.15rem", color: "var(--text-muted)", maxWidth: 620, margin: "0 auto 40px", lineHeight: 1.8 }}>
              Whether you need cloud migration, network installation, a new website, or just want to explore what's possible — our team is ready to help. Reach out and we'll respond within one business day.
            </p>
            {/* Social pills */}
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
              {SOCIALS.map((s, i) => <SocialPill key={i} {...s} />)}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            WHY CONTACT US  (dark — photo tiles)
        ══════════════════════════════════════ */}
        <section style={{ backgroundColor: "var(--background)", padding: "0 0 6rem" }}>
          <div style={{ maxWidth: "var(--max-width)", margin: "0 auto", padding: "0 1.5rem" }}>
            <div ref={whyHeadRef} style={{ opacity: 0, textAlign: "center", marginBottom: 36 }}>
              <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--primary)", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 8 }}>Why Reach Out</p>
              <h2 style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)", fontWeight: 700, color: "var(--foreground)" }}>
                One conversation can change everything
              </h2>
            </div>
            <div ref={whyRef} style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
              {WHY_TILES.map((tile, i) => (
                <WhyTile key={i} {...tile} />
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            CTA BANNER  (green)
        ══════════════════════════════════════ */}
        <div ref={ctaRef} style={{ opacity: 0, backgroundColor: "var(--primary)", padding: "2.5rem 1.5rem", position: "relative", overflow: "hidden" }}>
          {/* decorative image strip */}
          <div style={{ position: "absolute", top: 0, right: 0, width: "20%", height: "100%", opacity: 0.12, overflow: "hidden" }}>
            <img src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&q=80" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div style={{ position: "relative", zIndex: 1, maxWidth: "var(--max-width)", margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 20 }}>
            <div>
              <p style={{ fontSize: "1.4rem", fontWeight: 700, color: "#0a0a0a", marginBottom: 4 }}>
                Ready to future-proof your IT?
              </p>
              <p style={{ color: "rgba(0,0,0,0.65)", fontSize: "0.95rem" }}>
                Call us now or fill out the inquiry form below — no commitment required.
              </p>
            </div>
            <a href="tel:+971523646786"
              style={{ display: "inline-flex", alignItems: "center", gap: 10, backgroundColor: "#0a0a0a", color: "#fff", padding: "14px 28px", borderRadius: "var(--radius)", fontWeight: 700, fontSize: "1rem", textDecoration: "none", transition: "opacity 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
              +971 52 364 6786
            </a>
          </div>
        </div>

        {/* ══════════════════════════════════════
            CONTACT DETAILS + FORM  (white)
        ══════════════════════════════════════ */}
        <section style={{ padding: "6rem 0", backgroundColor: "#ffffff", borderBottom: "1px solid #e5e7eb" }}>
          <div style={{ maxWidth: "var(--max-width)", margin: "0 auto", padding: "0 1.5rem", display: "flex", flexWrap: "wrap", gap: 48, alignItems: "flex-start" }}>

            {/* ── Left column ── */}
            <div style={{ flex: "0 0 380px", minWidth: 280 }}>
              <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--primary)", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 10 }}>Contact Details</p>
              <h2 style={{ fontSize: "1.8rem", fontWeight: 700, color: "#111", marginBottom: 32, lineHeight: 1.2 }}>
                Find Us &amp; Reach Out
              </h2>

              {/* Info cards */}
              <div ref={infoRef} style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 32 }}>
                {[
                  { icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z", label: "Address", value: "AMC Boulevard-B Building\nAjman Media City\nDubai, United Arab Emirates", href: "https://maps.google.com/?q=Ajman+Media+City+Dubai" },
                  { icon: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9", label: "Website", value: "www.cloudccllc.com", href: "https://www.cloudccllc.com" },
                  { icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", label: "Email", value: "info@cloudccllc.com", href: "mailto:info@cloudccllc.com" },
                  { icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z", label: "Phone", value: "+971 52 364 6786", href: "tel:+971523646786" },
                ].map((item, i) => (
                  <InfoCard key={i} {...item} />
                ))}
              </div>

              {/* Office photo */}
              <div style={{ position: "relative", borderRadius: "1rem", overflow: "hidden", marginBottom: 20, boxShadow: "0 8px 32px rgba(0,0,0,0.1)" }}>
                <img
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80"
                  alt="Cloud Computing Consultancy Office — Ajman Media City, Dubai"
                  style={{ width: "100%", height: 200, objectFit: "cover", display: "block" }}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(129,194,63,0.25) 0%, transparent 60%)" }} />
                <div style={{ position: "absolute", bottom: 14, left: 14, padding: "8px 14px", borderRadius: "0.5rem", backgroundColor: "rgba(10,10,10,0.82)", backdropFilter: "blur(8px)", border: "1px solid rgba(129,194,63,0.25)" }}>
                  <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--primary)", marginBottom: 1 }}>Our Office</p>
                  <p style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.65)" }}>Ajman Media City, Dubai</p>
                </div>
              </div>

              {/* Social links */}
              <div style={{ padding: "18px 20px", borderRadius: "var(--radius)", border: "1px solid #e5e7eb", backgroundColor: "#f9fafb", marginBottom: 16 }}>
                <p style={{ fontSize: "0.78rem", fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 14 }}>Follow Us</p>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  {SOCIALS.map((s, i) => (
                    <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" title={s.label}
                      style={{ width: 40, height: 40, borderRadius: "0.5rem", border: "1px solid #e5e7eb", backgroundColor: "#fff", display: "flex", alignItems: "center", justifyContent: "center", color: "#6b7280", textDecoration: "none", transition: "all 0.2s" }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--primary)"; e.currentTarget.style.color = "var(--primary)"; e.currentTarget.style.backgroundColor = "#f0fce8"; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = "#e5e7eb"; e.currentTarget.style.color = "#6b7280"; e.currentTarget.style.backgroundColor = "#fff"; }}>
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>

              {/* Business hours */}
              <div style={{ padding: "18px 20px", borderRadius: "var(--radius)", border: "1px solid #e5e7eb", backgroundColor: "#f9fafb" }}>
                <p style={{ fontSize: "0.78rem", fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 14 }}>Business Hours</p>
                {[
                  { day: "Mon – Fri", hours: "9:00 AM – 6:00 PM" },
                  { day: "Saturday",  hours: "10:00 AM – 2:00 PM" },
                  { day: "Sunday",    hours: "Closed" },
                ].map((row, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: i < 2 ? "1px solid #f3f4f6" : "none" }}>
                    <span style={{ fontSize: "0.88rem", color: "#374151", fontWeight: 600 }}>{row.day}</span>
                    <span style={{ fontSize: "0.88rem", color: row.hours === "Closed" ? "#ef4444" : "var(--primary)", fontWeight: 700 }}>{row.hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right column — form ── */}
            <div ref={formRef} style={{ flex: 1, minWidth: 300, opacity: 0 }}>

              {/* Form header image */}
              <div style={{ position: "relative", borderRadius: "1rem", overflow: "hidden", marginBottom: 32, boxShadow: "0 8px 32px rgba(0,0,0,0.1)" }}>
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=900&q=80"
                  alt="Team consultation"
                  style={{ width: "100%", height: 200, objectFit: "cover", display: "block" }}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(10,10,10,0.7) 0%, rgba(10,10,10,0.2) 100%)" }} />
                <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 32px" }}>
                  <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--primary)", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 8 }}>Send an Inquiry</p>
                  <h2 style={{ fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)", fontWeight: 700, color: "#fff", lineHeight: 1.2, marginBottom: 8 }}>
                    Tell Us About Your Project
                  </h2>
                  <p style={{ color: "rgba(255,255,255,0.72)", fontSize: "0.88rem", lineHeight: 1.6 }}>
                    We'll get back to you within one business day.
                  </p>
                </div>
              </div>

              {submitted ? (
                <SuccessState onReset={() => { setSubmitted(false); setForm({ name: "", company: "", email: "", phone: "", service: "", message: "" }); }} />
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <div>
                      <label style={labelStyle}>Full Name <Required /></label>
                      <input name="name" required value={form.name} onChange={handleChange} placeholder="John Smith"
                        onFocus={() => setFocused("name")} onBlur={() => setFocused(null)}
                        style={inputStyle("name")} />
                    </div>
                    <div>
                      <label style={labelStyle}>Company Name</label>
                      <input name="company" value={form.company} onChange={handleChange} placeholder="Your Company LLC"
                        onFocus={() => setFocused("company")} onBlur={() => setFocused(null)}
                        style={inputStyle("company")} />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <div>
                      <label style={labelStyle}>Email Address <Required /></label>
                      <input name="email" type="email" required value={form.email} onChange={handleChange} placeholder="john@company.com"
                        onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}
                        style={inputStyle("email")} />
                    </div>
                    <div>
                      <label style={labelStyle}>Phone Number</label>
                      <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+971 50 000 0000"
                        onFocus={() => setFocused("phone")} onBlur={() => setFocused(null)}
                        style={inputStyle("phone")} />
                    </div>
                  </div>

                  <div>
                    <label style={labelStyle}>Service of Interest <Required /></label>
                    <div style={{ position: "relative" }}>
                      <select name="service" required value={form.service} onChange={handleChange}
                        onFocus={() => setFocused("service")} onBlur={() => setFocused(null)}
                        style={{ ...inputStyle("service"), appearance: "none", paddingRight: 44, cursor: "pointer" }}>
                        <option value="" disabled>Select a service…</option>
                        {SERVICES.map((s, i) => <option key={i} value={s}>{s}</option>)}
                      </select>
                      <svg style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#9ca3af" }} width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                      </svg>
                    </div>
                  </div>

                  <div>
                    <label style={labelStyle}>Your Message <Required /></label>
                    <textarea name="message" required rows={5} value={form.message} onChange={handleChange}
                      placeholder="Tell us about your current setup, challenges, or what you'd like to achieve…"
                      onFocus={() => setFocused("message")} onBlur={() => setFocused(null)}
                      style={{ ...inputStyle("message"), resize: "vertical", minHeight: 130, lineHeight: 1.65 }} />
                  </div>

                  <SubmitButton loading={loading} />

                  <p style={{ fontSize: "0.78rem", color: "#9ca3af", textAlign: "center", lineHeight: 1.6 }}>
                    By submitting this form you agree that Cloud Computing Consultancy may contact you regarding your inquiry. We never share your information with third parties.
                  </p>
                </form>
              )}
            </div>

          </div>
        </section>

        {/* ══════════════════════════════════════
            SERVICES PREVIEW  (light grey)
        ══════════════════════════════════════ */}
        <section style={{ padding: "5rem 0", backgroundColor: "#f9fafb", borderTop: "1px solid #e5e7eb" }}>
          <div style={{ maxWidth: "var(--max-width)", margin: "0 auto", padding: "0 1.5rem" }}>
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--primary)", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 8 }}>What We Offer</p>
              <h2 style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)", fontWeight: 700, color: "#111" }}>
                Not sure which service you need? Browse our expertise.
              </h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14 }}>
              {[
                { label: "Cloud Solutions",         img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&q=80", href: "/it-cloud-solutions" },
                { label: "Network & Wireless",      img: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&q=80", href: "#" },
                { label: "CCTV Surveillance",       img: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=400&q=80", href: "#" },
                { label: "Website Development",     img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80", href: "/website-development" },
                { label: "Digital Marketing",       img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80", href: "/digital-marketing" },
                { label: "Mobile App Development",  img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&q=80", href: "/mobile-app-development" },
              ].map((svc, i) => <ServicePreviewTile key={i} {...svc} />)}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}

// ══════════════════════════════════════
// SUBCOMPONENTS
// ══════════════════════════════════════

function WhyTile({ img, label }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position: "relative", borderRadius: "0.875rem", overflow: "hidden", height: 180, cursor: "pointer" }}
    >
      <img src={img} alt={label} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.5s", transform: hovered ? "scale(1.07)" : "scale(1)" }} />
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, rgba(0,0,0,${hovered ? 0.7 : 0.4}) 0%, transparent 60%)`, transition: "background 0.35s" }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, backgroundColor: "var(--primary)", transform: hovered ? "scaleX(1)" : "scaleX(0)", transformOrigin: "left", transition: "transform 0.35s" }} />
      <div style={{ position: "absolute", bottom: 16, left: 16, display: "flex", alignItems: "center", gap: 7 }}>
        <span style={{ width: 7, height: 7, borderRadius: "50%", backgroundColor: "var(--primary)" }} />
        <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#fff", letterSpacing: "0.04em" }}>{label}</span>
      </div>
    </div>
  );
}

function ServicePreviewTile({ label, img, href }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position: "relative", borderRadius: "0.875rem", overflow: "hidden", height: 140, display: "block", textDecoration: "none",
        border: `1px solid ${hovered ? "var(--primary)" : "#e5e7eb"}`,
        boxShadow: hovered ? "0 8px 24px rgba(129,194,63,0.18)" : "0 1px 4px rgba(0,0,0,0.05)",
        transition: "border-color 0.25s, box-shadow 0.25s, transform 0.25s",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
      }}
    >
      <img src={img} alt={label} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.5s", transform: hovered ? "scale(1.07)" : "scale(1)" }} />
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, rgba(0,0,0,${hovered ? 0.65 : 0.45}) 0%, transparent 65%)`, transition: "background 0.35s" }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, backgroundColor: "var(--primary)", transform: hovered ? "scaleX(1)" : "scaleX(0)", transformOrigin: "left", transition: "transform 0.35s" }} />
      <div style={{ position: "absolute", bottom: 14, left: 14, display: "flex", alignItems: "center", gap: 7 }}>
        <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "var(--primary)" }} />
        <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#fff" }}>{label}</span>
      </div>
    </a>
  );
}

function InfoCard({ icon, label, value, href }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex", alignItems: "flex-start", gap: 14,
        padding: "16px 18px", borderRadius: "0.75rem",
        border: `1px solid ${hovered ? "var(--primary)" : "#e5e7eb"}`,
        backgroundColor: hovered ? "#f0fce8" : "#f9fafb",
        textDecoration: "none", transition: "all 0.25s",
        boxShadow: hovered ? "0 4px 16px rgba(129,194,63,0.15)" : "none",
        transform: hovered ? "translateX(4px)" : "translateX(0)",
      }}
    >
      <div style={{ flexShrink: 0, width: 40, height: 40, borderRadius: 10, backgroundColor: hovered ? "#d4f0a0" : "#e8f7d4", display: "flex", alignItems: "center", justifyContent: "center", transition: "background-color 0.25s" }}>
        <svg style={{ width: 20, height: 20, color: "var(--primary)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d={icon} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </svg>
      </div>
      <div>
        <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>{label}</p>
        <p style={{ fontSize: "0.9rem", color: "#111", fontWeight: 600, lineHeight: 1.55, whiteSpace: "pre-line" }}>{value}</p>
      </div>
    </a>
  );
}

function SocialPill({ href, label, icon }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex", alignItems: "center", gap: 7,
        padding: "8px 16px", borderRadius: "9999px",
        border: `1px solid ${hovered ? "var(--primary)" : "var(--border-soft)"}`,
        backgroundColor: hovered ? "var(--primary-10)" : "transparent",
        color: hovered ? "var(--primary)" : "var(--text-muted)",
        fontSize: "0.82rem", fontWeight: 600, textDecoration: "none",
        transition: "all 0.2s", transform: hovered ? "translateY(-2px)" : "translateY(0)",
      }}
    >
      {icon}
      {label}
    </a>
  );
}

function SubmitButton({ loading }) {
  const btnRef = useRef(null);
  const onMove = (e) => {
    const r = btnRef.current.getBoundingClientRect();
    btnRef.current.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.2}px, ${(e.clientY - r.top - r.height / 2) * 0.2}px)`;
  };
  const onLeave = () => { btnRef.current.style.transform = "translate(0,0)"; btnRef.current.style.boxShadow = "none"; };
  return (
    <button ref={btnRef} type="submit" disabled={loading}
      onMouseMove={onMove} onMouseLeave={onLeave}
      onMouseEnter={() => { btnRef.current.style.boxShadow = "0 0 28px rgba(129,194,63,0.45)"; }}
      style={{
        width: "100%", padding: "16px 32px",
        backgroundColor: loading ? "#a8d96a" : "var(--primary)",
        color: "#0a0a0a", border: "none", borderRadius: "var(--radius)",
        fontWeight: 700, fontSize: "1.05rem",
        cursor: loading ? "not-allowed" : "pointer",
        fontFamily: "var(--font-sans)",
        display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
        transition: "box-shadow 0.2s, transform 0.15s ease-out, background-color 0.2s",
      }}
    >
      {loading ? (
        <>
          <svg style={{ animation: "spin 0.8s linear infinite" }} width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
          Sending…
        </>
      ) : (
        <>
          Send Inquiry
          <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </>
      )}
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </button>
  );
}

function SuccessState({ onReset }) {
  return (
    <div style={{ textAlign: "center", padding: "56px 32px", borderRadius: "var(--radius)", border: "1px solid #b5e07a", backgroundColor: "#f0fce8" }}>
      <div style={{ width: 64, height: 64, borderRadius: "50%", backgroundColor: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
        <svg width="30" height="30" fill="none" stroke="#fff" viewBox="0 0 24 24">
          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
        </svg>
      </div>
      <h3 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#111", marginBottom: 12 }}>Inquiry Sent!</h3>
      <p style={{ color: "#555", lineHeight: 1.7, marginBottom: 28, maxWidth: 380, margin: "0 auto 28px" }}>
        Thank you for reaching out. A member of the Cloud Computing Consultancy team will be in touch within one business day.
      </p>
      <button onClick={onReset}
        style={{ padding: "12px 28px", backgroundColor: "var(--primary)", color: "#0a0a0a", border: "none", borderRadius: "var(--radius)", fontWeight: 700, fontSize: "0.95rem", cursor: "pointer", fontFamily: "var(--font-sans)" }}>
        Send Another Inquiry
      </button>
    </div>
  );
}

function Required() {
  return <span style={{ color: "var(--primary)", marginLeft: 2 }}>*</span>;
}