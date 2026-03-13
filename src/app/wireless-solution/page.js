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

// ── WiFi Solution Types ──
const WIFI_TYPES = [
  {
    acronym: "Home",
    name: "Home WiFi Networks",
    desc: "We start by understanding the physical layout of your space and strategically plan a strong home WiFi network that delivers quality with a seamless voice and data experience in the most efficient and cost-effective way. Enjoy a network that never drops, is fully secure, and ensures optimum functioning of all your devices.",
    icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    examples: ["Mesh Networks", "Router Setup", "Signal Boosters", "Parental Controls"],
  },
  {
    acronym: "Office",
    name: "Business & Office WiFi",
    desc: "We design and deploy enterprise-grade wireless networks for offices of all sizes. From single-floor setups to multi-storey buildings, we ensure seamless coverage, secure segmentation for guests and staff, and bandwidth management that keeps your business running at full speed.",
    icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    examples: ["Access Points", "VLAN Setup", "Guest Portals", "Traffic Management"],
  },
  {
    acronym: "Event",
    name: "Event & Venue WiFi",
    desc: "Free WiFi is an additional facility you can offer at any venue. We deploy high-density wireless solutions for exhibitions, conferences, and events — ensuring international delegates, stall owners, and visitors stay connected. WiFi maximises the time patrons spend at your event and makes all operational activities run smoothly.",
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
    img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    examples: ["High-Density APs", "Captive Portals", "Bandwidth Limits", "24/7 Support"],
  },
];

// ── Benefits ──
const BENEFITS = [
  {
    title: "Always-On Connectivity",
    body: "Our installations are engineered for zero dead zones. Every corner of your space gets a reliable, strong signal — so you can work, stream, or collaborate without interruption.",
    icon: "M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0",
    img: "https://images.unsplash.com/photo-1562408590-e32931084e23?w=600&q=80",
  },
  {
    title: "Professional Installation",
    body: "Expect the highest level of professionalism from our certified technicians. We handle cabling, access point placement, and configuration — leaving your space clean and fully connected.",
    icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
    img: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&q=80",
  },
  {
    title: "Fully Secure Networks",
    body: "Security is built in from the ground up. WPA3 encryption, network segmentation, guest isolation, and ongoing monitoring keep your data and devices protected at all times.",
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&q=80",
  },
  {
    title: "Extended Range Coverage",
    body: "We make your WiFi stronger and extend its range. Whether you need to reach a far corner of your home or connect a new office location, we provide solutions that go the distance.",
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
    img: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=600&q=80",
  },
  {
    title: "Great Technical Support",
    body: "Our relationship doesn't end at installation. We offer responsive technical support and customer service to ensure your network continues to perform at its best, every single day.",
    icon: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z",
    img: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&q=80",
  },
  {
    title: "Cost-Effective Solutions",
    body: "We provide reasonably priced WiFi and networking solutions for homes and offices anywhere. Get enterprise-grade performance without the enterprise price tag — tailored exactly to your needs.",
    icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    img: "https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?w=600&q=80",
  },
];

// ── Gallery ──
const GALLERY = [
  { label: "Home Networks",     img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80", span: 2 },
  { label: "Access Points",     img: "https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=700&q=80", span: 1 },
  { label: "Secure WiFi",       img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=700&q=80", span: 1 },
  { label: "Event Connectivity",img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=700&q=80", span: 2 },
];

// ── Why choose Cloud CompCon ──
const WHY = [
  { stat: "MSP",  label: "Managed WiFi Provider",      desc: "We handle installation, configuration, monitoring, and support — so you never have to worry about your network again." },
  { stat: "24/7", label: "Always-On Support",           desc: "Your WiFi network monitored and supported around the clock — any issue is addressed before it affects your day." },
  { stat: "100%", label: "Coverage Guaranteed",         desc: "We survey your space and engineer a solution that eliminates dead zones — every room, every floor, fully covered." },
  { stat: "Fair", label: "Transparent Pricing",         desc: "Reasonably priced solutions for homes and offices. No hidden fees, no surprise charges — just great WiFi at a fair price." },
];

export default function WifiSolutions() {
  const introBadgeRef  = useRef(null);
  const introH1Ref     = useRef(null);
  const introParaRef   = useRef(null);
  const introBtnsRef   = useRef(null);
  const introImgRef    = useRef(null);
  const benefitHeadRef = useRef(null);
  const benefitRef     = useRef(null);
  const modelHeadRef   = useRef(null);
  const modelRef       = useRef(null);
  const galleryHeadRef = useRef(null);
  const galleryRef     = useRef(null);
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

  useGSAP((gsap) => {
    gsap.fromTo(benefitHeadRef.current, { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7, scrollTrigger: { trigger: benefitHeadRef.current, start: "top 85%" } });
    gsap.fromTo(benefitRef.current?.children ?? [],
      { opacity: 0, y: 40, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, stagger: 0.09, duration: 0.65, ease: "back.out(1.3)",
        scrollTrigger: { trigger: benefitRef.current, start: "top 78%" } });
  });

  useGSAP((gsap) => {
    gsap.fromTo(modelHeadRef.current, { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7, scrollTrigger: { trigger: modelHeadRef.current, start: "top 85%" } });
    gsap.fromTo(modelRef.current?.children ?? [],
      { opacity: 0, y: 50, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, stagger: 0.12, duration: 0.7, ease: "back.out(1.4)",
        scrollTrigger: { trigger: modelRef.current, start: "top 78%" } });
  });

  useGSAP((gsap) => {
    gsap.fromTo(galleryHeadRef.current, { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7, scrollTrigger: { trigger: galleryHeadRef.current, start: "top 85%" } });
    gsap.fromTo(galleryRef.current?.children ?? [],
      { opacity: 0, scale: 0.94 },
      { opacity: 1, scale: 1, stagger: 0.08, duration: 0.6, ease: "power2.out",
        scrollTrigger: { trigger: galleryRef.current, start: "top 80%" } });
  });

  useGSAP((gsap) => {
    gsap.fromTo(whyHeadRef.current, { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7, scrollTrigger: { trigger: whyHeadRef.current, start: "top 85%" } });
    gsap.fromTo(whyGridRef.current?.children ?? [],
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.65,
        scrollTrigger: { trigger: whyGridRef.current, start: "top 80%" } });
  });

  useGSAP((gsap) => {
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
            <div style={{ position: "absolute", top: "-20%", right: "-5%", width: "50%", height: "55%", background: "var(--primary-10)", filter: "blur(140px)", borderRadius: "9999px" }} />
            <div style={{ position: "absolute", bottom: "-10%", left: "0%",  width: "35%", height: "40%", background: "var(--primary-05-bg)", filter: "blur(100px)", borderRadius: "9999px" }} />
          </div>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(129,194,63,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(129,194,63,0.04) 1px, transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />

          <div style={{ position: "relative", zIndex: 10, maxWidth: "var(--max-width)", margin: "0 auto", padding: "0 1.5rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }}>
            {/* Left */}
            <div>
              <div ref={introBadgeRef} style={{ opacity: 0, display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 14px", borderRadius: "9999px", border: "1px solid var(--primary-30-border)", backgroundColor: "var(--primary-05-bg)", color: "var(--primary)", fontSize: "0.72rem", fontWeight: 700, marginBottom: 28, letterSpacing: "0.14em", textTransform: "uppercase" }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "var(--primary)", display: "inline-block" }} />
                Network Services · Wireless Solution
              </div>
              <h1 ref={introH1Ref} style={{ opacity: 0, fontSize: "clamp(2.6rem, 5.5vw, 4.5rem)", fontWeight: 700, lineHeight: 1.07, marginBottom: 24, color: "var(--foreground)" }}>
                WiFi Solutions{" "}
                <span style={{ color: "var(--primary)" }}>That Just Work</span>
              </h1>
              <p ref={introParaRef} style={{ opacity: 0, fontSize: "1.1rem", color: "var(--text-muted)", marginBottom: 40, maxWidth: 520, lineHeight: 1.85 }}>
                Welcome to Cloud Computing Consultancy, your trusted{" "}
                <strong style={{ color: "var(--foreground)" }}>WiFi Solutions provider</strong>. We bring everything you'd expect from a professional wireless provider — from highly professional installation to great technical support and customer service — creating a remarkable experience for every user.
              </p>
              <div ref={introBtnsRef} style={{ opacity: 0, display: "flex", gap: 16, flexWrap: "wrap" }}>
                <MagneticButton primary href="/contact">Get a Free Survey</MagneticButton>
                <MagneticButton href="#benefits">See the Benefits</MagneticButton>
              </div>
            </div>

            {/* Right — WiFi visual */}
            <div ref={introImgRef} style={{ opacity: 0, position: "relative" }}>
              <div style={{ borderRadius: "1rem", overflow: "hidden", border: "1px solid var(--border-subtle)", boxShadow: "0 32px 64px rgba(0,0,0,0.5)" }}>
                {/* Top bar */}
                <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--border-subtle)", display: "flex", alignItems: "center", justifyContent: "space-between", backgroundColor: "rgba(255,255,255,0.03)" }}>
                  <div style={{ display: "flex", gap: 6 }}>
                    <span style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#ff5f57" }} />
                    <span style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#ffbd2e" }} />
                    <span style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#28c940" }} />
                  </div>
                  <span style={{ fontSize: "0.7rem", color: "var(--text-subtle)", fontWeight: 600 }}>Wireless Network Dashboard</span>
                  <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <span style={{ width: 7, height: 7, borderRadius: "50%", backgroundColor: "var(--primary)", boxShadow: "0 0 6px var(--primary)" }} />
                    <span style={{ fontSize: "0.65rem", color: "var(--primary)", fontWeight: 700 }}>ONLINE</span>
                  </div>
                </div>
                <img
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
                  alt="WiFi Network Installation"
                  style={{ width: "100%", height: 270, objectFit: "cover", display: "block" }}
                />
                {/* Metrics row */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", borderTop: "1px solid var(--border-subtle)", backgroundColor: "var(--surface)" }}>
                  {[
                    { val: "Home", lbl: "Residential WiFi" },
                    { val: "Biz",  lbl: "Office Networks" },
                    { val: "Event",lbl: "Venue Coverage" },
                  ].map((s, i) => (
                    <div key={i} style={{ padding: "14px 10px", borderRight: i < 2 ? "1px solid var(--border-subtle)" : "none", textAlign: "center" }}>
                      <p style={{ fontSize: "0.9rem", fontWeight: 800, color: "var(--primary)", marginBottom: 2 }}>{s.val}</p>
                      <p style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>{s.lbl}</p>
                    </div>
                  ))}
                </div>
              </div>
              {/* Floating thumbnail */}
              <div style={{ position: "absolute", top: -22, right: -22, width: 90, height: 90, borderRadius: "50%", overflow: "hidden", border: "3px solid var(--background)", boxShadow: "0 8px 24px rgba(0,0,0,0.4)" }}>
                <img src="https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=300&q=80" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
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
                { icon: "M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0", text: "Zero dead zones — full coverage guaranteed" },
                { icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", text: "WPA3 secured — your data stays safe" },
                { icon: "M13 10V3L4 14h7v7l9-11h-7z", text: "Faster speeds, stronger signals" },
                { icon: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z", text: "Professional installation & ongoing support" },
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
            WHY WIFI  (white — editorial)
        ══════════════════════════════════════ */}
        <section style={{ backgroundColor: "#ffffff", padding: "6rem 0" }}>
          <div style={{ maxWidth: "var(--max-width)", margin: "0 auto", padding: "0 1.5rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center" }}>
            {/* Left — image */}
            <div style={{ position: "relative" }}>
              <div style={{ borderRadius: "1rem", overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.12)" }}>
                <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80" alt="Office WiFi" style={{ width: "100%", height: 420, objectFit: "cover", display: "block" }} />
              </div>
              {/* Floating badge */}
              <div style={{ position: "absolute", bottom: -20, right: -20, padding: "16px 22px", borderRadius: "1rem", backgroundColor: "var(--primary)", boxShadow: "0 12px 32px rgba(129,194,63,0.4)" }}>
                <p style={{ fontSize: "1.6rem", fontWeight: 900, color: "#0a0a0a", marginBottom: 2, lineHeight: 1 }}>3</p>
                <p style={{ fontSize: "0.78rem", fontWeight: 700, color: "#0a0a0a" }}>Solution Types</p>
              </div>
              {/* Second floating badge */}
              <div style={{ position: "absolute", top: -20, left: -20, padding: "14px 18px", borderRadius: "1rem", backgroundColor: "#0a0a0a", border: "1px solid rgba(129,194,63,0.3)", boxShadow: "0 8px 24px rgba(0,0,0,0.3)" }}>
                <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--primary)", marginBottom: 2 }}>Trusted WiFi Provider</p>
                <p style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.6)" }}>Homes & Businesses</p>
              </div>
            </div>

            {/* Right — text */}
            <div>
              <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--primary)", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 14 }}>Why WiFi?</p>
              <h2 style={{ fontSize: "clamp(1.75rem, 2.8vw, 2.4rem)", fontWeight: 700, color: "#111", lineHeight: 1.2, marginBottom: 20 }}>
                Designing Efficient and<br />Cost-Effective WiFi Networks
              </h2>
              <p style={{ color: "#555", lineHeight: 1.85, marginBottom: 18, fontSize: "0.95rem" }}>
                Keep the connections to us! Enjoy a WiFi network that <strong>never drops, is fully secure, and ensures optimum functioning of your devices</strong>. We start by understanding the physical layout of your space and strategically plan a network that delivers quality and seamless voice and data experiences.
              </p>
              <p style={{ color: "#555", lineHeight: 1.85, marginBottom: 18, fontSize: "0.95rem" }}>
                In any venue, gaining uninterrupted access to the internet is a pain point for both you and your visitors. <strong>Free WiFi is an additional facility you can offer</strong> — it maximises the time spent by a patron at your event and makes all operational activities run smoothly.
              </p>
              <p style={{ color: "#555", lineHeight: 1.85, marginBottom: 32, fontSize: "0.95rem" }}>
                We provide reasonably priced WiFi and networking solutions for your home and office anywhere. Your WiFi — <strong style={{ color: "var(--primary)" }}>stronger, faster</strong>.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  "Strategic access point placement — no dead zones",
                  "Visitors, delegates & stall owners stay seamlessly connected",
                  "Fully managed — we handle setup, security and support",
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
            BENEFITS  (light grey)
        ══════════════════════════════════════ */}
        <section id="benefits" style={{ padding: "6rem 0", backgroundColor: "#f9fafb", borderTop: "1px solid #e5e7eb" }}>
          <div style={{ maxWidth: "var(--max-width)", margin: "0 auto", padding: "0 1.5rem" }}>
            <div ref={benefitHeadRef} style={{ opacity: 0, textAlign: "center", marginBottom: 56 }}>
              <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--primary)", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 10 }}>Why Choose Us</p>
              <h2 style={{ fontSize: "clamp(1.875rem, 3vw, 2.75rem)", fontWeight: 700, color: "#111", marginBottom: 16 }}>
                Benefits of Our WiFi Solutions
              </h2>
              <p style={{ color: "#555", maxWidth: 560, margin: "0 auto", lineHeight: 1.8 }}>
                From homes to offices to large events, we engineer wireless networks that are fast, secure, and built to last — with the professional support to match.
              </p>
              <div style={{ width: 72, height: 5, backgroundColor: "var(--primary)", margin: "22px auto 0", borderRadius: 9999 }} />
            </div>
            <div ref={benefitRef} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
              {BENEFITS.map((b, i) => <BenefitCard key={i} {...b} />)}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            SOLUTION TYPES  (white)
        ══════════════════════════════════════ */}
        <section style={{ padding: "6rem 0", backgroundColor: "#ffffff", borderTop: "1px solid #e5e7eb" }}>
          <div style={{ maxWidth: "var(--max-width)", margin: "0 auto", padding: "0 1.5rem" }}>
            <div ref={modelHeadRef} style={{ opacity: 0, textAlign: "center", marginBottom: 64 }}>
              <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--primary)", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 10 }}>What We Offer</p>
              <h2 style={{ fontSize: "clamp(1.875rem, 3vw, 2.75rem)", fontWeight: 700, color: "#111", marginBottom: 16 }}>
                WiFi Solutions for Every Environment
              </h2>
              <p style={{ color: "#555", maxWidth: 560, margin: "0 auto", lineHeight: 1.8 }}>
                Whether it's your home, your office, or a large public event — we have a tailored wireless solution designed to keep everyone connected.
              </p>
              <div style={{ width: 72, height: 5, backgroundColor: "var(--primary)", margin: "22px auto 0", borderRadius: 9999 }} />
            </div>
            <div ref={modelRef} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {WIFI_TYPES.map((m, i) => (
                <DeliveryModelRow key={i} {...m} reverse={i % 2 !== 0} />
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            GALLERY  (dark)
        ══════════════════════════════════════ */}
        <section style={{ padding: "6rem 0", backgroundColor: "var(--background)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(129,194,63,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(129,194,63,0.03) 1px, transparent 1px)", backgroundSize: "50px 50px", pointerEvents: "none" }} />
          <div style={{ position: "relative", zIndex: 10, maxWidth: "var(--max-width)", margin: "0 auto", padding: "0 1.5rem" }}>
            <div ref={galleryHeadRef} style={{ opacity: 0, textAlign: "center", marginBottom: 48 }}>
              <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--primary)", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 10 }}>Our Work</p>
              <h2 style={{ fontSize: "clamp(1.875rem, 3vw, 2.75rem)", fontWeight: 700, color: "var(--foreground)", marginBottom: 14 }}>
                Stronger WiFi<br />Everywhere You Need It
              </h2>
              <p style={{ color: "var(--text-muted)", maxWidth: 500, margin: "0 auto", lineHeight: 1.75 }}>
                We make your current WiFi stronger and extend its range — or connect you to the internet in a location you've never had before.
              </p>
              <div style={{ width: 72, height: 5, backgroundColor: "var(--primary)", margin: "22px auto 0", borderRadius: 9999 }} />
            </div>
            <div ref={galleryRef} style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridAutoRows: "260px", gap: 16 }}>
              {GALLERY.map((item, i) => (
                <GalleryTile key={i} {...item} />
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            CTA BANNER  (green)
        ══════════════════════════════════════ */}
        <section style={{ backgroundColor: "var(--primary)", padding: "5rem 0", overflow: "hidden", position: "relative" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px)", backgroundSize: "40px 40px", pointerEvents: "none" }} />
          <div style={{ position: "absolute", top: 0, right: 0, width: "28%", height: "100%", overflow: "hidden", opacity: 0.15 }}>
            <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div style={{ position: "relative", zIndex: 10, maxWidth: "var(--max-width)", margin: "0 auto", padding: "0 1.5rem", display: "flex", flexWrap: "wrap", gap: 48, alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ flex: 1, minWidth: 260 }}>
              <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "rgba(0,0,0,0.5)", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 12 }}>Your WiFi partner</p>
              <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "#0a0a0a", lineHeight: 1.15, marginBottom: 20 }}>
                Choosing the right WiFi<br />provider matters
              </h2>
              <p style={{ color: "rgba(0,0,0,0.72)", fontSize: "1.05rem", lineHeight: 1.8, maxWidth: 520 }}>
                The most trusted WiFi Solutions provider in the region. Cloud CompCon offers the <strong>expertise, professional installation and remarkable customer service</strong> you need to stay connected — wherever you are.
              </p>
            </div>
            <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", gap: 14, minWidth: 200 }}>
              <MagneticButtonDark href="/contact">Book a Free Site Survey</MagneticButtonDark>
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
            WHY CLOUD COMPCON  (white)
        ══════════════════════════════════════ */}
        <section style={{ padding: "6rem 0", backgroundColor: "#ffffff", borderTop: "1px solid #e5e7eb" }}>
          <div style={{ maxWidth: "var(--max-width)", margin: "0 auto", padding: "0 1.5rem" }}>
            <div ref={whyHeadRef} style={{ opacity: 0, textAlign: "center", marginBottom: 56 }}>
              <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--primary)", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 10 }}>Why Cloud CompCon</p>
              <h2 style={{ fontSize: "clamp(1.875rem, 3vw, 2.75rem)", fontWeight: 700, color: "#111", marginBottom: 14 }}>
                Your Partner in WiFi<br />— Not Just an Installer
              </h2>
              <div style={{ width: 72, height: 5, backgroundColor: "var(--primary)", margin: "0 auto", borderRadius: 9999 }} />
            </div>
            <div ref={whyGridRef} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
              {WHY.map((item, i) => <WhyCard key={i} {...item} />)}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            BOTTOM CTA  (dark)
        ══════════════════════════════════════ */}
        <section style={{ position: "relative", overflow: "hidden", padding: "7rem 0", backgroundColor: "var(--background)" }}>
          <div style={{ position: "absolute", inset: 0 }}>
            <img src="https://images.unsplash.com/photo-1562408590-e32931084e23?w=1600&q=80" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.07 }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, var(--background) 0%, transparent 40%, var(--background) 100%)" }} />
          </div>
          <div style={{ position: "relative", zIndex: 10, maxWidth: 720, margin: "0 auto", padding: "0 1.5rem", textAlign: "center" }}>
            <div ref={ctaRef} style={{ opacity: 0 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 14px", borderRadius: "9999px", border: "1px solid var(--primary-30-border)", backgroundColor: "var(--primary-05-bg)", color: "var(--primary)", fontSize: "0.72rem", fontWeight: 700, marginBottom: 24, letterSpacing: "0.14em", textTransform: "uppercase" }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "var(--primary)", display: "inline-block" }} />
                Ready for better WiFi?
              </div>
              <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "var(--foreground)", marginBottom: 20, lineHeight: 1.15 }}>
                Your WiFi — Stronger,<br />Faster, Everywhere
              </h2>
              <p style={{ color: "var(--text-muted)", fontSize: "1.05rem", lineHeight: 1.8, marginBottom: 40 }}>
                Cloud CompCon provides a new — and better — way to stay connected. Whether it's your home, office, or next big event, we engineer the WiFi solution that works for you.
              </p>
              <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
                <a href="/contact"
                  style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "16px 36px", backgroundColor: "var(--primary)", color: "#0a0a0a", borderRadius: "var(--radius)", fontWeight: 700, fontSize: "1.05rem", textDecoration: "none", transition: "box-shadow 0.2s, transform 0.15s" }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 0 28px rgba(129,194,63,0.5)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}>
                  Talk to an Expert
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
// SUBCOMPONENTS (identical structure to ITCloudSolutions)
// ══════════════════════════════════════

function BenefitCard({ title, body, icon, img }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: "1rem", overflow: "hidden",
        border: `1px solid ${hovered ? "var(--primary)" : "#e5e7eb"}`,
        boxShadow: hovered ? "0 16px 40px rgba(129,194,63,0.14)" : "0 1px 4px rgba(0,0,0,0.05)",
        transition: "all 0.3s", transform: hovered ? "translateY(-5px)" : "translateY(0)",
        backgroundColor: "#fff",
      }}
    >
      <div style={{ position: "relative", height: 130, overflow: "hidden" }}>
        <img src={img} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s", transform: hovered ? "scale(1.07)" : "scale(1)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 60%)" }} />
        <div style={{ position: "absolute", bottom: 12, right: 12, width: 36, height: 36, borderRadius: 9, backgroundColor: hovered ? "var(--primary)" : "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.3s", backdropFilter: "blur(6px)" }}>
          <svg style={{ width: 18, height: 18, color: hovered ? "#0a0a0a" : "var(--primary)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d={icon} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div style={{ padding: "20px 20px 24px" }}>
        <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#111", marginBottom: 8, lineHeight: 1.3 }}>{title}</h3>
        <p style={{ fontSize: "0.83rem", color: "#6b7280", lineHeight: 1.7 }}>{body}</p>
      </div>
    </div>
  );
}

function DeliveryModelRow({ acronym, name, desc, icon, img, examples, reverse }) {
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
      <div style={{ flex: "0 0 280px", minHeight: 220, position: "relative", overflow: "hidden" }}>
        <img src={img} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.5s ease", transform: hovered ? "scale(1.06)" : "scale(1)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(0,0,0,0.55) 0%, transparent 60%)" }} />
        <div style={{ position: "absolute", inset: 0, backgroundColor: "var(--primary)", opacity: hovered ? 0.25 : 0, transition: "opacity 0.35s" }} />
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center" }}>
          <p style={{ fontSize: "3rem", fontWeight: 900, color: hovered ? "#0a0a0a" : "#fff", lineHeight: 1, transition: "color 0.3s", textShadow: hovered ? "none" : "0 2px 12px rgba(0,0,0,0.5)" }}>{acronym}</p>
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 260, padding: "32px 36px", backgroundColor: "#fff" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <div style={{ width: 38, height: 38, borderRadius: 10, backgroundColor: "#e8f7d4", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg style={{ width: 20, height: 20, color: "var(--primary)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d={icon} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </div>
          <div>
            <p style={{ fontSize: "0.68rem", fontWeight: 700, color: "var(--primary)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{acronym}</p>
            <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#111", lineHeight: 1.2 }}>{name}</h3>
          </div>
        </div>
        <p style={{ color: "#555", lineHeight: 1.8, marginBottom: 20, fontSize: "0.93rem" }}>{desc}</p>
        <div>
          <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "#9ca3af", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>Includes</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
            {examples.map((ex, i) => (
              <span key={i} style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--primary)", padding: "4px 10px", borderRadius: "9999px", border: "1px solid #b5e07a", backgroundColor: "#f0fce8", letterSpacing: "0.04em" }}>
                {ex}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function GalleryTile({ label, img, span }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ gridColumn: span === 2 ? "span 2" : "span 1", position: "relative", borderRadius: "0.875rem", overflow: "hidden", cursor: "pointer" }}
    >
      <img src={img} alt={label} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.5s ease", transform: hovered ? "scale(1.07)" : "scale(1)" }} />
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, rgba(0,0,0,${hovered ? 0.7 : 0.35}) 0%, transparent 60%)`, transition: "background 0.35s" }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, backgroundColor: "var(--primary)", transform: hovered ? "scaleX(1)" : "scaleX(0)", transformOrigin: "left", transition: "transform 0.35s ease" }} />
      <div style={{ position: "absolute", bottom: 20, left: 20, display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "var(--primary)" }} />
        <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#fff", letterSpacing: "0.06em", textTransform: "uppercase" }}>{label}</span>
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
      <p style={{ fontSize: "2rem", fontWeight: 900, color: hovered ? "#fff" : "var(--primary)", marginBottom: 6, lineHeight: 1 }}>{stat}</p>
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
    <a ref={ref} href={href} onMouseMove={onMove} onMouseLeave={onLeave}
      style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "16px 32px", borderRadius: "var(--radius)", backgroundColor: primary ? "var(--primary)" : "transparent", color: primary ? "#0a0a0a" : "var(--foreground)", border: primary ? "none" : "1px solid var(--border-soft)", fontWeight: 700, fontSize: "1rem", textDecoration: "none", fontFamily: "var(--font-sans)", transition: "box-shadow 0.2s, transform 0.15s ease-out" }}
      onMouseEnter={e => { if (primary) e.currentTarget.style.boxShadow = "0 0 28px rgba(129,194,63,0.45)"; }}
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