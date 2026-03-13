"use client";

import { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// ── GSAP lazy loader ──
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

// ── Animated counter ──
function Counter({ target, suffix = "" }) {
  const ref = useRef(null);
  useGSAP((gsap, ScrollTrigger) => {
    const obj = { val: 0 };
    gsap.to(obj, {
      val: parseFloat(target),
      duration: 2,
      ease: "power2.out",
      scrollTrigger: { trigger: ref.current, start: "top 85%" },
      onUpdate: () => {
        if (ref.current) {
          const v = Number.isInteger(parseFloat(target))
            ? Math.round(obj.val)
            : obj.val.toFixed(1);
          ref.current.textContent = v + suffix;
        }
      },
    });
  });
  return <span ref={ref}>0{suffix}</span>;
}

// ── Shared light section heading ──
function SectionHead({ eyebrow, title, body, refProp }) {
  return (
    <div ref={refProp} style={{ opacity: 0, textAlign: "center", marginBottom: 64 }}>
      <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--primary)", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 10 }}>
        {eyebrow}
      </p>
      <h2 style={{ fontSize: "clamp(1.875rem, 3vw, 2.4rem)", fontWeight: 700, marginBottom: 16, color: "#111" }}>
        {title}
      </h2>
      {body && (
        <p style={{ color: "#555", maxWidth: 560, margin: "0 auto", lineHeight: 1.75, fontSize: "1rem" }}>
          {body}
        </p>
      )}
      <div style={{ width: 72, height: 5, backgroundColor: "var(--primary)", margin: "22px auto 0", borderRadius: 9999 }} />
    </div>
  );
}

export default function Home() {
  const heroTagRef       = useRef(null);
  const heroH1Ref        = useRef(null);
  const heroParaRef      = useRef(null);
  const heroBtnsRef      = useRef(null);
  const heroImgRef       = useRef(null);
  const heroFloatRef     = useRef(null);
  const heroParticlesRef = useRef(null);
  const logosRef         = useRef(null);
  const servicesHeadRef  = useRef(null);
  const servicesCardsRef = useRef(null);
  const networkHeadRef   = useRef(null);
  const networkGridRef   = useRef(null);
  const digitalHeadRef   = useRef(null);
  const digitalGridRef   = useRef(null);
  const whyHeadRef       = useRef(null);
  const whyFeaturesRef   = useRef(null);
  const whyImgRef        = useRef(null);
  const statsRef         = useRef(null);
  const heroBgRef        = useRef(null);

  // ── Hero entrance with staggered reveals ──
  useGSAP((gsap) => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(heroTagRef.current,  { opacity: 0, y: 24, filter: "blur(8px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.7 })
      .fromTo(heroH1Ref.current,   { opacity: 0, y: 48, skewY: 2 },           { opacity: 1, y: 0, skewY: 0, duration: 0.9 }, "-=0.3")
      .fromTo(heroParaRef.current, { opacity: 0, y: 30 },                      { opacity: 1, y: 0, duration: 0.7 },           "-=0.4")
      .fromTo(heroBtnsRef.current, { opacity: 0, y: 20 },                      { opacity: 1, y: 0, duration: 0.6 },           "-=0.3")
      .fromTo(heroImgRef.current,  { opacity: 0, scale: 0.88, x: 60, rotationY: 15 }, { opacity: 1, scale: 1, x: 0, rotationY: 0, duration: 1.1, ease: "power3.out" }, "-=0.8");

    // Floating badges entrance
    gsap.fromTo(".hero-badge-float",
      { opacity: 0, scale: 0, rotation: -10 },
      { opacity: 1, scale: 1, rotation: 0, duration: 0.6, stagger: 0.15, ease: "back.out(2)", delay: 1.2 });

    // Continuous subtle float on hero image
    gsap.to(heroImgRef.current, {
      y: -14,
      duration: 3.5,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      delay: 1.5,
    });

    // Pulsing glow behind image
    gsap.to(".hero-glow", {
      scale: 1.18,
      opacity: 0.6,
      duration: 2.8,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });
  });

  // ── Hero parallax on scroll ──
  useGSAP((gsap, ST) => {
    gsap.to(heroBgRef.current, {
      yPercent: 30,
      ease: "none",
      scrollTrigger: { trigger: heroBgRef.current, start: "top top", end: "bottom top", scrub: true },
    });
  });

  // ── Logos ──
  useGSAP((gsap, ST) => {
    gsap.fromTo(logosRef.current?.children ?? [],
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: "power2.out",
        scrollTrigger: { trigger: logosRef.current, start: "top 85%" } });
  });

  // ── Services cards with magnetic-tilt entrance ──
  useGSAP((gsap, ST) => {
    gsap.fromTo(servicesHeadRef.current, { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power2.out",
        scrollTrigger: { trigger: servicesHeadRef.current, start: "top 85%" } });
    gsap.fromTo(servicesCardsRef.current?.children ?? [],
      { opacity: 0, y: 60, scale: 0.93, rotationX: 12 },
      { opacity: 1, y: 0, scale: 1, rotationX: 0, stagger: 0.13, duration: 0.75, ease: "back.out(1.5)",
        scrollTrigger: { trigger: servicesCardsRef.current, start: "top 80%" } });
  });

  // ── Network grid — cascade in from center ──
  useGSAP((gsap, ST) => {
    gsap.fromTo(networkHeadRef.current, { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power2.out",
        scrollTrigger: { trigger: networkHeadRef.current, start: "top 85%" } });

    // Animate cells in a wave pattern using index distance from center
    const cells = Array.from(networkGridRef.current?.children ?? []);
    const center = 4; // center of 3×3 grid
    cells.forEach((cell, i) => {
      const dist = Math.abs(i - center);
      gsap.fromTo(cell,
        { opacity: 0, scale: 0.85, filter: "brightness(0)" },
        { opacity: 1, scale: 1, filter: "brightness(1)", duration: 0.65, ease: "power2.out",
          scrollTrigger: { trigger: networkGridRef.current, start: "top 78%" },
          delay: dist * 0.07,
        });
    });
  });

  // ── Digital cards — slide from left with blur ──
  useGSAP((gsap, ST) => {
    gsap.fromTo(digitalHeadRef.current, { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power2.out",
        scrollTrigger: { trigger: digitalHeadRef.current, start: "top 85%" } });
    gsap.fromTo(digitalGridRef.current?.children ?? [],
      { opacity: 0, x: -50, filter: "blur(6px)" },
      { opacity: 1, x: 0, filter: "blur(0px)", stagger: 0.18, duration: 0.75, ease: "power3.out",
        scrollTrigger: { trigger: digitalGridRef.current, start: "top 80%" } });
  });

  // ── Why section — features stagger + image parallax ──
  useGSAP((gsap, ST) => {
    gsap.fromTo(whyHeadRef.current, { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power2.out",
        scrollTrigger: { trigger: whyHeadRef.current, start: "top 85%" } });
    gsap.fromTo(whyFeaturesRef.current?.children ?? [],
      { opacity: 0, x: -40, filter: "blur(4px)" },
      { opacity: 1, x: 0, filter: "blur(0px)", stagger: 0.18, duration: 0.65, ease: "power2.out",
        scrollTrigger: { trigger: whyFeaturesRef.current, start: "top 80%" } });
    gsap.fromTo(whyImgRef.current,
      { opacity: 0, scale: 0.9, clipPath: "inset(0 30% 0 0)" },
      { opacity: 1, scale: 1, clipPath: "inset(0 0% 0 0)", duration: 1.1, ease: "power3.out",
        scrollTrigger: { trigger: whyImgRef.current, start: "top 80%" } });

    // Stats count-up with scale pop
    gsap.fromTo(statsRef.current?.children ?? [],
      { opacity: 0, y: 24, scale: 0.88 },
      { opacity: 1, y: 0, scale: 1, stagger: 0.12, duration: 0.55, ease: "back.out(1.6)",
        scrollTrigger: { trigger: statsRef.current, start: "top 85%" } });

    // Subtle parallax on the why image
    gsap.to(whyImgRef.current?.querySelector("img"),
      { yPercent: -8, ease: "none",
        scrollTrigger: { trigger: whyImgRef.current, start: "top bottom", end: "bottom top", scrub: true } });
  });

  return (
    <div style={{ backgroundColor: "var(--background)", color: "var(--foreground)", fontFamily: "var(--font-sans)", minHeight: "100vh" }}>
      <Header />

      <main style={{ paddingTop: "var(--nav-height)" }}>

        {/* ══════════════════════════════════════
            HERO  (dark + real photo bg)
        ══════════════════════════════════════ */}
        <section style={{ position: "relative", overflow: "hidden", padding: "7rem 0 9rem", backgroundColor: "var(--background)", minHeight: "92vh", display: "flex", alignItems: "center" }}>
          {/* Parallax background photo */}
          <div ref={heroBgRef} style={{ position: "absolute", inset: "-20%", zIndex: 0 }}>
            <img
              src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1800&q=80"
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.09 }}
            />
          </div>

          {/* Layered glows */}
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1 }}>
            <div className="hero-glow" style={{ position: "absolute", top: "-15%", right: "-8%", width: "55%", height: "60%", background: "var(--primary-10)", filter: "blur(130px)", borderRadius: "9999px" }} />
            <div style={{ position: "absolute", bottom: "-12%", left: "-4%", width: "40%", height: "45%", background: "var(--primary-05-bg)", filter: "blur(110px)", borderRadius: "9999px" }} />
          </div>

          {/* Grid overlay */}
          <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(129,194,63,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(129,194,63,0.05) 1px, transparent 1px)", backgroundSize: "56px 56px", zIndex: 1, pointerEvents: "none" }} />

          <div style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: "var(--max-width)", margin: "0 auto", padding: "0 1.5rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }}>
            {/* Left */}
            <div>
              <div ref={heroTagRef} style={{ opacity: 0, display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 14px", borderRadius: "9999px", border: "1px solid var(--primary-30-border)", backgroundColor: "var(--primary-05-bg)", color: "var(--primary)", fontSize: "0.72rem", fontWeight: 700, marginBottom: 28, letterSpacing: "0.14em", textTransform: "uppercase" }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "var(--primary)", display: "inline-block", boxShadow: "0 0 8px var(--primary)" }} />
                Hardware · Software · Cloud · Security
              </div>
              <h1 ref={heroH1Ref} style={{ opacity: 0, fontSize: "clamp(2.6rem, 5.5vw, 4.5rem)", fontWeight: 700, lineHeight: 1.07, marginBottom: 24, color: "var(--foreground)" }}>
                Cutting-Edge IT Solutions for the{" "}
                <span style={{ color: "var(--primary)" }}>Digital Era</span>
              </h1>
              <p ref={heroParaRef} style={{ opacity: 0, fontSize: "1.15rem", color: "var(--text-muted)", marginBottom: 44, maxWidth: 520, lineHeight: 1.85 }}>
                From network security to website development to cloud services — we help businesses step confidently into the digital city with end-to-end IT support.
              </p>
              <div ref={heroBtnsRef} style={{ opacity: 0, display: "flex", gap: 16, flexWrap: "wrap" }}>
                <MagneticButton primary>Schedule Free Consultation</MagneticButton>
                <MagneticButton>Explore Our Services</MagneticButton>
              </div>
            </div>

            {/* Right — layered photo composition */}
            <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
              <div ref={heroImgRef} style={{ opacity: 0, position: "relative", width: "100%", maxWidth: 520 }}>
                {/* Glow blob behind */}
                <div className="hero-glow" style={{ position: "absolute", inset: "10%", background: "var(--primary-10)", filter: "blur(60px)", borderRadius: "9999px", zIndex: 0 }} />

                {/* Main hero image — server infrastructure */}
                <div style={{ position: "relative", zIndex: 10, borderRadius: "1.25rem", overflow: "hidden", border: "1px solid var(--border-subtle)", boxShadow: "0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(129,194,63,0.1)" }}>
                  <img
                    src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1000&q=85"
                    alt="Cloud Infrastructure"
                    style={{ width: "100%", height: 380, objectFit: "cover", display: "block" }}
                  />
                  {/* Gradient overlay at bottom */}
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,10,10,0.75) 0%, transparent 55%)" }} />

                  {/* Live status bar at bottom of image */}
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "var(--primary)", boxShadow: "0 0 10px var(--primary)", display: "inline-block" }} />
                      <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#fff", letterSpacing: "0.1em" }}>ALL SYSTEMS OPERATIONAL</span>
                    </div>
                    <span style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.5)" }}>24/7 MONITORING</span>
                  </div>
                </div>

                {/* Floating badge 1 — top left */}
                <div className="hero-badge-float" style={{ opacity: 0, position: "absolute", top: -18, left: -24, zIndex: 20, padding: "12px 16px", borderRadius: "0.875rem", backgroundColor: "var(--background)", border: "1px solid var(--border-subtle)", boxShadow: "0 12px 32px rgba(0,0,0,0.5)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: "#e8f7d4", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="16" height="16" fill="none" stroke="var(--primary)" viewBox="0 0 24 24">
                        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                      </svg>
                    </div>
                    <div>
                      <p style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--foreground)", lineHeight: 1 }}>Zero Threats</p>
                      <p style={{ fontSize: "0.62rem", color: "var(--text-muted)" }}>This month</p>
                    </div>
                  </div>
                </div>

                {/* Floating badge 2 — bottom right */}
                <div className="hero-badge-float" style={{ opacity: 0, position: "absolute", bottom: -20, right: -24, zIndex: 20, padding: "12px 16px", borderRadius: "0.875rem", backgroundColor: "var(--primary)", boxShadow: "0 12px 32px rgba(129,194,63,0.45)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: "rgba(0,0,0,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="16" height="16" fill="none" stroke="#0a0a0a" viewBox="0 0 24 24">
                        <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
                      </svg>
                    </div>
                    <div>
                      <p style={{ fontSize: "0.75rem", fontWeight: 800, color: "#0a0a0a", lineHeight: 1 }}>1× Install Fee</p>
                      <p style={{ fontSize: "0.62rem", color: "rgba(0,0,0,0.55)" }}>No surprise billing</p>
                    </div>
                  </div>
                </div>

                {/* Floating badge 3 — mid right */}
                <div className="hero-badge-float" style={{ opacity: 0, position: "absolute", top: "45%", right: -32, zIndex: 20, padding: "10px 14px", borderRadius: "0.75rem", backgroundColor: "var(--background)", border: "1px solid rgba(129,194,63,0.3)", boxShadow: "0 8px 24px rgba(0,0,0,0.4)" }}>
                  <p style={{ fontSize: "0.68rem", fontWeight: 700, color: "var(--primary)", letterSpacing: "0.08em", whiteSpace: "nowrap" }}>9+ Services</p>
                  <p style={{ fontSize: "0.6rem", color: "var(--text-muted)" }}>Network & Digital</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            CLIENT LOGOS
        ══════════════════════════════════════ */}
        <section style={{ padding: "3rem 0", borderTop: "1px solid #e5e7eb", borderBottom: "1px solid #e5e7eb", backgroundColor: "#f9fafb" }}>
          <div style={{ maxWidth: "var(--max-width)", margin: "0 auto", padding: "0 1.5rem", textAlign: "center" }}>
            <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 32 }}>
              Trusted by Businesses Worldwide
            </p>
            <div
              ref={logosRef}
              style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", gap: "3rem", filter: "grayscale(1) brightness(0.4)", transition: "filter 0.5s" }}
              onMouseEnter={e => { e.currentTarget.style.filter = "grayscale(0) brightness(1)"; }}
              onMouseLeave={e => { e.currentTarget.style.filter = "grayscale(1) brightness(0.4)"; }}
            >
              {[
                { alt: "TechCorp", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuD4WNJzuAjyjukksAUqHIBQT401ewNR35pYf1m3SE2e9aaUI1mgxfy6Suj1-Cu9viBzutiJTmyPipzB1FvbgmQtFFDV7-7fKByhuiuB850e9Zq_PNwK2iAVaiXGzjjfGkeQLaKza_LX8QDQs8ISin_tTv-M2AauiVm-HW3fHO2XECg6JqmMzZVmzAC20fLQcCmjZcxX7KOzUZdXdZbCSLFVjwI-7CXvVu8T8XSbWsTbt7tp9im7s2yhnBC_aPyDWv4Ma_jgnrKf82k" },
                { alt: "Global-X", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDLbsiNP5m34tubrD0UgJ9M2DqQ2ZrapJOnAlVNbgXAlZM6gH8wMxZmWCmHg4Rj33VR1U2glYwINYVlPCIbPrrRuHs4voIdKOSTW6kFBo1l60p4k91s3mEtDAA0oLvL6Y5Ow_OJIV3qiw0Rm0lhDnYV_gLc-1-OQwCacNz4asPOPMY92C5U0jsL5P2oeAtcSmfLOTLidk4eTde2TCAZ0YpTPeGmUtfKVloPrR7S7_rgjzMLdPlbisEB_Lk154oGqkBXSN_G53m-A4g" },
                { alt: "Nexus",    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCUH2q__HHWA66xUdMlAgbi7DWrIG18L2roboaH3dpQWYh1GFbygd7gfWNFR8XWQzjc-Q6dGjDOKuhf1jXwJJgZmcFJKPvtxXbn1BjV1VO1BMQcaRmlufzfIbDSsQ29gdXTWuDAWKRn1p1j9G2d0NmR4ZgSKFX8rK6lI60W00VFGhXNDdQkvaKBrDSlkDMex43jCGCfX9Pz91DZcSVfbF7S-65UI1uBp3aLBHbFVuaTE69zEczfXGdklA3JwI2OS5cMnVOk52UHFKw" },
                { alt: "Aether",   src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDFWj1yxlFvIV1EmRI7ia3RbSgHIfUw-THRCp8dMA1xOq9xO5po8EBo-I7Xnmy26qs0yWc2PR5hT2B_CrzPbSu5DwXdsqRmM2UpAta8n89Bvr9H-Q0kjdqdj3akIqrXg7c2qQGGaub-FdqH5QzrAR4dyV8K73GZo1gTuQpbBBuywuQiWO9c3uLZefQDH12J6bH_BaoPp79X5yAHqowj_CTT6bdc4xUcvwmctxU10VA626AfPAaGqcitaspkEoQCYkG3SsYzEwyB5gA" },
                { alt: "Phoenix",  src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBAx0f5Np0Tf8LZy9IlDQiV_Hdl-W_MRxH0Fpm5gG9Byrax-9Pq9G4Mox0rNz2FHd4vn2FDAn84wzTJ4Ga7BWpVaF3uYXCHPjuSdIug1h4PKmPrRqbzEM3SRZiEZA-DwqGoRlYvVnp3l19T5FVqCsjIJarSHU6rNSC5gnwnGNpanRAmDQCn4A_lDpweuyX2-1-8vYGW6ggALqN7vWLqtCv52QviLfQJI9AshLRtDabGF3gcqVqlzVEdWwrYlAphlXAXty-I3_0zGWQ" },
              ].map((logo, i) => (
                <img key={i} src={logo.src} alt={logo.alt} style={{ height: 32, opacity: 0 }} />
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            WHAT WE PROVIDE  (white)
        ══════════════════════════════════════ */}
        <section id="services" style={{ padding: "6rem 0", backgroundColor: "#ffffff" }}>
          <div style={{ maxWidth: "var(--max-width)", margin: "0 auto", padding: "0 1.5rem" }}>
            <SectionHead
              refProp={servicesHeadRef}
              eyebrow="What We Provide"
              title="End-to-End IT Solutions"
              body="Today's business demands new IT strategies for applications and data. We deliver cloud, security, infrastructure and database services to keep you ahead."
            />
            <div ref={servicesCardsRef} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 }}>
              {[
                {
                  title: "Cloud Services",
                  desc: "Reduce IT resource requirements, improve productivity, lower costs and accelerate time-to-market with our tailored cloud solutions.",
                  icon: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z",
                  img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&q=80",
                },
                {
                  title: "Data Security",
                  desc: "Cyber security built into every aspect of your company — from strategy and processes to human resources and delivery.",
                  icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
                  img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&q=80",
                },
                {
                  title: "Infrastructure Management",
                  desc: "Managed IT services tailored to your needs — from employee endpoints to fully managing your complex IT infrastructure.",
                  icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
                  img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&q=80",
                },
                {
                  title: "Database Services",
                  desc: "High-availability DBA services that are core to the smooth functioning of your most critical business applications.",
                  icon: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4",
                  img: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&q=80",
                },
              ].map((card, i) => <ServiceCard key={i} {...card} />)}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            NETWORK SERVICES  (photo grid)
        ══════════════════════════════════════ */}
        <section id="solutions" style={{ backgroundColor: "#ffffff", borderTop: "1px solid #e5e7eb" }}>
          <div style={{ maxWidth: "var(--max-width)", margin: "0 auto", padding: "6rem 1.5rem 3rem" }}>
            <SectionHead
              refProp={networkHeadRef}
              eyebrow="Hardware & Connectivity"
              title="Network Services"
              body="Every organization needs to protect its network, information and reputation. We supply and install the products that boost your security — at a one-time cost, no hidden maintenance fees."
            />
          </div>

          <div
            ref={networkGridRef}
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridTemplateRows: "repeat(3, 280px)", gap: 0 }}
          >
            {[
              { title: "Wireless Solutions",             href: "/wifi-solutions",              img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80" },
              { title: "CCTV Surveillance",              href: "/cctv-surveillance",           img: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=800&q=80" },
              { title: "Router Installation",            href: "/router-installation",         img: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80" },
              { title: "Switch Installation",            href: "/switch-installation",         img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80" },
              { title: "Firewall Installation",          href: "/firewall-installation",       img: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80" },
              { title: "Video Door Phones",              href: "/video-door-phones",           img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80" },
              { title: "Computer & Printer Maintenance", href: "/computer-maintenance",        img: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&q=80" },
              { title: "Smart Parking Solutions",        href: "/smart-parking",              img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80" },
              { title: "IP PABX / Telephone Systems",   href: "/ip-pabx",                    img: "https://images.unsplash.com/photo-1423666523292-b458da343f6a?w=800&q=80" },
            ].map((item, i) => <NetworkPhotoCard key={i} {...item} />)}
          </div>
        </section>

        {/* ══════════════════════════════════════
            DIGITAL SERVICES  (light grey)
        ══════════════════════════════════════ */}
        <section id="digital" style={{ padding: "6rem 0", backgroundColor: "#f9fafb", borderTop: "1px solid #e5e7eb" }}>
          <div style={{ maxWidth: "var(--max-width)", margin: "0 auto", padding: "0 1.5rem" }}>
            <SectionHead
              refProp={digitalHeadRef}
              eyebrow="Go Digital"
              title="Digital Services"
              body="We don't just build — we grow. From design to SEO, we help small businesses gain targeted traffic within 3 months and establish a strong digital presence."
            />
            <div ref={digitalGridRef} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
              {[
                {
                  title: "Website Design & Development",
                  desc: "Passionate about crafting beautiful, functional websites. We design, develop and handle SEO so your audience can actually find you.",
                  icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
                  badge: "SEO Included",
                  img: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=700&q=80",
                },
                {
                  title: "Digital Marketing",
                  desc: "Targeted campaigns that drive real results. We help small businesses compete in the digital marketplace and reach the right customers.",
                  icon: "M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z",
                  badge: "3-Month Results",
                  img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700&q=80",
                },
                {
                  title: "Mobile App Development",
                  desc: "Native and cross-platform mobile applications built for performance, usability and scalability across iOS and Android.",
                  icon: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z",
                  badge: "iOS & Android",
                  img: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=700&q=80",
                },
              ].map((card, i) => <DigitalCard key={i} {...card} />)}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            WHY CHOOSE US  (white)
        ══════════════════════════════════════ */}
        <section id="about" style={{ padding: "6rem 0", backgroundColor: "#ffffff", borderTop: "1px solid #e5e7eb" }}>
          <div style={{ maxWidth: "var(--max-width)", margin: "0 auto", padding: "0 1.5rem", display: "flex", flexWrap: "wrap", gap: 64, alignItems: "center" }}>
            <div style={{ flex: 1, minWidth: 280 }}>
              <div ref={whyHeadRef} style={{ opacity: 0 }}>
                <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--primary)", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 10 }}>Why Choose Us</p>
                <h2 style={{ fontSize: "clamp(1.75rem, 3vw, 2.25rem)", fontWeight: 700, marginBottom: 16, lineHeight: 1.2, color: "#111" }}>
                  We're Changing the Way You Work with Agencies
                </h2>
                <p style={{ color: "#555", lineHeight: 1.8, marginBottom: 40 }}>
                  Our products are not different — but our services are. We support both hardware and software. Network products at reasonable prices, installed with a single one-time charge. No surprise fees. No repeat billing.
                </p>
              </div>
              <div ref={whyFeaturesRef} style={{ display: "flex", flexDirection: "column", gap: 28 }}>
                {[
                  { title: "Global Network Protection", desc: "Enterprise-grade products that protect your network, information and reputation from unauthorized and malicious attacks.", icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
                  { title: "Awesome CCTV Features",     desc: "Dark Fighter technology picks up colour images in very low-light conditions — optimal performance day and night.", icon: "M15 10l4.553-2.069A1 1 0 0121 8.87v6.26a1 1 0 01-1.447.894L15 14M3 8h12a1 1 0 011 1v6a1 1 0 01-1 1H3a1 1 0 01-1-1V9a1 1 0 011-1z" },
                  { title: "Easy to Handle",            desc: "We provide full system training so your team is confident managing every product we install — no technical background required.", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
                ].map((f, i) => (
                  <FeatureRow key={i} {...f} />
                ))}
              </div>
            </div>

            <div style={{ flex: 1, minWidth: 280 }}>
              <div ref={whyImgRef} style={{ opacity: 0, overflow: "hidden" }}>
                <div
                  style={{ borderRadius: "var(--radius)", overflow: "hidden", border: "1px solid #e5e7eb", position: "relative", boxShadow: "0 20px 60px rgba(0,0,0,0.1)" }}
                  onMouseEnter={e => e.currentTarget.querySelector("img").style.transform = "scale(1.06)"}
                  onMouseLeave={e => e.currentTarget.querySelector("img").style.transform = "scale(1)"}
                >
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=900&q=80"
                    alt="IT Infrastructure"
                    style={{ width: "100%", height: 380, objectFit: "cover", display: "block", transition: "transform 0.7s ease" }}
                  />
                  {/* Overlay with primary accent */}
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(129,194,63,0.12) 0%, transparent 60%)" }} />
                </div>
              </div>
              <div ref={statsRef} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 16 }}>
                {[
                  { value: "1",   suffix: "×",   label: "One-time installation fee" },
                  { value: "3",   suffix: "mo",  label: "SEO traffic results" },
                  { value: "24",  suffix: "/7",  label: "Infrastructure monitoring" },
                  { value: "100", suffix: "%",   label: "Hardware + Software" },
                ].map((stat, i) => (
                  <div key={i} style={{ padding: "16px 18px", borderRadius: "0.875rem", border: "1px solid #e5e7eb", backgroundColor: "#f9fafb", opacity: 0, transition: "border-color 0.2s, box-shadow 0.2s", cursor: "default" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--primary)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(129,194,63,0.15)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "#e5e7eb"; e.currentTarget.style.boxShadow = "none"; }}>
                    <p style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--primary)", marginBottom: 2 }}>
                      <Counter target={stat.value} suffix={stat.suffix} />
                    </p>
                    <p style={{ fontSize: "0.75rem", color: "#6b7280", lineHeight: 1.4 }}>{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}

// ════════════════════════════════════
// SUBCOMPONENTS
// ════════════════════════════════════

function MagneticButton({ children, primary = false }) {
  const btnRef = useRef(null);
  const onMove = (e) => {
    const r = btnRef.current.getBoundingClientRect();
    btnRef.current.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.25}px, ${(e.clientY - r.top - r.height / 2) * 0.25}px)`;
  };
  const onLeave = () => {
    btnRef.current.style.transform = "translate(0,0)";
    if (primary) btnRef.current.style.boxShadow = "none";
  };
  return (
    <button ref={btnRef} onMouseMove={onMove} onMouseLeave={onLeave}
      onMouseEnter={() => { if (primary) btnRef.current.style.boxShadow = "0 0 32px rgba(129,194,63,0.5)"; }}
      style={{
        backgroundColor: primary ? "var(--primary)" : "transparent",
        color: primary ? "var(--primary-dark, #0a0a0a)" : "var(--foreground)",
        border: primary ? "none" : "1px solid var(--border-soft)",
        padding: "16px 32px", borderRadius: "var(--radius)", fontWeight: 700,
        fontSize: "1.05rem", cursor: "pointer", fontFamily: "var(--font-sans)",
        transition: "box-shadow 0.2s, transform 0.15s ease-out",
        display: "inline-flex", alignItems: "center", gap: 8,
      }}>
      {children}
      {primary && (
        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
        </svg>
      )}
    </button>
  );
}

function ServiceCard({ title, desc, icon, img }) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef(null);
  const onMove = (e) => {
    const r = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 14;
    const y = ((e.clientY - r.top) / r.height - 0.5) * 14;
    cardRef.current.style.transform = `perspective(700px) rotateX(${-y}deg) rotateY(${x}deg) scale(1.03)`;
  };
  const onLeave = () => {
    setHovered(false);
    cardRef.current.style.transform = "perspective(700px) rotateX(0) rotateY(0) scale(1)";
  };

  return (
    <div ref={cardRef} onMouseEnter={() => setHovered(true)} onMouseMove={onMove} onMouseLeave={onLeave}
      style={{
        borderRadius: "var(--radius)", cursor: "default", willChange: "transform", overflow: "hidden",
        backgroundColor: hovered ? "var(--primary)" : "#f9fafb",
        border: `1px solid ${hovered ? "var(--primary)" : "#e5e7eb"}`,
        boxShadow: hovered ? "0 20px 48px rgba(129,194,63,0.28)" : "0 1px 4px rgba(0,0,0,0.06)",
        transition: "background-color 0.3s, border-color 0.3s, box-shadow 0.3s, transform 0.15s ease-out",
      }}>
      {/* Image strip at top */}
      <div style={{ height: 120, overflow: "hidden", position: "relative" }}>
        <img src={img} alt={title}
          style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s", transform: hovered ? "scale(1.08)" : "scale(1)" }} />
        <div style={{ position: "absolute", inset: 0, background: hovered ? "rgba(129,194,63,0.35)" : "rgba(0,0,0,0.2)", transition: "background 0.3s" }} />
      </div>
      {/* Content */}
      <div style={{ padding: "24px 28px 28px" }}>
        <div style={{ width: 48, height: 48, borderRadius: 11, backgroundColor: hovered ? "rgba(255,255,255,0.22)" : "#e8f7d4", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18, transition: "background-color 0.3s" }}>
          <svg style={{ width: 24, height: 24, color: hovered ? "#fff" : "var(--primary)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d={icon} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
        <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: 10, color: hovered ? "#fff" : "#111" }}>{title}</h3>
        <p style={{ color: hovered ? "rgba(255,255,255,0.85)" : "#555", lineHeight: 1.7, fontSize: "0.875rem" }}>{desc}</p>
      </div>
    </div>
  );
}

function NetworkPhotoCard({ title, img, href = "#" }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position: "relative", overflow: "hidden", cursor: "pointer" }}
      onClick={() => { if (href !== "#") window.location.href = href; }}
    >
      <img src={img} alt={title}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover",
          transform: hovered ? "scale(1.1)" : "scale(1)", transition: "transform 0.65s ease" }} />

      {/* Vignette */}
      <div style={{ position: "absolute", inset: 0,
        background: hovered ? "rgba(0,0,0,0.58)" : "rgba(0,0,0,0.44)",
        transition: "background 0.4s ease" }} />

      {/* Green tint overlay on hover */}
      <div style={{ position: "absolute", inset: 0,
        backgroundColor: "var(--primary)",
        opacity: hovered ? 0.18 : 0,
        transition: "opacity 0.4s ease" }} />

      {/* Label */}
      <div style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", justifyContent: "flex-end", height: "100%", padding: "0 0 28px 28px" }}>
        {/* Arrow icon appears on hover */}
        <div style={{ marginBottom: 8, opacity: hovered ? 1 : 0, transform: hovered ? "translateY(0)" : "translateY(8px)", transition: "all 0.3s ease" }}>
          <svg width="20" height="20" fill="none" stroke="var(--primary)" viewBox="0 0 24 24">
            <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
          </svg>
        </div>
        <span style={{
          fontSize: "1.05rem", fontWeight: 700,
          color: hovered ? "var(--primary)" : "#fff",
          letterSpacing: "0.02em", lineHeight: 1.3,
          textShadow: "0 2px 12px rgba(0,0,0,0.6)",
          maxWidth: 180,
          transform: hovered ? "translateY(-4px)" : "translateY(0)",
          transition: "transform 0.3s ease, color 0.3s ease",
          display: "block",
        }}>
          {title}
        </span>
      </div>

      {/* Green bottom accent */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0,
        height: hovered ? 4 : 0,
        backgroundColor: "var(--primary)",
        transition: "height 0.3s ease", zIndex: 11 }} />

      {/* Grid cell border */}
      <div style={{ position: "absolute", inset: 0, border: "0.5px solid rgba(255,255,255,0.06)", pointerEvents: "none", zIndex: 12 }} />
    </div>
  );
}

function DigitalCard({ title, desc, icon, badge, img }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: "var(--radius)", cursor: "default",
        backgroundColor: "#fff",
        border: `1px solid ${hovered ? "var(--primary)" : "#e5e7eb"}`,
        position: "relative", overflow: "hidden",
        transform: hovered ? "translateY(-7px)" : "translateY(0)",
        boxShadow: hovered ? "0 24px 48px rgba(129,194,63,0.17)" : "0 1px 4px rgba(0,0,0,0.06)",
        transition: "all 0.3s",
      }}>
      {/* Image strip */}
      <div style={{ height: 140, overflow: "hidden", position: "relative" }}>
        <img src={img} alt={title}
          style={{ width: "100%", height: "100%", objectFit: "cover",
            transform: hovered ? "scale(1.07)" : "scale(1)", transition: "transform 0.55s ease" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 40%, #fff 100%)" }} />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3,
          background: hovered ? "linear-gradient(to right, var(--primary), #a8d96a)" : "transparent",
          transition: "background 0.3s" }} />
      </div>

      <div style={{ padding: "0 28px 28px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
          <div style={{ width: 48, height: 48, borderRadius: 11, backgroundColor: "#e8f7d4", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg style={{ width: 24, height: 24, color: "var(--primary)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d={icon} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </div>
          <span style={{ fontSize: "0.68rem", fontWeight: 700, color: "var(--primary)", padding: "4px 10px", borderRadius: "9999px", border: "1px solid #b5e07a", backgroundColor: "#f0fce8", letterSpacing: "0.05em" }}>{badge}</span>
        </div>
        <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: 10, color: "#111" }}>{title}</h3>
        <p style={{ color: "#555", lineHeight: 1.7, fontSize: "0.875rem" }}>{desc}</p>
      </div>
    </div>
  );
}

function FeatureRow({ title, desc, icon }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ display: "flex", gap: 20, padding: "20px", borderRadius: "0.875rem",
        backgroundColor: hovered ? "#f0fce8" : "transparent",
        border: `1px solid ${hovered ? "#b5e07a" : "transparent"}`,
        transition: "all 0.25s", cursor: "default" }}>
      <div style={{ flexShrink: 0, width: 48, height: 48, backgroundColor: hovered ? "var(--primary)" : "#e8f7d4",
        color: hovered ? "#0a0a0a" : "var(--primary)",
        display: "flex", alignItems: "center", justifyContent: "center",
        borderRadius: "var(--radius)", transition: "background 0.25s, color 0.25s" }}>
        <svg style={{ width: 24, height: 24 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d={icon} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </svg>
      </div>
      <div>
        <h4 style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: 6, color: "#111" }}>{title}</h4>
        <p style={{ color: "#555", lineHeight: 1.7, fontSize: "0.9rem" }}>{desc}</p>
      </div>
    </div>
  );
}