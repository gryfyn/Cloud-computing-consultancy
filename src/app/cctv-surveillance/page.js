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

// ── Camera Types ──
const CAMERA_TYPES = [
  {
    acronym: "Dark",
    name: "Dark Fighter Technology Cameras",
    desc: "Dark Fighter technology can be used day and night and offers optimal performance thanks to its wide range of capabilities. These cameras use specifically designed, nearly ½-inch sensors, yielding better photosensitivity, a high S/N ratio, and increased wide dynamic range — ensuring crystal-clear footage regardless of lighting conditions.",
    icon: "M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z",
    img: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&q=80",
    examples: ["Line Crossing Detection", "Audio Detection", "Face Detection", "High Definition"],
  },
  {
    acronym: "ANPR",
    name: "ANPR / LPR Cameras",
    desc: "Automatic Number Plate Recognition (ANPR) is a surveillance method that uses OCR on images to read license plates on vehicles. It is a specialised type of CCTV camera with built-in software to identify and capture license plates on both stationary and moving vehicles — keeping your premises secure and operations running smoothly.",
    icon: "M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 2h10l2-2v-4M10 5h4l3 3v8",
    img: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80",
    examples: ["Information Storage", "Ban List Detection", "Moving Vehicle Capture", "Smooth Operations"],
  },
  {
    acronym: "Dome",
    name: "Internal & External Dome Cameras",
    desc: "Dome cameras are roof, ceiling, or wall-bracket mounted. The camera unit sits inside a transparent dome that can be tinted to obscure the camera's position. Their shape makes it difficult for onlookers to determine which direction the camera is facing — a strong deterrent that creates an air of uncertainty for would-be criminals.",
    icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
    img: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80",
    examples: ["Easy Installation", "Vandal-Resistant", "IR Night Vision", "Discreet Design"],
  },
  {
    acronym: "C-Mount",
    name: "C-Mount Cameras",
    desc: "A C-mount is a type of lens mount found on 16mm movie cameras, CCTV systems, machine vision cameras, and microscope photo tubes. C-mount lenses provide a male thread that attaches to a female thread on the camera body, allowing simple lens swaps for different applications. Their bulky, noticeable form also serves as a visible deterrent.",
    icon: "M15 10l4.553-2.069A1 1 0 0121 8.82V15.18a1 1 0 01-1.447.89L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z",
    img: "https://images.unsplash.com/photo-1461958508236-9a742665a0d5?w=800&q=80",
    examples: ["Interchangeable Lenses", "Technology Adaptable", "Indoor Effective", "Visible Deterrent"],
  },
  {
    acronym: "D/N",
    name: "Day / Night Cameras",
    desc: "IR day/night cameras are weatherproof with a traditional form factor and cable-managed bracket. Their classic styling makes them an excellent deterrent, signalling to criminals that a building has high-quality CCTV. Designed for mounting, they produce 480/540 TVL images — near DVD quality at 704×576 (4CIF) or 720×576 (D1) resolution — suitable for the highest-alert security areas.",
    icon: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z",
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    examples: ["Colour & B&W Recording", "Infrared Capability", "Weatherproof", "Multiple Sizes"],
  },
];

// ── Benefits ──
const BENEFITS = [
  {
    title: "Full Coverage — Zero Blind Spots",
    body: "Our surveillance systems are engineered for comprehensive site coverage. We survey every angle so nothing goes unmonitored — indoors, outdoors, car parks, entrances, and beyond.",
    icon: "M15 10l4.553-2.069A1 1 0 0121 8.82V15.18a1 1 0 01-1.447.89L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z",
    img: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80",
  },
  {
    title: "Zero Downtime Systems",
    body: "Our surveillance installations are built for reliability. With redundant power, hardened hardware, and proactive monitoring, your CCTV system stays operational when it matters most.",
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&q=80",
  },
  {
    title: "Expert Design & Implementation",
    body: "Our CCTV consultants assess your site conditions and requirements before recommending a system. You get a tailored solution — not an expensive system that doesn't meet your needs.",
    icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80",
  },
  {
    title: "Event & Large-Scale Coverage",
    body: "Larger events attract the risk of mishaps due to their scale. We mitigate those risks with rapidly deployable CCTV solutions that ensure total situational awareness across the entire venue.",
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
    img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
  },
  {
    title: "Reasonable Rates",
    body: "High-quality surveillance shouldn't come at a prohibitive cost. We offer competitive pricing and transparent quotes so you can protect your premises without breaking the budget.",
    icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    img: "https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?w=600&q=80",
  },
  {
    title: "Informed Decisions — No Hard Selling",
    body: "We let our customers make well-informed decisions rather than pushing expensive systems that don't match the requirement. Our consultants educate first and recommend second.",
    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
    img: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&q=80",
  },
];

// ── Gallery ──
const GALLERY = [
  { label: "Site Surveillance",  img: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=700&q=80", span: 2 },
  { label: "Night Vision",       img: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=700&q=80", span: 1 },
  { label: "ANPR Systems",       img: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=700&q=80", span: 1 },
  { label: "Event Security",     img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=700&q=80", span: 2 },
];

// ── Why choose Cloud CompCon ──
const WHY = [
  { stat: "100%", label: "Site Coverage",         desc: "Every corner monitored. We survey your site and design a system that leaves zero blind spots." },
  { stat: "24/7", label: "Zero Downtime",          desc: "Your cameras stay operational around the clock — monitored and maintained for uninterrupted security." },
  { stat: "5+",   label: "Camera Technologies",    desc: "From Dark Fighter to ANPR, Dome to Day/Night — we match the right camera to the right location." },
  { stat: "Fair", label: "Transparent Pricing",    desc: "Reasonable rates, no hidden costs. We recommend only what you need — nothing more, nothing less." },
];

export default function CCTVSurveillance() {
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
            HERO
        ══════════════════════════════════════ */}
        <section style={{ position: "relative", overflow: "hidden", padding: "7rem 0 9rem", backgroundColor: "var(--background)" }}>
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
            <div style={{ position: "absolute", top: "-20%", right: "-5%", width: "50%", height: "55%", background: "var(--primary-10)", filter: "blur(140px)", borderRadius: "9999px" }} />
            <div style={{ position: "absolute", bottom: "-10%", left: "0%", width: "35%", height: "40%", background: "var(--primary-05-bg)", filter: "blur(100px)", borderRadius: "9999px" }} />
          </div>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(129,194,63,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(129,194,63,0.04) 1px, transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />

          <div style={{ position: "relative", zIndex: 10, maxWidth: "var(--max-width)", margin: "0 auto", padding: "0 1.5rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }}>
            {/* Left */}
            <div>
              <div ref={introBadgeRef} style={{ opacity: 0, display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 14px", borderRadius: "9999px", border: "1px solid var(--primary-30-border)", backgroundColor: "var(--primary-05-bg)", color: "var(--primary)", fontSize: "0.72rem", fontWeight: 700, marginBottom: 28, letterSpacing: "0.14em", textTransform: "uppercase" }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "var(--primary)", display: "inline-block" }} />
                Network Services · CCTV Surveillance
              </div>
              <h1 ref={introH1Ref} style={{ opacity: 0, fontSize: "clamp(2.6rem, 5.5vw, 4.5rem)", fontWeight: 700, lineHeight: 1.07, marginBottom: 24, color: "var(--foreground)" }}>
                CCTV Surveillance{" "}
                <span style={{ color: "var(--primary)" }}>You Can Rely On</span>
              </h1>
              <p ref={introParaRef} style={{ opacity: 0, fontSize: "1.1rem", color: "var(--text-muted)", marginBottom: 40, maxWidth: 520, lineHeight: 1.85 }}>
                Larger events and premises attract risk due to their scale. Cloud Computing Consultancy helps mitigate those risks by providing{" "}
                <strong style={{ color: "var(--foreground)" }}>CCTV surveillance at reasonable rates</strong>. Our systems ensure full coverage and zero downtime — because your safety never takes a break.
              </p>
              <div ref={introBtnsRef} style={{ opacity: 0, display: "flex", gap: 16, flexWrap: "wrap" }}>
                <MagneticButton primary href="/contact">Get a Free Assessment</MagneticButton>
                <MagneticButton href="#benefits">See the Benefits</MagneticButton>
              </div>
            </div>

            {/* Right — CCTV visual */}
            <div ref={introImgRef} style={{ opacity: 0, position: "relative" }}>
              <div style={{ borderRadius: "1rem", overflow: "hidden", border: "1px solid var(--border-subtle)", boxShadow: "0 32px 64px rgba(0,0,0,0.5)" }}>
                <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--border-subtle)", display: "flex", alignItems: "center", justifyContent: "space-between", backgroundColor: "rgba(255,255,255,0.03)" }}>
                  <div style={{ display: "flex", gap: 6 }}>
                    <span style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#ff5f57" }} />
                    <span style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#ffbd2e" }} />
                    <span style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#28c940" }} />
                  </div>
                  <span style={{ fontSize: "0.7rem", color: "var(--text-subtle)", fontWeight: 600 }}>Surveillance Control Room</span>
                  <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <span style={{ width: 7, height: 7, borderRadius: "50%", backgroundColor: "var(--primary)", boxShadow: "0 0 6px var(--primary)" }} />
                    <span style={{ fontSize: "0.65rem", color: "var(--primary)", fontWeight: 700 }}>RECORDING</span>
                  </div>
                </div>
                <img
                  src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80"
                  alt="CCTV Surveillance System"
                  style={{ width: "100%", height: 270, objectFit: "cover", display: "block" }}
                />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", borderTop: "1px solid var(--border-subtle)", backgroundColor: "var(--surface)" }}>
                  {[
                    { val: "100%", lbl: "Site Coverage" },
                    { val: "24/7", lbl: "Recording" },
                    { val: "0",    lbl: "Downtime" },
                  ].map((s, i) => (
                    <div key={i} style={{ padding: "14px 10px", borderRight: i < 2 ? "1px solid var(--border-subtle)" : "none", textAlign: "center" }}>
                      <p style={{ fontSize: "0.9rem", fontWeight: 800, color: "var(--primary)", marginBottom: 2 }}>{s.val}</p>
                      <p style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>{s.lbl}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ position: "absolute", top: -22, right: -22, width: 90, height: 90, borderRadius: "50%", overflow: "hidden", border: "3px solid var(--background)", boxShadow: "0 8px 24px rgba(0,0,0,0.4)" }}>
                <img src="https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=300&q=80" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
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
                { icon: "M15 10l4.553-2.069A1 1 0 0121 8.82V15.18a1 1 0 01-1.447.89L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z", text: "Full site coverage — zero blind spots" },
                { icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", text: "Zero downtime — always recording" },
                { icon: "M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z", text: "Day & night — all conditions covered" },
                { icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4", text: "Expert design, consultation & installation" },
              ].map((item, i) => (
                <div key={i}
                  style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "20px 22px", borderRight: i < 3 ? "1px solid #e5e7eb" : "none", backgroundColor: "#fff", transition: "background 0.25s", cursor: "default" }}
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
            WHAT IS CCTV  (white — editorial)
        ══════════════════════════════════════ */}
        <section style={{ backgroundColor: "#ffffff", padding: "6rem 0" }}>
          <div style={{ maxWidth: "var(--max-width)", margin: "0 auto", padding: "0 1.5rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center" }}>
            <div style={{ position: "relative" }}>
              <div style={{ borderRadius: "1rem", overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.12)" }}>
                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=900&q=80" alt="CCTV Design & Implementation" style={{ width: "100%", height: 420, objectFit: "cover", display: "block" }} />
              </div>
              <div style={{ position: "absolute", bottom: -20, right: -20, padding: "16px 22px", borderRadius: "1rem", backgroundColor: "var(--primary)", boxShadow: "0 12px 32px rgba(129,194,63,0.4)" }}>
                <p style={{ fontSize: "1.6rem", fontWeight: 900, color: "#0a0a0a", marginBottom: 2, lineHeight: 1 }}>5</p>
                <p style={{ fontSize: "0.78rem", fontWeight: 700, color: "#0a0a0a" }}>Camera Types</p>
              </div>
              <div style={{ position: "absolute", top: -20, left: -20, padding: "14px 18px", borderRadius: "1rem", backgroundColor: "#0a0a0a", border: "1px solid rgba(129,194,63,0.3)", boxShadow: "0 8px 24px rgba(0,0,0,0.3)" }}>
                <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--primary)", marginBottom: 2 }}>Trusted Nationwide</p>
                <p style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.6)" }}>Several delivered projects</p>
              </div>
            </div>

            <div>
              <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--primary)", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 14 }}>Design & Implementation</p>
              <h2 style={{ fontSize: "clamp(1.75rem, 2.8vw, 2.4rem)", fontWeight: 700, color: "#111", lineHeight: 1.2, marginBottom: 20 }}>
                Never Worry —<br />With Us, You Are Safe
              </h2>
              <p style={{ color: "#555", lineHeight: 1.85, marginBottom: 18, fontSize: "0.95rem" }}>
                Our team has successfully delivered several CCTV design and implementation projects. Our consultants will help you <strong>select the best system aligned with your requirements</strong> and supporting the site conditions in which it will operate.
              </p>
              <p style={{ color: "#555", lineHeight: 1.85, marginBottom: 18, fontSize: "0.95rem" }}>
                We let our customers make a <strong>well-informed decision</strong> rather than buying an expensive system that does not meet their requirements. Your security investment should work for you — not against your budget.
              </p>
              <p style={{ color: "#555", lineHeight: 1.85, marginBottom: 32, fontSize: "0.95rem" }}>
                From single-site installations to large-scale event deployments, Cloud CompCon provides <strong style={{ color: "var(--primary)" }}>surveillance solutions built around your specific needs</strong>.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  "Site survey and system design tailored to your environment",
                  "Honest consultation — we recommend only what you need",
                  "Full installation, configuration and ongoing support included",
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
              <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--primary)", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 10 }}>Why CCTV</p>
              <h2 style={{ fontSize: "clamp(1.875rem, 3vw, 2.75rem)", fontWeight: 700, color: "#111", marginBottom: 16 }}>
                Benefits of Our Surveillance Solutions
              </h2>
              <p style={{ color: "#555", maxWidth: 560, margin: "0 auto", lineHeight: 1.8 }}>
                From deterring criminals to enabling rapid incident response, a professionally designed CCTV system is one of the most valuable investments you can make in your premises.
              </p>
              <div style={{ width: 72, height: 5, backgroundColor: "var(--primary)", margin: "22px auto 0", borderRadius: 9999 }} />
            </div>
            <div ref={benefitRef} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
              {BENEFITS.map((b, i) => <BenefitCard key={i} {...b} />)}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            CAMERA TYPES  (white)
        ══════════════════════════════════════ */}
        <section style={{ padding: "6rem 0", backgroundColor: "#ffffff", borderTop: "1px solid #e5e7eb" }}>
          <div style={{ maxWidth: "var(--max-width)", margin: "0 auto", padding: "0 1.5rem" }}>
            <div ref={modelHeadRef} style={{ opacity: 0, textAlign: "center", marginBottom: 64 }}>
              <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--primary)", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 10 }}>Our Camera Range</p>
              <h2 style={{ fontSize: "clamp(1.875rem, 3vw, 2.75rem)", fontWeight: 700, color: "#111", marginBottom: 16 }}>
                Types of CCTV Cameras We Install
              </h2>
              <p style={{ color: "#555", maxWidth: 560, margin: "0 auto", lineHeight: 1.8 }}>
                We work with a full range of professional surveillance camera technologies — each selected for the specific environment and security requirements of your site.
              </p>
              <div style={{ width: 72, height: 5, backgroundColor: "var(--primary)", margin: "22px auto 0", borderRadius: 9999 }} />
            </div>
            <div ref={modelRef} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {CAMERA_TYPES.map((m, i) => (
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
              <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--primary)", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 10 }}>What We Protect</p>
              <h2 style={{ fontSize: "clamp(1.875rem, 3vw, 2.75rem)", fontWeight: 700, color: "var(--foreground)", marginBottom: 14 }}>
                Enterprise-Grade Surveillance<br />Without the Enterprise Price Tag
              </h2>
              <p style={{ color: "var(--text-muted)", maxWidth: 500, margin: "0 auto", lineHeight: 1.75 }}>
                From corporate premises and retail sites to large public events — we deliver comprehensive surveillance coverage at every scale.
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
            <img src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&q=80" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div style={{ position: "relative", zIndex: 10, maxWidth: "var(--max-width)", margin: "0 auto", padding: "0 1.5rem", display: "flex", flexWrap: "wrap", gap: 48, alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ flex: 1, minWidth: 260 }}>
              <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "rgba(0,0,0,0.5)", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 12 }}>Your Security Partner</p>
              <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "#0a0a0a", lineHeight: 1.15, marginBottom: 20 }}>
                Choosing the right CCTV<br />provider is critical
              </h2>
              <p style={{ color: "rgba(0,0,0,0.72)", fontSize: "1.05rem", lineHeight: 1.8, maxWidth: 520 }}>
                Protecting your premises is one of the most important decisions you will make. Cloud CompCon offers the <strong>expertise, honest consultation, and proven implementation experience</strong> to ensure your surveillance system truly does its job.
              </p>
            </div>
            <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", gap: 14, minWidth: 200 }}>
              <MagneticButtonDark href="/contact">Book a Free Site Assessment</MagneticButtonDark>
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
                Your Partner in Surveillance<br />— Not Just an Installer
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
            <img src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1600&q=80" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.07 }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, var(--background) 0%, transparent 40%, var(--background) 100%)" }} />
          </div>
          <div style={{ position: "relative", zIndex: 10, maxWidth: 720, margin: "0 auto", padding: "0 1.5rem", textAlign: "center" }}>
            <div ref={ctaRef} style={{ opacity: 0 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 14px", borderRadius: "9999px", border: "1px solid var(--primary-30-border)", backgroundColor: "var(--primary-05-bg)", color: "var(--primary)", fontSize: "0.72rem", fontWeight: 700, marginBottom: 24, letterSpacing: "0.14em", textTransform: "uppercase" }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "var(--primary)", display: "inline-block" }} />
                Ready to secure your premises?
              </div>
              <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "var(--foreground)", marginBottom: 20, lineHeight: 1.15 }}>
                Full Coverage. Zero Downtime.<br />Reasonable Rates.
              </h2>
              <p style={{ color: "var(--text-muted)", fontSize: "1.05rem", lineHeight: 1.8, marginBottom: 40 }}>
                Cloud CompCon provides professional CCTV surveillance solutions for homes, businesses, and events. Let our consultants assess your site and design a system that truly meets your needs.
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
// SUBCOMPONENTS
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
          <p style={{ fontSize: "2.4rem", fontWeight: 900, color: hovered ? "#0a0a0a" : "#fff", lineHeight: 1, transition: "color 0.3s", textShadow: hovered ? "none" : "0 2px 12px rgba(0,0,0,0.5)" }}>{acronym}</p>
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
          <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "#9ca3af", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>Key Features</p>
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