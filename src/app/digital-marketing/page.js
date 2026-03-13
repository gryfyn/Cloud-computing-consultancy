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
const DM_SERVICES = [
  {
    number: "01",
    title: "Search Engine Optimisation (SEO)",
    body: "Get found on Google. We optimise your website's structure, content and authority so it ranks above your competitors for the keywords your customers are actually searching. Long-term visibility that compounds over time.",
    icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
    tags: ["On-Page SEO", "Technical SEO", "Link Building", "Keyword Research"],
    img: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&q=80",
  },
  {
    number: "02",
    title: "Google Ads & Paid Search (PPC)",
    body: "We run effective paid campaigns on the internet, the aim of which is to increase the visibility of your business and drive targeted traffic that converts. Every dirham is tracked, optimised, and accountable.",
    icon: "M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z",
    tags: ["Google Ads", "PPC Management", "Ad Copywriting", "ROI Tracking"],
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
  },
  {
    number: "03",
    title: "Social Media Marketing",
    body: "Build a following that actually engages with your brand. We manage your social media presence across the platforms that matter to your audience — creating content, running ads, and growing your community.",
    icon: "M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z",
    tags: ["Instagram", "Facebook", "LinkedIn", "Content Creation"],
    img: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80",
  },
  {
    number: "04",
    title: "Content Marketing",
    body: "Our projects are full of creative ideas and well thought-out visual identities. We create blog posts, landing pages, graphics, and videos that position your brand as an authority — and bring the right visitors to your site.",
    icon: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z",
    tags: ["Blog Writing", "Graphic Design", "Video Content", "Email Campaigns"],
    img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80",
  },
  {
    number: "05",
    title: "Analytics & Performance Reporting",
    body: "You can't improve what you don't measure. We set up full tracking across your website and campaigns, then deliver clear monthly reports that show exactly what's working, what isn't, and what we're doing about it.",
    icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
    tags: ["Google Analytics", "Monthly Reports", "Conversion Tracking", "Data Insights"],
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
  },
  {
    number: "06",
    title: "Brand Identity & Creative",
    body: "Before any campaign runs, your brand needs to look the part. We craft logos, colour palettes, typography and brand guidelines that make your business look professional, consistent and credible across every channel.",
    icon: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01",
    tags: ["Logo Design", "Brand Guidelines", "Visual Identity", "Marketing Collateral"],
    img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
  },
];

// ── Gallery ──
const GALLERY = [
  { label: "SEO Campaigns",      img: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=700&q=80", span: 1 },
  { label: "Social Media",       img: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=700&q=80", span: 2 },
  { label: "Google Ads",         img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&q=80", span: 2 },
  { label: "Content & Creative", img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=700&q=80", span: 1 },
];

// ── Process ──
const PROCESS = [
  { step: "01", title: "Discovery & Audit",      desc: "We analyse your current digital presence, competitors, and audience to understand where the opportunities are.", img: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=500&q=80" },
  { step: "02", title: "Strategy",               desc: "We build a tailored digital marketing strategy with clear goals, channels, budget allocation, and timelines.", img: "https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?w=500&q=80" },
  { step: "03", title: "Creative Production",    desc: "We create the ads, content, graphics, and copy — all aligned with your brand and designed to convert.", img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=500&q=80" },
  { step: "04", title: "Launch & Distribute",    desc: "Campaigns go live across your target channels. We monitor every metric from day one.", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&q=80" },
  { step: "05", title: "Optimise",               desc: "We continuously A/B test, adjust bids, refine audiences, and improve content to squeeze out more performance.", img: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=500&q=80" },
  { step: "06", title: "Report & Scale",         desc: "Monthly transparent reports. What worked, what didn't, and the plan to scale what's delivering results.", img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&q=80" },
];

// ── Why us ──
const WHY = [
  { stat: "3mo",  label: "SEO Results Timeline",       desc: "Most clients see measurable organic traffic growth within 3 months of starting our SEO programme." },
  { stat: "ROI",  label: "Every Dirham Tracked",       desc: "We report on every campaign with full transparency — no vague metrics, just clear results against your goals." },
  { stat: "360°", label: "Full-Funnel Coverage",       desc: "From brand awareness to conversion — we cover every stage of the customer journey." },
  { stat: "Top",  label: "Outrank Your Competitors",   desc: "We ensure your digital presence is more visible than your competitors' across search and social." },
];

export default function DigitalMarketing() {
  const introBadgeRef  = useRef(null);
  const introH1Ref     = useRef(null);
  const introParaRef   = useRef(null);
  const introBtnsRef   = useRef(null);
  const introImgRef    = useRef(null);
  const svcHeadRef     = useRef(null);
  const svcCardsRef    = useRef(null);
  const galleryHeadRef = useRef(null);
  const galleryRef     = useRef(null);
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
    gsap.fromTo(galleryHeadRef.current, { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7, scrollTrigger: { trigger: galleryHeadRef.current, start: "top 85%" } });
    gsap.fromTo(galleryRef.current?.children ?? [],
      { opacity: 0, scale: 0.94 },
      { opacity: 1, scale: 1, stagger: 0.08, duration: 0.6, ease: "power2.out",
        scrollTrigger: { trigger: galleryRef.current, start: "top 80%" } });
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
            <div style={{ position: "absolute", top: "-20%", right: "-5%", width: "50%", height: "55%", background: "var(--primary-10)", filter: "blur(140px)", borderRadius: "9999px" }} />
            <div style={{ position: "absolute", bottom: "-10%", left: "0%", width: "35%", height: "40%", background: "var(--primary-05-bg)", filter: "blur(100px)", borderRadius: "9999px" }} />
          </div>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(129,194,63,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(129,194,63,0.04) 1px, transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />

          <div style={{ position: "relative", zIndex: 10, maxWidth: "var(--max-width)", margin: "0 auto", padding: "0 1.5rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }}>
            <div>
              <div ref={introBadgeRef} style={{ opacity: 0, display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 14px", borderRadius: "9999px", border: "1px solid var(--primary-30-border)", backgroundColor: "var(--primary-05-bg)", color: "var(--primary)", fontSize: "0.72rem", fontWeight: 700, marginBottom: 28, letterSpacing: "0.14em", textTransform: "uppercase" }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "var(--primary)", display: "inline-block" }} />
                Digital Marketing
              </div>
              <h1 ref={introH1Ref} style={{ opacity: 0, fontSize: "clamp(2.6rem, 5.5vw, 4.5rem)", fontWeight: 700, lineHeight: 1.07, marginBottom: 24, color: "var(--foreground)" }}>
                Increase Your{" "}
                <span style={{ color: "var(--primary)" }}>Visibility Online</span>
              </h1>
              <p ref={introParaRef} style={{ opacity: 0, fontSize: "1.1rem", color: "var(--text-muted)", marginBottom: 40, maxWidth: 520, lineHeight: 1.85 }}>
                We run <strong style={{ color: "var(--foreground)" }}>effective paid campaigns on the internet</strong>, the aim of which is to increase your visibility and drive targeted traffic. Our projects are full of creative ideas and well thought-out visual identities — built to outshine your competition.
              </p>
              <div ref={introBtnsRef} style={{ opacity: 0, display: "flex", gap: 16, flexWrap: "wrap" }}>
                <MagneticButton primary href="/contact">Start a Campaign</MagneticButton>
                <MagneticButton href="#services">Our Services</MagneticButton>
              </div>
            </div>

            {/* Hero visual — dashboard mockup */}
            <div ref={introImgRef} style={{ opacity: 0, position: "relative" }}>
              <div style={{ borderRadius: "1rem", overflow: "hidden", border: "1px solid var(--border-subtle)", boxShadow: "0 32px 64px rgba(0,0,0,0.5)", backgroundColor: "var(--surface)" }}>
                {/* dashboard header */}
                <div style={{ padding: "14px 20px", borderBottom: "1px solid var(--border-subtle)", display: "flex", alignItems: "center", justifyContent: "space-between", backgroundColor: "rgba(255,255,255,0.03)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#ff5f57" }} />
                    <span style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#ffbd2e" }} />
                    <span style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#28c940" }} />
                  </div>
                  <span style={{ fontSize: "0.7rem", color: "var(--text-subtle)", fontWeight: 600 }}>Campaign Dashboard</span>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ width: 7, height: 7, borderRadius: "50%", backgroundColor: "var(--primary)", boxShadow: "0 0 6px var(--primary)" }} />
                    <span style={{ fontSize: "0.65rem", color: "var(--primary)", fontWeight: 700 }}>LIVE</span>
                  </div>
                </div>
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
                  alt="Digital Marketing Dashboard"
                  style={{ width: "100%", height: 260, objectFit: "cover", display: "block" }}
                />
                {/* metric row */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", borderTop: "1px solid var(--border-subtle)" }}>
                  {[
                    { val: "+142%", lbl: "Traffic" },
                    { val: "3.2×",  lbl: "ROI" },
                    { val: "#1",    lbl: "Google Rank" },
                    { val: "24/7",  lbl: "Monitoring" },
                  ].map((s, i) => (
                    <div key={i} style={{ padding: "12px 10px", borderRight: i < 3 ? "1px solid var(--border-subtle)" : "none", textAlign: "center" }}>
                      <p style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--primary)", marginBottom: 2 }}>{s.val}</p>
                      <p style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>{s.lbl}</p>
                    </div>
                  ))}
                </div>
              </div>
              {/* floating thumbnails */}
              <div style={{ position: "absolute", bottom: -22, left: -22, width: 110, height: 110, borderRadius: "0.75rem", overflow: "hidden", border: "3px solid var(--background)", boxShadow: "0 8px 24px rgba(0,0,0,0.4)" }}>
                <img src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=300&q=80" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ position: "absolute", top: -22, right: -22, width: 90, height: 90, borderRadius: "50%", overflow: "hidden", border: "3px solid var(--background)", boxShadow: "0 8px 24px rgba(0,0,0,0.4)" }}>
                <img src="https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=300&q=80" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
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
                { icon: "M13 10V3L4 14h7v7l9-11h-7z",                                                                                                                                                                                                                       text: "Campaigns that increase visibility fast" },
                { icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", text: "Every dirham tracked and reported" },
                { icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z",                                                                                               text: "Creative ideas with well thought-out identities" },
                { icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",                                                                                                                                                            text: "We help your business rank above competitors" },
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
              <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--primary)", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 10 }}>What We Do</p>
              <h2 style={{ fontSize: "clamp(1.875rem, 3vw, 2.75rem)", fontWeight: 700, color: "#111", marginBottom: 16 }}>
                Complete Digital Marketing Services
              </h2>
              <p style={{ color: "#555", maxWidth: 560, margin: "0 auto", lineHeight: 1.8 }}>
                Looking at competitors' sites and wondering how to get over them? Don't worry — <strong style={{ color: "#111" }}>"Let's Meet!"</strong> We ensure your digital presence will be more professional and more visible than theirs.
              </p>
              <div style={{ width: 72, height: 5, backgroundColor: "var(--primary)", margin: "22px auto 0", borderRadius: 9999 }} />
            </div>

            <div ref={svcCardsRef} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {DM_SERVICES.map((svc, i) => (
                <ServiceRow key={i} {...svc} reverse={i % 2 !== 0} />
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
              <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--primary)", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 10 }}>Channels We Cover</p>
              <h2 style={{ fontSize: "clamp(1.875rem, 3vw, 2.75rem)", fontWeight: 700, color: "var(--foreground)", marginBottom: 14 }}>
                Campaigns That Drive Real Results
              </h2>
              <p style={{ color: "var(--text-muted)", maxWidth: 500, margin: "0 auto", lineHeight: 1.75 }}>
                From search to social — we place your brand exactly where your customers are looking.
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
            PROCESS  (light grey)
        ══════════════════════════════════════ */}
        <section style={{ padding: "6rem 0", backgroundColor: "#f9fafb", borderTop: "1px solid #e5e7eb" }}>
          <div style={{ maxWidth: "var(--max-width)", margin: "0 auto", padding: "0 1.5rem" }}>
            <div ref={processHeadRef} style={{ opacity: 0, textAlign: "center", marginBottom: 56 }}>
              <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--primary)", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 10 }}>How We Work</p>
              <h2 style={{ fontSize: "clamp(1.875rem, 3vw, 2.75rem)", fontWeight: 700, color: "#111", marginBottom: 14 }}>
                Our Digital Marketing Process
              </h2>
              <p style={{ color: "#6b7280", maxWidth: 500, margin: "0 auto", lineHeight: 1.75 }}>
                A clear, results-driven process from strategy to reporting — with full transparency at every step.
              </p>
              <div style={{ width: 72, height: 5, backgroundColor: "var(--primary)", margin: "22px auto 0", borderRadius: 9999 }} />
            </div>
            <div ref={processRef} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
              {PROCESS.map((p, i) => (
                <ProcessCard key={i} {...p} />
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            SPLIT IMAGE  (white)
        ══════════════════════════════════════ */}
        <section style={{ backgroundColor: "#ffffff", borderTop: "1px solid #e5e7eb" }}>
          <div style={{ maxWidth: "var(--max-width)", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr" }}>
            {/* Left — text */}
            <div style={{ padding: "5rem 4rem", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--primary)", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 14 }}>Why Digital Marketing</p>
              <h2 style={{ fontSize: "clamp(1.75rem, 2.8vw, 2.4rem)", fontWeight: 700, color: "#111", lineHeight: 1.2, marginBottom: 20 }}>
                Your Competitors Are<br />Already Online — Are You?
              </h2>
              <p style={{ color: "#555", lineHeight: 1.85, marginBottom: 20, fontSize: "0.95rem" }}>
                Looking at a competitor's site and wondering how to get over them? We run effective paid campaigns on the internet — the aim of which is to <strong>increase your visibility</strong> and put your business in front of the right customers at the right time.
              </p>
              <p style={{ color: "#555", lineHeight: 1.85, marginBottom: 32, fontSize: "0.95rem" }}>
                Our projects are full of creative ideas with well thought-out visual identities. We ensure your digital presence will be <strong style={{ color: "var(--primary)" }}>more professional than your competitors'</strong> — and rank above them.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  "Transparent monthly reports — no black boxes",
                  "Campaigns tailored to your budget and goals",
                  "Creative content that reflects your brand identity",
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
            {/* Right — image */}
            <div style={{ position: "relative", minHeight: 480, overflow: "hidden" }}>
              <img
                src="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=900&q=80"
                alt="Digital Marketing"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(225deg, rgba(129,194,63,0.35) 0%, transparent 60%)" }} />
              <div style={{ position: "absolute", bottom: 32, right: 32, padding: "14px 20px", borderRadius: "0.75rem", backgroundColor: "rgba(10,10,10,0.85)", backdropFilter: "blur(12px)", border: "1px solid rgba(129,194,63,0.3)" }}>
                <p style={{ fontSize: "1.4rem", fontWeight: 900, color: "var(--primary)", marginBottom: 2 }}>+142%</p>
                <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.7)" }}>Average traffic increase in 6 months</p>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            COMPETITOR CHALLENGE  (green)
        ══════════════════════════════════════ */}
        <section style={{ backgroundColor: "var(--primary)", padding: "5rem 0", overflow: "hidden", position: "relative" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px)", backgroundSize: "40px 40px", pointerEvents: "none" }} />
          <div style={{ position: "absolute", top: 0, left: 0, width: "28%", height: "100%", overflow: "hidden", opacity: 0.15 }}>
            <img src="https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=600&q=80" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div style={{ position: "relative", zIndex: 10, maxWidth: "var(--max-width)", margin: "0 auto", padding: "0 1.5rem", display: "flex", flexWrap: "wrap", gap: 48, alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ flex: 1, minWidth: 260 }}>
              <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "rgba(0,0,0,0.5)", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 12 }}>Beat the competition</p>
              <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "#0a0a0a", lineHeight: 1.15, marginBottom: 20 }}>
                Wondering how to<br />outrank your competitors?
              </h2>
              <p style={{ color: "rgba(0,0,0,0.72)", fontSize: "1.05rem", lineHeight: 1.8, maxWidth: 520 }}>
                Don't worry — <strong>"Let's Meet!"</strong> We ensure your digital presence will be more visible, more professional, and more effective than your competitors' — on Google, social media, and everywhere your customers are.
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
                Digital Marketing That<br />Actually Delivers
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
            <img src="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1600&q=80" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.08 }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, var(--background) 0%, transparent 40%, var(--background) 100%)" }} />
          </div>
          <div style={{ position: "relative", zIndex: 10, maxWidth: 720, margin: "0 auto", padding: "0 1.5rem", textAlign: "center" }}>
            <div ref={ctaRef} style={{ opacity: 0 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 14px", borderRadius: "9999px", border: "1px solid var(--primary-30-border)", backgroundColor: "var(--primary-05-bg)", color: "var(--primary)", fontSize: "0.72rem", fontWeight: 700, marginBottom: 24, letterSpacing: "0.14em", textTransform: "uppercase" }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "var(--primary)", display: "inline-block" }} />
                Ready to grow?
              </div>
              <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "var(--foreground)", marginBottom: 20, lineHeight: 1.15 }}>
                Let's Grow Your Business Online
              </h2>
              <p style={{ color: "var(--text-muted)", fontSize: "1.05rem", lineHeight: 1.8, marginBottom: 40 }}>
                Effective campaigns, creative content, and full transparency — all under one roof. Let's meet and build a digital marketing strategy that puts you on top.
              </p>
              <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
                <a href="/contact"
                  style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "16px 36px", backgroundColor: "var(--primary)", color: "#0a0a0a", borderRadius: "var(--radius)", fontWeight: 700, fontSize: "1.05rem", textDecoration: "none", transition: "box-shadow 0.2s, transform 0.15s" }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 0 28px rgba(129,194,63,0.5)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}>
                  Start a Campaign
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
      {/* Photo panel */}
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
      {/* Text */}
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
  onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.opacity = "1"; }}
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