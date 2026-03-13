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

// ── Services ──
const APP_SERVICES = [
  {
    number: "01",
    title: "Android App Development",
    body: "We build state-of-the-art native Android applications that are fast, reliable, and designed around your users. From simple tools to complex enterprise apps — built to Google's latest standards and optimised for the Play Store.",
    icon: "M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z",
    tags: ["Native Android", "Kotlin / Java", "Play Store", "Material Design"],
    img: "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=800&q=80",
  },
  {
    number: "02",
    title: "iOS App Development",
    body: "Premium iOS apps built for iPhone and iPad, designed to feel right at home on Apple's ecosystem. We follow Apple's Human Interface Guidelines to deliver polished, intuitive experiences that pass App Store review with ease.",
    icon: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z",
    tags: ["Native iOS", "Swift / SwiftUI", "App Store", "Apple HIG"],
    img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
  },
  {
    number: "03",
    title: "Windows Phone & Cross-Platform",
    body: "Reach every platform with a single, unified codebase. We develop cross-platform apps for Android, iOS and Windows Phone that look and feel native — without the cost of building three separate apps.",
    icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    tags: ["React Native", "Cross-Platform", "Windows Phone", "Single Codebase"],
    img: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80",
  },
  {
    number: "04",
    title: "UI/UX Design for Mobile",
    body: "A beautiful app that's confusing to use is a failed app. We start every project with user research, wireframes and interactive prototypes — designing intuitive flows that keep users engaged and coming back.",
    icon: "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z",
    tags: ["Wireframing", "Prototyping", "User Research", "Interaction Design"],
    img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
  },
  {
    number: "05",
    title: "Backend & API Integration",
    body: "Your app is only as powerful as the data behind it. We build secure, scalable backends and connect your app to third-party APIs, payment gateways, push notifications, databases, and cloud services.",
    icon: "M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01",
    tags: ["REST APIs", "Firebase", "Payment Gateway", "Push Notifications"],
    img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
  },
  {
    number: "06",
    title: "App Maintenance & Updates",
    body: "Launching is the beginning, not the end. We offer ongoing maintenance plans — OS update compatibility, bug fixes, new feature rollouts, performance monitoring, and App Store / Play Store management.",
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    tags: ["Bug Fixes", "OS Updates", "Store Management", "24/7 Support"],
    img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80",
  },
];

// ── Platform tiles ──
const PLATFORMS = [
  {
    name: "Android",
    desc: "3 billion+ active devices worldwide",
    img: "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=700&q=80",
    span: 1,
  },
  {
    name: "iOS",
    desc: "Premium users, highest app revenue share",
    img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=700&q=80",
    span: 2,
  },
  {
    name: "Cross-Platform",
    desc: "One build, every device",
    img: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=700&q=80",
    span: 2,
  },
  {
    name: "Windows",
    desc: "Enterprise and desktop reach",
    img: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=700&q=80",
    span: 1,
  },
];

// ── Process ──
const PROCESS = [
  { step: "01", title: "Discovery & Scoping",   desc: "We map out your app idea — features, user flows, platforms, and technical requirements — so nothing is left to guesswork.", img: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=500&q=80" },
  { step: "02", title: "UI/UX Design",          desc: "Wireframes, interactive prototypes and pixel-perfect mockups — shared with you for feedback before development begins.", img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&q=80" },
  { step: "03", title: "Development",           desc: "We build your app in structured sprints — clean code, tested features, and regular demos so you always know where things stand.", img: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=500&q=80" },
  { step: "04", title: "QA & Testing",          desc: "Rigorous testing across devices, screen sizes, and OS versions — so your users get a flawless experience from day one.", img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&q=80" },
  { step: "05", title: "Store Submission",      desc: "We handle the full App Store and Play Store submission process — screenshots, descriptions, compliance, and approval.", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&q=80" },
  { step: "06", title: "Launch & Support",      desc: "Your app goes live. We monitor performance, fix any post-launch issues, and keep it updated as platforms evolve.", img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&q=80" },
];

// ── Why us ──
const WHY = [
  { stat: "3",    label: "Platforms Covered",         desc: "Android, iOS and Windows Phone — we build across every platform your customers use, from a single engagement." },
  { stat: "Fast", label: "Rapid Development",         desc: "Sprint-based delivery with regular demos means you see progress every week — not just at the end." },
  { stat: "100%", label: "Tested on Real Devices",    desc: "Every app is tested across multiple real devices and OS versions before it touches the store." },
  { stat: "Top",  label: "State-of-the-Art Quality",  desc: "We develop state-of-the-art mobile apps built to the latest platform standards — not last year's patterns." },
];

export default function MobileAppDevelopment() {
  const introBadgeRef  = useRef(null);
  const introH1Ref     = useRef(null);
  const introParaRef   = useRef(null);
  const introBtnsRef   = useRef(null);
  const introImgRef    = useRef(null);
  const svcHeadRef     = useRef(null);
  const svcCardsRef    = useRef(null);
  const platformHeadRef= useRef(null);
  const platformRef    = useRef(null);
  const processHeadRef = useRef(null);
  const processRef     = useRef(null);
  const whyHeadRef     = useRef(null);
  const whyGridRef     = useRef(null);
  const ctaRef         = useRef(null);

  useGSAP((gsap) => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(introBadgeRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5 })
      .fromTo(introH1Ref.current,    { opacity: 0, y: 44 }, { opacity: 1, y: 0, duration: 0.85 }, "-=0.2")
      .fromTo(introParaRef.current,  { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.7  }, "-=0.45")
      .fromTo(introBtnsRef.current,  { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6  }, "-=0.35")
      .fromTo(introImgRef.current,   { opacity: 0, scale: 0.92, x: 40 }, { opacity: 1, scale: 1, x: 0, duration: 1 }, "-=0.8");
  });

  useGSAP((gsap, ST) => {
    gsap.fromTo(svcHeadRef.current, { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7, scrollTrigger: { trigger: svcHeadRef.current, start: "top 85%" } });
    gsap.fromTo(svcCardsRef.current?.children ?? [],
      { opacity: 0, y: 50, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, stagger: 0.1, duration: 0.7, ease: "back.out(1.4)",
        scrollTrigger: { trigger: svcCardsRef.current, start: "top 78%" } });
  });

  useGSAP((gsap, ST) => {
    gsap.fromTo(platformHeadRef.current, { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7, scrollTrigger: { trigger: platformHeadRef.current, start: "top 85%" } });
    gsap.fromTo(platformRef.current?.children ?? [],
      { opacity: 0, scale: 0.94 },
      { opacity: 1, scale: 1, stagger: 0.08, duration: 0.6, ease: "power2.out",
        scrollTrigger: { trigger: platformRef.current, start: "top 80%" } });
  });

  useGSAP((gsap, ST) => {
    gsap.fromTo(processHeadRef.current, { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7, scrollTrigger: { trigger: processHeadRef.current, start: "top 85%" } });
    gsap.fromTo(processRef.current?.children ?? [],
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.65,
        scrollTrigger: { trigger: processRef.current, start: "top 78%" } });
  });

  useGSAP((gsap, ST) => {
    gsap.fromTo(whyHeadRef.current, { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7, scrollTrigger: { trigger: whyHeadRef.current, start: "top 85%" } });
    gsap.fromTo(whyGridRef.current?.children ?? [],
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.65,
        scrollTrigger: { trigger: whyGridRef.current, start: "top 80%" } });
  });

  useGSAP((gsap, ST) => {
    gsap.fromTo(ctaRef.current, { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, scrollTrigger: { trigger: ctaRef.current, start: "top 85%" } });
  });

  return (
    <div style={{ backgroundColor: "var(--background)", color: "var(--foreground)", fontFamily: "var(--font-sans)", minHeight: "100vh" }}>
      <Header />
      <main style={{ paddingTop: "var(--nav-height)" }}>

        {/* ══════════════════════════════════════
            HERO  (dark)
        ══════════════════════════════════════ */}
        <section style={{ position: "relative", overflow: "hidden", padding: "7rem 0 9rem", backgroundColor: "var(--background)" }}>
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
            <div style={{ position: "absolute", top: "-20%", left: "-5%",  width: "50%", height: "55%", background: "var(--primary-10)", filter: "blur(140px)", borderRadius: "9999px" }} />
            <div style={{ position: "absolute", bottom: "-10%", right: "0%", width: "35%", height: "40%", background: "var(--primary-05-bg)", filter: "blur(100px)", borderRadius: "9999px" }} />
          </div>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(129,194,63,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(129,194,63,0.04) 1px, transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />

          <div style={{ position: "relative", zIndex: 10, maxWidth: "var(--max-width)", margin: "0 auto", padding: "0 1.5rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }}>
            {/* Left */}
            <div>
              <div ref={introBadgeRef} style={{ opacity: 0, display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 14px", borderRadius: "9999px", border: "1px solid var(--primary-30-border)", backgroundColor: "var(--primary-05-bg)", color: "var(--primary)", fontSize: "0.72rem", fontWeight: 700, marginBottom: 28, letterSpacing: "0.14em", textTransform: "uppercase" }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "var(--primary)", display: "inline-block" }} />
                Mobile App Development
              </div>
              <h1 ref={introH1Ref} style={{ opacity: 0, fontSize: "clamp(2.6rem, 5.5vw, 4.5rem)", fontWeight: 700, lineHeight: 1.07, marginBottom: 24, color: "var(--foreground)" }}>
                State-of-the-Art Apps{" "}
                <span style={{ color: "var(--primary)" }}>for Your Business</span>
              </h1>
              <p ref={introParaRef} style={{ opacity: 0, fontSize: "1.1rem", color: "var(--text-muted)", marginBottom: 40, maxWidth: 520, lineHeight: 1.85 }}>
                We develop <strong style={{ color: "var(--foreground)" }}>mobile apps for Android, iOS and Windows Phone</strong> — state-of-the-art experiences that keep your customers engaged and your brand at their fingertips, wherever they are.
              </p>
              <div ref={introBtnsRef} style={{ opacity: 0, display: "flex", gap: 16, flexWrap: "wrap" }}>
                <MagneticButton primary href="/contact">Start Your App</MagneticButton>
                <MagneticButton href="#services">Our Services</MagneticButton>
              </div>
            </div>

            {/* Right — phone mockup stack */}
            <div ref={introImgRef} style={{ opacity: 0, position: "relative", display: "flex", justifyContent: "center", alignItems: "center", minHeight: 420 }}>

              {/* Main phone mockup */}
              <div style={{ position: "relative", zIndex: 3, width: 220, borderRadius: "2.5rem", overflow: "hidden", border: "6px solid var(--border-soft)", boxShadow: "0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)" }}>
                {/* phone chrome top */}
                <div style={{ backgroundColor: "#0a0a0a", padding: "10px 0 6px", display: "flex", justifyContent: "center" }}>
                  <div style={{ width: 60, height: 6, borderRadius: 3, backgroundColor: "rgba(255,255,255,0.15)" }} />
                </div>
                <img src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&q=80" alt="Mobile App" style={{ width: "100%", height: 360, objectFit: "cover", display: "block" }} />
                {/* home bar */}
                <div style={{ backgroundColor: "#0a0a0a", padding: "8px 0 10px", display: "flex", justifyContent: "center" }}>
                  <div style={{ width: 80, height: 4, borderRadius: 2, backgroundColor: "rgba(255,255,255,0.2)" }} />
                </div>
              </div>

              {/* Background phone — left */}
              <div style={{ position: "absolute", left: 0, top: 40, zIndex: 2, width: 160, borderRadius: "2rem", overflow: "hidden", border: "5px solid var(--border-subtle)", boxShadow: "0 24px 48px rgba(0,0,0,0.5)", opacity: 0.85, transform: "rotate(-8deg)" }}>
                <div style={{ backgroundColor: "#111", padding: "8px 0 4px", display: "flex", justifyContent: "center" }}>
                  <div style={{ width: 44, height: 5, borderRadius: 3, backgroundColor: "rgba(255,255,255,0.1)" }} />
                </div>
                <img src="https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=300&q=80" alt="Android App" style={{ width: "100%", height: 260, objectFit: "cover", display: "block" }} />
                <div style={{ backgroundColor: "#111", padding: "6px 0 8px", display: "flex", justifyContent: "center" }}>
                  <div style={{ width: 60, height: 3, borderRadius: 2, backgroundColor: "rgba(255,255,255,0.15)" }} />
                </div>
              </div>

              {/* Background phone — right */}
              <div style={{ position: "absolute", right: 0, top: 40, zIndex: 2, width: 160, borderRadius: "2rem", overflow: "hidden", border: "5px solid var(--border-subtle)", boxShadow: "0 24px 48px rgba(0,0,0,0.5)", opacity: 0.85, transform: "rotate(8deg)" }}>
                <div style={{ backgroundColor: "#111", padding: "8px 0 4px", display: "flex", justifyContent: "center" }}>
                  <div style={{ width: 44, height: 5, borderRadius: 3, backgroundColor: "rgba(255,255,255,0.1)" }} />
                </div>
                <img src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=300&q=80" alt="iOS App" style={{ width: "100%", height: 260, objectFit: "cover", display: "block" }} />
                <div style={{ backgroundColor: "#111", padding: "6px 0 8px", display: "flex", justifyContent: "center" }}>
                  <div style={{ width: 60, height: 3, borderRadius: 2, backgroundColor: "rgba(255,255,255,0.15)" }} />
                </div>
              </div>

              {/* Platform badges floating bottom */}
              <div style={{ position: "absolute", bottom: -12, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 10, zIndex: 4 }}>
                {["Android", "iOS", "Windows"].map((p, i) => (
                  <div key={i} style={{ padding: "6px 14px", borderRadius: "9999px", backgroundColor: "rgba(10,10,10,0.9)", border: "1px solid rgba(129,194,63,0.3)", backdropFilter: "blur(8px)" }}>
                    <span style={{ fontSize: "0.68rem", fontWeight: 700, color: "var(--primary)" }}>{p}</span>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            TRUST STRIP  (white)
        ══════════════════════════════════════ */}
        <section style={{ padding: "3.5rem 0", backgroundColor: "#ffffff", borderTop: "1px solid #e5e7eb", borderBottom: "1px solid #e5e7eb" }}>
          <div style={{ maxWidth: "var(--max-width)", margin: "0 auto", padding: "0 1.5rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", borderRadius: "1rem", overflow: "hidden", border: "1px solid #e5e7eb" }}>
              {[
                { icon: "M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z",                                                  text: "Android, iOS and Windows Phone" },
                { icon: "M13 10V3L4 14h7v7l9-11h-7z",                                                                                                      text: "State-of-the-art mobile apps" },
                { icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",                                                                                   text: "Tested on real devices before launch" },
                { icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z",                        text: "Start-up friendly pricing" },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "20px 22px", borderRight: i < 3 ? "1px solid #e5e7eb" : "none", backgroundColor: "#fff", transition: "background 0.25s", cursor: "default" }}
                  onMouseEnter={e => e.currentTarget.style.background = "#f0fce8"}
                  onMouseLeave={e => e.currentTarget.style.background = "#fff"}>
                  <div style={{ flexShrink: 0, width: 36, height: 36, borderRadius: 9, backgroundColor: "#e8f7d4", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg style={{ width: 18, height: 18, color: "var(--primary)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d={item.icon} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    </svg>
                  </div>
                  <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "#374151", lineHeight: 1.5 }}>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            SERVICES  (white)
        ══════════════════════════════════════ */}
        <section id="services" style={{ padding: "6rem 0", backgroundColor: "#ffffff" }}>
          <div style={{ maxWidth: "var(--max-width)", margin: "0 auto", padding: "0 1.5rem" }}>
            <div ref={svcHeadRef} style={{ opacity: 0, textAlign: "center", marginBottom: 64 }}>
              <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--primary)", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 10 }}>What We Build</p>
              <h2 style={{ fontSize: "clamp(1.875rem, 3vw, 2.75rem)", fontWeight: 700, color: "#111", marginBottom: 16 }}>
                Complete Mobile App Development Services
              </h2>
              <p style={{ color: "#555", maxWidth: 560, margin: "0 auto", lineHeight: 1.8 }}>
                From concept to store listing — we handle every aspect of your mobile app, for every platform your customers use.
              </p>
              <div style={{ width: 72, height: 5, backgroundColor: "var(--primary)", margin: "22px auto 0", borderRadius: 9999 }} />
            </div>
            <div ref={svcCardsRef} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {APP_SERVICES.map((svc, i) => (
                <ServiceRow key={i} {...svc} reverse={i % 2 !== 0} />
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            PLATFORM GALLERY  (dark)
        ══════════════════════════════════════ */}
        <section style={{ padding: "6rem 0", backgroundColor: "var(--background)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(129,194,63,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(129,194,63,0.03) 1px, transparent 1px)", backgroundSize: "50px 50px", pointerEvents: "none" }} />
          <div style={{ position: "relative", zIndex: 10, maxWidth: "var(--max-width)", margin: "0 auto", padding: "0 1.5rem" }}>
            <div ref={platformHeadRef} style={{ opacity: 0, textAlign: "center", marginBottom: 48 }}>
              <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--primary)", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 10 }}>Platforms We Cover</p>
              <h2 style={{ fontSize: "clamp(1.875rem, 3vw, 2.75rem)", fontWeight: 700, color: "var(--foreground)", marginBottom: 14 }}>
                Your App on Every Device
              </h2>
              <p style={{ color: "var(--text-muted)", maxWidth: 500, margin: "0 auto", lineHeight: 1.75 }}>
                We develop for Android, iOS and Windows Phone — so your customers can find and use your app no matter what device they carry.
              </p>
              <div style={{ width: 72, height: 5, backgroundColor: "var(--primary)", margin: "22px auto 0", borderRadius: 9999 }} />
            </div>
            <div ref={platformRef} style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridAutoRows: "280px", gap: 16 }}>
              {PLATFORMS.map((item, i) => (
                <PlatformTile key={i} {...item} />
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            PROCESS  (light grey)
        ══════════════════════════════════════ */}
        <section style={{ padding: "6rem 0", backgroundColor: "#f9fafb", borderTop: "1px solid #e5e7eb" }}>
          <div style={{ maxWidth: "var(--max-width)", margin: "0 auto", padding: "0 1.5rem" }}>
            <div ref={processHeadRef} style={{ opacity: 0, textAlign: "center", marginBottom: 56 }}>
              <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--primary)", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 10 }}>How We Work</p>
              <h2 style={{ fontSize: "clamp(1.875rem, 3vw, 2.75rem)", fontWeight: 700, color: "#111", marginBottom: 14 }}>
                Our App Development Process
              </h2>
              <p style={{ color: "#6b7280", maxWidth: 500, margin: "0 auto", lineHeight: 1.75 }}>
                From your first idea to a live app on the store — a transparent, sprint-based process with no surprises.
              </p>
              <div style={{ width: 72, height: 5, backgroundColor: "var(--primary)", margin: "22px auto 0", borderRadius: 9999 }} />
            </div>
            <div ref={processRef} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
              {PROCESS.map((p, i) => <ProcessCard key={i} {...p} />)}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            SPLIT IMAGE  (white)
        ══════════════════════════════════════ */}
        <section style={{ backgroundColor: "#ffffff", borderTop: "1px solid #e5e7eb" }}>
          <div style={{ maxWidth: "var(--max-width)", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr" }}>
            {/* Left — image */}
            <div style={{ position: "relative", minHeight: 480, overflow: "hidden" }}>
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&q=80"
                alt="App Development Team"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(129,194,63,0.35) 0%, transparent 60%)" }} />
              <div style={{ position: "absolute", bottom: 32, left: 32, padding: "14px 20px", borderRadius: "0.75rem", backgroundColor: "rgba(10,10,10,0.85)", backdropFilter: "blur(12px)", border: "1px solid rgba(129,194,63,0.3)" }}>
                <p style={{ fontSize: "1.4rem", fontWeight: 900, color: "var(--primary)", marginBottom: 2 }}>3 Platforms</p>
                <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.7)" }}>Android · iOS · Windows Phone</p>
              </div>
            </div>
            {/* Right — text */}
            <div style={{ padding: "5rem 4rem", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--primary)", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 14 }}>Why Mobile</p>
              <h2 style={{ fontSize: "clamp(1.75rem, 2.8vw, 2.4rem)", fontWeight: 700, color: "#111", lineHeight: 1.2, marginBottom: 20 }}>
                Your Brand in Your<br />Customers' Pockets
              </h2>
              <p style={{ color: "#555", lineHeight: 1.85, marginBottom: 20, fontSize: "0.95rem" }}>
                Mobile apps put your business exactly where your customers spend most of their time. We develop <strong>state-of-the-art mobile apps for your business</strong> — keeping your customers engaged, informed, and connected to your brand at all times.
              </p>
              <p style={{ color: "#555", lineHeight: 1.85, marginBottom: 32, fontSize: "0.95rem" }}>
                Whether it's a customer-facing app, an internal tool, or an e-commerce experience — we build it to the highest standard, for every platform, at <strong style={{ color: "var(--primary)" }}>prices that work for start-up businesses</strong>.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  "Full handover — you own the source code",
                  "Built to the latest platform standards and guidelines",
                  "App Store and Play Store submission handled for you",
                ].map((pt, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <div style={{ flexShrink: 0, width: 20, height: 20, borderRadius: "50%", backgroundColor: "#e8f7d4", display: "flex", alignItems: "center", justifyContent: "center", marginTop: 2 }}>
                      <svg style={{ width: 11, height: 11, color: "var(--primary)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                      </svg>
                    </div>
                    <p style={{ fontSize: "0.9rem", color: "#374151", fontWeight: 500, lineHeight: 1.5 }}>{pt}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            COMPETITOR CHALLENGE  (green)
        ══════════════════════════════════════ */}
        <section style={{ backgroundColor: "var(--primary)", padding: "5rem 0", overflow: "hidden", position: "relative" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px)", backgroundSize: "40px 40px", pointerEvents: "none" }} />
          <div style={{ position: "absolute", top: 0, right: 0, width: "28%", height: "100%", overflow: "hidden", opacity: 0.15 }}>
            <img src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&q=80" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div style={{ position: "relative", zIndex: 10, maxWidth: "var(--max-width)", margin: "0 auto", padding: "0 1.5rem", display: "flex", flexWrap: "wrap", gap: 48, alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ flex: 1, minWidth: 260 }}>
              <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "rgba(0,0,0,0.5)", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 12 }}>Your competitors have an app</p>
              <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "#0a0a0a", lineHeight: 1.15, marginBottom: 20 }}>
                Ready to put your brand<br />in every pocket?
              </h2>
              <p style={{ color: "rgba(0,0,0,0.72)", fontSize: "1.05rem", lineHeight: 1.8, maxWidth: 520 }}>
                Don't worry — <strong>"Let's Meet!"</strong> We develop state-of-the-art mobile apps for Android, iOS and Windows Phone. We ensure your app will be more polished, more functional, and more visible than your competitors'.
              </p>
            </div>
            <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", gap: 14, minWidth: 200 }}>
              <MagneticButtonDark href="/contact">Book a Free Consultation</MagneticButtonDark>
              <a href="tel:+971523646786"
                style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "14px 28px", borderRadius: "var(--radius)", border: "2px solid rgba(0,0,0,0.2)", color: "#0a0a0a", fontWeight: 700, fontSize: "0.95rem", textDecoration: "none", transition: "background 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(0,0,0,0.08)"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
                +971 52 364 6786
              </a>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            WHY US  (white)
        ══════════════════════════════════════ */}
        <section style={{ padding: "6rem 0", backgroundColor: "#ffffff", borderTop: "1px solid #e5e7eb" }}>
          <div style={{ maxWidth: "var(--max-width)", margin: "0 auto", padding: "0 1.5rem" }}>
            <div ref={whyHeadRef} style={{ opacity: 0, textAlign: "center", marginBottom: 56 }}>
              <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--primary)", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 10 }}>Why Us</p>
              <h2 style={{ fontSize: "clamp(1.875rem, 3vw, 2.75rem)", fontWeight: 700, color: "#111", marginBottom: 14 }}>
                Mobile Apps Built to the<br />Highest Standard
              </h2>
              <div style={{ width: 72, height: 5, backgroundColor: "var(--primary)", margin: "0 auto", borderRadius: 9999 }} />
            </div>
            <div ref={whyGridRef} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
              {WHY.map((item, i) => <WhyCard key={i} {...item} />)}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            BOTTOM CTA  (dark with image bg)
        ══════════════════════════════════════ */}
        <section style={{ position: "relative", overflow: "hidden", padding: "7rem 0", backgroundColor: "var(--background)" }}>
          <div style={{ position: "absolute", inset: 0 }}>
            <img src="https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=1600&q=80" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.08 }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, var(--background) 0%, transparent 40%, var(--background) 100%)" }} />
          </div>
          <div style={{ position: "relative", zIndex: 10, maxWidth: 720, margin: "0 auto", padding: "0 1.5rem", textAlign: "center" }}>
            <div ref={ctaRef} style={{ opacity: 0 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 14px", borderRadius: "9999px", border: "1px solid var(--primary-30-border)", backgroundColor: "var(--primary-05-bg)", color: "var(--primary)", fontSize: "0.72rem", fontWeight: 700, marginBottom: 24, letterSpacing: "0.14em", textTransform: "uppercase" }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "var(--primary)", display: "inline-block" }} />
                Ready to build your app?
              </div>
              <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "var(--foreground)", marginBottom: 20, lineHeight: 1.15 }}>
                Let's Build Your Mobile App
              </h2>
              <p style={{ color: "var(--text-muted)", fontSize: "1.05rem", lineHeight: 1.8, marginBottom: 40 }}>
                Android, iOS, Windows Phone — all under one roof. Tell us your idea and we'll turn it into a state-of-the-art app your customers will love.
              </p>
              <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
                <a href="/contact"
                  style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "16px 36px", backgroundColor: "var(--primary)", color: "#0a0a0a", borderRadius: "var(--radius)", fontWeight: 700, fontSize: "1.05rem", textDecoration: "none", transition: "box-shadow 0.2s, transform 0.15s" }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 0 28px rgba(129,194,63,0.5)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}>
                  Start Your App
                  <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                </a>
                <a href="mailto:info@cloudccllc.com"
                  style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "16px 32px", backgroundColor: "transparent", color: "var(--foreground)", border: "1.5px solid var(--border-soft)", borderRadius: "var(--radius)", fontWeight: 700, fontSize: "1.05rem", textDecoration: "none", transition: "border-color 0.2s, color 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--primary)"; e.currentTarget.style.color = "var(--primary)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border-soft)"; e.currentTarget.style.color = "var(--foreground)"; }}>
                  info@cloudccllc.com
                </a>
              </div>
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

function ServiceRow({ number, title, body, icon, tags, img, reverse }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex", flexDirection: reverse ? "row-reverse" : "row",
        flexWrap: "wrap", borderRadius: "1rem", overflow: "hidden",
        border: `1px solid ${hovered ? "var(--primary)" : "#e5e7eb"}`,
        transition: "border-color 0.3s, box-shadow 0.3s",
        boxShadow: hovered ? "0 16px 48px rgba(129,194,63,0.12)" : "0 2px 8px rgba(0,0,0,0.04)",
      }}
    >
      <div style={{ flex: "0 0 260px", minHeight: 200, position: "relative", overflow: "hidden" }}>
        <img src={img} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.5s ease", transform: hovered ? "scale(1.06)" : "scale(1)" }} />
        <div style={{ position: "absolute", inset: 0, backgroundColor: "var(--primary)", opacity: hovered ? 0.35 : 0, transition: "opacity 0.35s" }} />
        <div style={{ position: "absolute", top: 14, left: 14, width: 36, height: 36, borderRadius: "50%", backgroundColor: hovered ? "var(--primary)" : "rgba(0,0,0,0.55)", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.3s", backdropFilter: "blur(6px)" }}>
          <span style={{ fontSize: "0.72rem", fontWeight: 900, color: hovered ? "#0a0a0a" : "#fff" }}>{number}</span>
        </div>
        <div style={{ position: "absolute", bottom: 14, right: 14, width: 40, height: 40, borderRadius: 10, backgroundColor: hovered ? "#0a0a0a" : "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.3s", backdropFilter: "blur(6px)" }}>
          <svg style={{ width: 20, height: 20, color: "var(--primary)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d={icon} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 260, padding: "28px 32px", backgroundColor: "#fff" }}>
        <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#111", marginBottom: 10, lineHeight: 1.3 }}>{title}</h3>
        <p style={{ color: "#555", lineHeight: 1.8, marginBottom: 18, fontSize: "0.93rem" }}>{body}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
          {tags.map((tag, i) => (
            <span key={i} style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--primary)", padding: "4px 10px", borderRadius: "9999px", border: "1px solid #b5e07a", backgroundColor: "#f0fce8", letterSpacing: "0.04em" }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function PlatformTile({ name, desc, img, span }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ gridColumn: span === 2 ? "span 2" : "span 1", position: "relative", borderRadius: "0.875rem", overflow: "hidden", cursor: "pointer" }}
    >
      <img src={img} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.5s ease", transform: hovered ? "scale(1.07)" : "scale(1)" }} />
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, rgba(0,0,0,${hovered ? 0.75 : 0.4}) 0%, transparent 65%)`, transition: "background 0.35s" }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, backgroundColor: "var(--primary)", transform: hovered ? "scaleX(1)" : "scaleX(0)", transformOrigin: "left", transition: "transform 0.35s ease" }} />
      <div style={{ position: "absolute", bottom: 24, left: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "var(--primary)" }} />
          <span style={{ fontSize: "0.95rem", fontWeight: 700, color: "#fff", letterSpacing: "0.06em", textTransform: "uppercase" }}>{name}</span>
        </div>
        <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.7)", fontWeight: 500, opacity: hovered ? 1 : 0, transform: hovered ? "translateY(0)" : "translateY(6px)", transition: "all 0.3s" }}>{desc}</p>
      </div>
    </div>
  );
}

function ProcessCard({ step, title, desc, img }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: "1rem", overflow: "hidden",
        border: `1px solid ${hovered ? "var(--primary)" : "#e5e7eb"}`,
        boxShadow: hovered ? "0 16px 40px rgba(129,194,63,0.18)" : "0 1px 4px rgba(0,0,0,0.05)",
        transition: "all 0.3s", transform: hovered ? "translateY(-5px)" : "translateY(0)",
        backgroundColor: "#fff",
      }}
    >
      <div style={{ position: "relative", height: 140, overflow: "hidden" }}>
        <img src={img} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s", transform: hovered ? "scale(1.08)" : "scale(1)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)" }} />
        <div style={{ position: "absolute", top: 12, left: 14 }}>
          <div style={{ padding: "3px 10px", borderRadius: "9999px", backgroundColor: hovered ? "var(--primary)" : "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)", transition: "background 0.3s" }}>
            <span style={{ fontSize: "0.7rem", fontWeight: 900, color: hovered ? "#0a0a0a" : "#fff" }}>Step {step}</span>
          </div>
        </div>
      </div>
      <div style={{ padding: "20px 20px 24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
          <div style={{ width: 28, height: 28, borderRadius: "50%", backgroundColor: hovered ? "#e8f7d4" : "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.3s" }}>
            <svg style={{ width: 13, height: 13, color: "var(--primary)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
            </svg>
          </div>
          <h4 style={{ fontSize: "0.98rem", fontWeight: 700, color: "#111" }}>{title}</h4>
        </div>
        <p style={{ fontSize: "0.82rem", color: "#6b7280", lineHeight: 1.65 }}>{desc}</p>
      </div>
    </div>
  );
}

function WhyCard({ stat, label, desc }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "28px 24px", borderRadius: "1rem",
        backgroundColor: hovered ? "var(--primary)" : "#fff",
        border: `1px solid ${hovered ? "var(--primary)" : "#e5e7eb"}`,
        boxShadow: hovered ? "0 16px 40px rgba(129,194,63,0.22)" : "0 1px 4px rgba(0,0,0,0.05)",
        transition: "all 0.3s", transform: hovered ? "translateY(-4px)" : "translateY(0)",
      }}
    >
      <p style={{ fontSize: "2.2rem", fontWeight: 900, color: hovered ? "#fff" : "var(--primary)", marginBottom: 6, lineHeight: 1 }}>{stat}</p>
      <p style={{ fontSize: "0.95rem", fontWeight: 700, color: hovered ? "#fff" : "#111", marginBottom: 10 }}>{label}</p>
      <p style={{ fontSize: "0.83rem", color: hovered ? "rgba(255,255,255,0.82)" : "#6b7280", lineHeight: 1.65 }}>{desc}</p>
    </div>
  );
}

function MagneticButton({ children, href = "#", primary = false }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    ref.current.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.22}px, ${(e.clientY - r.top - r.height / 2) * 0.22}px)`;
  };
  const onLeave = () => { ref.current.style.transform = "translate(0,0)"; };
  return (
    <a ref={ref} href={href} onMouseMove={onMove}
  style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "16px 32px", borderRadius: "var(--radius)", backgroundColor: primary ? "var(--primary)" : "transparent", color: primary ? "#0a0a0a" : "var(--foreground)", border: primary ? "none" : "1px solid var(--border-soft)", fontWeight: 700, fontSize: "1rem", textDecoration: "none", fontFamily: "var(--font-sans)", transition: "box-shadow 0.2s, transform 0.15s ease-out" }}
  onMouseEnter={e => { if (primary) e.currentTarget.style.boxShadow = "0 0 28px rgba(129,194,63,0.45)"; }}
  onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; }}
>
  {children}
  {primary && <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" /></svg>}
</a>
  );
}

function MagneticButtonDark({ children, href = "#" }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    ref.current.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.22}px, ${(e.clientY - r.top - r.height / 2) * 0.22}px)`;
  };
  const onLeave = () => { ref.current.style.transform = "translate(0,0)"; };
  return (
    <a ref={ref} href={href} onMouseMove={onMove}
  style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "15px 28px", borderRadius: "var(--radius)", backgroundColor: "#0a0a0a", color: "#fff", fontWeight: 700, fontSize: "0.95rem", textDecoration: "none", fontFamily: "var(--font-sans)", transition: "opacity 0.2s, transform 0.15s ease-out" }}
  onMouseEnter={e => { e.currentTarget.style.opacity = "0.85"; }}
  onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}
>
  {children}
  <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" /></svg>
</a>
  );
}