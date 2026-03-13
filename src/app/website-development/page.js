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

// ── Services — each has a photo ──
const WEB_SERVICES = [
  {
    number: "01",
    title: "Business Websites",
    body: "Your website's first look creates an instant impact — it must communicate your brand clearly and professionally. We build clean, fast, fully responsive business sites that work for you 24/7 and leave a lasting impression on every visitor.",
    icon: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9",
    tags: ["Corporate Sites", "Landing Pages", "Multi-Page", "SEO-Ready"],
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
  },
  {
    number: "02",
    title: "E-Commerce Stores",
    body: "Sell your products online with a secure, user-friendly store that customers trust. We design and develop e-commerce solutions that are easy to manage yourself — from product listings and payments to order tracking.",
    icon: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z",
    tags: ["Online Store", "Payment Gateway", "Product Management", "Secure Checkout"],
    img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
  },
  {
    number: "03",
    title: "CMS & Self-Managed Sites",
    body: "We believe you should own your website. Every site we build gives you the power to update content, add pages, and manage your business online — no developer needed after handover. Full training included.",
    icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
    tags: ["WordPress", "Self-Managed", "Full Training", "Easy Updates"],
    img: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=800&q=80",
  },
  {
    number: "04",
    title: "UI/UX Design",
    body: "A beautiful website that nobody can use is a wasted investment. Our design process starts with your customers — we craft intuitive, visually striking interfaces that guide visitors towards your goals and convert browsers into buyers.",
    icon: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01",
    tags: ["Wireframing", "Prototyping", "Brand Consistency", "Conversion Focused"],
    img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
  },
  {
    number: "05",
    title: "Website Redesign",
    body: "Is your current site outdated, slow, or losing you business? We analyse what's not working, rebuild it with modern design and performance in mind, and hand it back looking sharper than your competitors'.",
    icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
    tags: ["Performance Audit", "Modern Design", "SEO Migration", "Speed Optimised"],
    img: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&q=80",
  },
  {
    number: "06",
    title: "Website Maintenance & Support",
    body: "Launching is just the beginning. We offer ongoing maintenance plans to keep your site secure, fast, and up to date — so you can focus on running your business while we handle the technical side.",
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    tags: ["Security Updates", "Backups", "Content Updates", "24/7 Support"],
    img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80",
  },
];

// ── Portfolio gallery tiles ──
const GALLERY = [
  { label: "Corporate",    img: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=700&q=80", span: 2 },
  { label: "E-Commerce",  img: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=700&q=80", span: 1 },
  { label: "UI Design",   img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=700&q=80", span: 1 },
  { label: "Mobile-First",img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=700&q=80", span: 1 },
  { label: "Redesign",    img: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=700&q=80", span: 2 },
];

// ── Process steps ──
const PROCESS = [
  { step: "01", title: "Discovery",      desc: "We learn about your business, goals, target audience, and competitors to set the right foundation.", img: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=500&q=80" },
  { step: "02", title: "Design",         desc: "We wireframe and design your site with your brand in mind — sharing mockups before writing a line of code.", img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&q=80" },
  { step: "03", title: "Development",    desc: "We build your site on a solid, fast, and secure codebase — fully responsive across all devices.", img: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=500&q=80" },
  { step: "04", title: "Review & Test",  desc: "You review the live preview. We test every page, form, and link until everything is perfect.", img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&q=80" },
  { step: "05", title: "Launch",         desc: "We deploy your site, configure your domain, and make sure you're live and visible on Google.", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&q=80" },
  { step: "06", title: "Handover",       desc: "Full training on managing your site yourself — plus ongoing support whenever you need us.", img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&q=80" },
];

// ── Why us ──
const WHY = [
  { stat: "#1",    label: "Start-up Friendly Pricing",  desc: "Built for start-up and SMB budgets without cutting corners on quality." },
  { stat: "100%",  label: "Fully Self-Managed",         desc: "Every site hands full control back to you. No dependency on us for basic updates." },
  { stat: "Fast",  label: "Speed Optimised",            desc: "Fast-loading sites rank higher on Google and convert more visitors." },
  { stat: "Top",   label: "Outrank Your Competitors",   desc: "We ensure your site will be more professional — and above competitors in search." },
];

export default function WebDevelopment() {
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
            <div style={{ position: "absolute", top: "-20%", left: "-5%", width: "50%", height: "55%", background: "var(--primary-10)", filter: "blur(140px)", borderRadius: "9999px" }} />
            <div style={{ position: "absolute", bottom: "-10%", right: "0%", width: "35%", height: "40%", background: "var(--primary-05-bg)", filter: "blur(100px)", borderRadius: "9999px" }} />
          </div>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(129,194,63,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(129,194,63,0.04) 1px, transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />

          <div style={{ position: "relative", zIndex: 10, maxWidth: "var(--max-width)", margin: "0 auto", padding: "0 1.5rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }}>
            <div>
              <div ref={introBadgeRef} style={{ opacity: 0, display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 14px", borderRadius: "9999px", border: "1px solid var(--primary-30-border)", backgroundColor: "var(--primary-05-bg)", color: "var(--primary)", fontSize: "0.72rem", fontWeight: 700, marginBottom: 28, letterSpacing: "0.14em", textTransform: "uppercase" }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "var(--primary)", display: "inline-block" }} />
                Website Development
              </div>
              <h1 ref={introH1Ref} style={{ opacity: 0, fontSize: "clamp(2.6rem, 5.5vw, 4.5rem)", fontWeight: 700, lineHeight: 1.07, marginBottom: 24, color: "var(--foreground)" }}>
                Your Online Presence{" "}
                <span style={{ color: "var(--primary)" }}>Starts Here</span>
              </h1>
              <p ref={introParaRef} style={{ opacity: 0, fontSize: "1.1rem", color: "var(--text-muted)", marginBottom: 40, maxWidth: 520, lineHeight: 1.85 }}>
                The first and foremost step towards setting up your online business is having a{" "}
                <strong style={{ color: "var(--foreground)" }}>Professional, User-Friendly and Self-Managed website</strong>. Your website's very first look should create an impact — improving your brand image and communicating your business to the world.
              </p>
              <div ref={introBtnsRef} style={{ opacity: 0, display: "flex", gap: 16, flexWrap: "wrap" }}>
                <MagneticButton primary href="/contact">Let's Meet!</MagneticButton>
                <MagneticButton href="#services">See Our Services</MagneticButton>
              </div>
            </div>

            {/* Hero browser mockup with real image */}
            <div ref={introImgRef} style={{ opacity: 0, position: "relative" }}>
              <div style={{ borderRadius: "1rem", overflow: "hidden", border: "1px solid var(--border-subtle)", boxShadow: "0 32px 64px rgba(0,0,0,0.5)", backgroundColor: "var(--surface)" }}>
                <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--border-subtle)", display: "flex", alignItems: "center", gap: 8, backgroundColor: "rgba(255,255,255,0.03)" }}>
                  <span style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#ff5f57" }} />
                  <span style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#ffbd2e" }} />
                  <span style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#28c940" }} />
                  <div style={{ flex: 1, height: 24, borderRadius: 6, backgroundColor: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", paddingLeft: 10 }}>
                    <span style={{ fontSize: "0.7rem", color: "var(--text-subtle)" }}>cloudccllc.com</span>
                  </div>
                </div>
                <img src="https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80" alt="Website Development" style={{ width: "100%", height: 280, objectFit: "cover", display: "block" }} />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", borderTop: "1px solid var(--border-subtle)" }}>
                  {[{ val: "100%", lbl: "Mobile Ready" }, { val: "Top 3", lbl: "Search Ranking" }, { val: "Fast", lbl: "Load Speed" }].map((s, i) => (
                    <div key={i} style={{ padding: "14px 16px", borderRight: i < 2 ? "1px solid var(--border-subtle)" : "none", textAlign: "center" }}>
                      <p style={{ fontSize: "1rem", fontWeight: 700, color: "var(--primary)", marginBottom: 2 }}>{s.val}</p>
                      <p style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>{s.lbl}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating thumbnail cards — bottom left & top right */}
              
              <div style={{ position: "absolute", top: -22, right: -22, width: 90, height: 90, borderRadius: "50%", overflow: "hidden", border: "3px solid var(--background)", boxShadow: "0 8px 24px rgba(0,0,0,0.4)" }}>
                <img src="https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=300&q=80" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
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
                { icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", text: "Serious professionals for serious businesses" },
                { icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z", text: "Start-up friendly pricing" },
                { icon: "M13 10V3L4 14h7v7l9-11h-7z", text: "One of the best website development companies" },
                { icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z", text: "We help start-ups grow in the digital world" },
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
            SERVICES  (white) — with photos
        ══════════════════════════════════════ */}
        <section id="services" style={{ padding: "6rem 0", backgroundColor: "#ffffff" }}>
          <div style={{ maxWidth: "var(--max-width)", margin: "0 auto", padding: "0 1.5rem" }}>
            <div ref={svcHeadRef} style={{ opacity: 0, textAlign: "center", marginBottom: 64 }}>
              <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--primary)", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 10 }}>What We Build</p>
              <h2 style={{ fontSize: "clamp(1.875rem, 3vw, 2.75rem)", fontWeight: 700, color: "#111", marginBottom: 16 }}>
                Complete Website Development Services
              </h2>
              <p style={{ color: "#555", maxWidth: 560, margin: "0 auto", lineHeight: 1.8 }}>
                Cloud Computing Consultancy delivers professional web design and development. If you're serious about your business, you need serious web professionals to meet — and exceed — your expectations.
              </p>
              <div style={{ width: 72, height: 5, backgroundColor: "var(--primary)", margin: "22px auto 0", borderRadius: 9999 }} />
            </div>

            <div ref={svcCardsRef} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {WEB_SERVICES.map((svc, i) => (
                <ServiceRow key={i} {...svc} reverse={i % 2 !== 0} />
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            PORTFOLIO GALLERY  (dark)
        ══════════════════════════════════════ */}
        <section style={{ padding: "6rem 0", backgroundColor: "var(--background)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(129,194,63,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(129,194,63,0.03) 1px, transparent 1px)", backgroundSize: "50px 50px", pointerEvents: "none" }} />

          <div style={{ position: "relative", zIndex: 10, maxWidth: "var(--max-width)", margin: "0 auto", padding: "0 1.5rem" }}>
            <div ref={galleryHeadRef} style={{ opacity: 0, textAlign: "center", marginBottom: 48 }}>
              <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--primary)", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 10 }}>Our Work</p>
              <h2 style={{ fontSize: "clamp(1.875rem, 3vw, 2.75rem)", fontWeight: 700, color: "var(--foreground)", marginBottom: 14 }}>
                Websites That Make an Impact
              </h2>
              <p style={{ color: "var(--text-muted)", maxWidth: 500, margin: "0 auto", lineHeight: 1.75 }}>
                Every project is full of creative ideas — with visual identities that are well thought out and built to outshine the competition.
              </p>
              <div style={{ width: 72, height: 5, backgroundColor: "var(--primary)", margin: "22px auto 0", borderRadius: 9999 }} />
            </div>

            {/* Gallery grid */}
            <div ref={galleryRef} style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridAutoRows: "260px", gap: 16 }}>
              {GALLERY.map((item, i) => (
                <GalleryTile key={i} {...item} />
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            PROCESS  (light grey) — with photos
        ══════════════════════════════════════ */}
        <section style={{ padding: "6rem 0", backgroundColor: "#f9fafb", borderTop: "1px solid #e5e7eb" }}>
          <div style={{ maxWidth: "var(--max-width)", margin: "0 auto", padding: "0 1.5rem" }}>
            <div ref={processHeadRef} style={{ opacity: 0, textAlign: "center", marginBottom: 56 }}>
              <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--primary)", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 10 }}>How We Work</p>
              <h2 style={{ fontSize: "clamp(1.875rem, 3vw, 2.75rem)", fontWeight: 700, color: "#111", marginBottom: 14 }}>
                Our Website Development Process
              </h2>
              <p style={{ color: "#6b7280", maxWidth: 500, margin: "0 auto", lineHeight: 1.75 }}>
                From first conversation to launch day — a clear, collaborative process with no surprises.
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
            SPLIT IMAGE SECTION  (white)
        ══════════════════════════════════════ */}
        <section style={{ backgroundColor: "#ffffff", borderTop: "1px solid #e5e7eb" }}>
          <div style={{ maxWidth: "var(--max-width)", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr" }}>
            {/* Left — image */}
            <div style={{ position: "relative", minHeight: 480, overflow: "hidden" }}>
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&q=80"
                alt="Our web development team"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
              {/* green overlay tint */}
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(129,194,63,0.35) 0%, transparent 60%)" }} />
              {/* badge */}
              <div style={{ position: "absolute", bottom: 32, left: 32, padding: "14px 20px", borderRadius: "0.75rem", backgroundColor: "rgba(10,10,10,0.85)", backdropFilter: "blur(12px)", border: "1px solid rgba(129,194,63,0.3)" }}>
                <p style={{ fontSize: "1.4rem", fontWeight: 900, color: "var(--primary)", marginBottom: 2 }}>Est. 2004</p>
                <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.7)" }}>20+ years building digital presence</p>
              </div>
            </div>
            {/* Right — text */}
            <div style={{ padding: "5rem 4rem", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--primary)", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 14 }}>Who We Are</p>
              <h2 style={{ fontSize: "clamp(1.75rem, 2.8vw, 2.4rem)", fontWeight: 700, color: "#111", lineHeight: 1.2, marginBottom: 20 }}>
                Serious Web Professionals<br />for Serious Businesses
              </h2>
              <p style={{ color: "#555", lineHeight: 1.85, marginBottom: 20, fontSize: "0.95rem" }}>
                Cloud Computing Consultancy delivers web design and development services built around your goals. If you're serious about your business, you need serious web professionals to meet — and <strong>exceed</strong> — your expectations.
              </p>
              <p style={{ color: "#555", lineHeight: 1.85, marginBottom: 32, fontSize: "0.95rem" }}>
                You can afford our prices — they're designed to be basic for start-up businesses. We help start-ups grow in the Digital World. We are <strong style={{ color: "var(--primary)" }}>One of the Best Website Development Companies</strong> in the UAE.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  "Full handover — you own and manage your own site",
                  "Every design is unique, not a template",
                  "Transparent pricing with no hidden fees",
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
          {/* decorative image strip right side */}
          <div style={{ position: "absolute", top: 0, right: 0, width: "28%", height: "100%", overflow: "hidden", opacity: 0.15 }}>
            <img src="https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&q=80" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div style={{ position: "relative", zIndex: 10, maxWidth: "var(--max-width)", margin: "0 auto", padding: "0 1.5rem", display: "flex", flexWrap: "wrap", gap: 48, alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ flex: 1, minWidth: 260 }}>
              <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "rgba(0,0,0,0.5)", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 12 }}>Beat the competition</p>
              <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "#0a0a0a", lineHeight: 1.15, marginBottom: 20 }}>
                Competitors' sites look<br />more professional?
              </h2>
              <p style={{ color: "rgba(0,0,0,0.72)", fontSize: "1.05rem", lineHeight: 1.8, maxWidth: 520 }}>
                Don't worry — <strong>"Let's Meet!"</strong> Our projects are full of creative ideas with well thought-out visual identities. We ensure your site will be <strong>more professional than your competitors'</strong> and rank above them on search engines.
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
                We Are One of the Best Website<br />Development Companies
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
          {/* background image */}
          <div style={{ position: "absolute", inset: 0 }}>
            <img src="https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=1600&q=80" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.1 }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, var(--background) 0%, transparent 40%, var(--background) 100%)" }} />
          </div>
          <div style={{ position: "relative", zIndex: 10, maxWidth: 720, margin: "0 auto", padding: "0 1.5rem", textAlign: "center" }}>
            <div ref={ctaRef} style={{ opacity: 0 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 14px", borderRadius: "9999px", border: "1px solid var(--primary-30-border)", backgroundColor: "var(--primary-05-bg)", color: "var(--primary)", fontSize: "0.72rem", fontWeight: 700, marginBottom: 24, letterSpacing: "0.14em", textTransform: "uppercase" }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "var(--primary)", display: "inline-block" }} />
                Ready to get started?
              </div>
              <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "var(--foreground)", marginBottom: 20, lineHeight: 1.15 }}>
                Let's Build Your Website
              </h2>
              <p style={{ color: "var(--text-muted)", fontSize: "1.05rem", lineHeight: 1.8, marginBottom: 40 }}>
                We help start-ups and growing businesses establish a powerful digital presence. Professional design, fully self-managed, at prices built for your stage of growth.
              </p>
              <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
                <a href="/contact"
                  style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "16px 36px", backgroundColor: "var(--primary)", color: "#0a0a0a", borderRadius: "var(--radius)", fontWeight: 700, fontSize: "1.05rem", textDecoration: "none", transition: "box-shadow 0.2s, transform 0.15s" }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 0 28px rgba(129,194,63,0.5)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}>
                  Start Your Project
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

// ── Service row — now with photo thumbnail ──
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
        <img
          src={img}
          alt={title}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.5s ease", transform: hovered ? "scale(1.06)" : "scale(1)" }}
        />
        {/* green overlay on hover */}
        <div style={{ position: "absolute", inset: 0, backgroundColor: "var(--primary)", opacity: hovered ? 0.35 : 0, transition: "opacity 0.35s" }} />
        {/* number badge */}
        <div style={{ position: "absolute", top: 14, left: 14, width: 36, height: 36, borderRadius: "50%", backgroundColor: hovered ? "var(--primary)" : "rgba(0,0,0,0.55)", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.3s", backdropFilter: "blur(6px)" }}>
          <span style={{ fontSize: "0.72rem", fontWeight: 900, color: hovered ? "#0a0a0a" : "#fff" }}>{number}</span>
        </div>
        {/* icon badge bottom */}
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

// ── Gallery tile ──
function GalleryTile({ label, img, span }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ gridColumn: span === 2 ? "span 2" : "span 1", position: "relative", borderRadius: "0.875rem", overflow: "hidden", cursor: "pointer" }}
    >
      <img
        src={img} alt={label}
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.5s ease", transform: hovered ? "scale(1.07)" : "scale(1)" }}
      />
      {/* dark overlay */}
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, rgba(0,0,0,${hovered ? 0.7 : 0.35}) 0%, transparent 60%)`, transition: "background 0.35s" }} />
      {/* green top accent bar */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, backgroundColor: "var(--primary)", transform: hovered ? "scaleX(1)" : "scaleX(0)", transformOrigin: "left", transition: "transform 0.35s ease" }} />
      {/* label */}
      <div style={{ position: "absolute", bottom: 20, left: 20, display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "var(--primary)" }} />
        <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#fff", letterSpacing: "0.06em", textTransform: "uppercase" }}>{label}</span>
      </div>
    </div>
  );
}

// ── Process card — now with photo ──
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
        transition: "all 0.3s",
        transform: hovered ? "translateY(-5px)" : "translateY(0)",
        backgroundColor: "#fff",
      }}
    >
      {/* image strip */}
      <div style={{ position: "relative", height: 140, overflow: "hidden" }}>
        <img src={img} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s", transform: hovered ? "scale(1.08)" : "scale(1)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)" }} />
        {/* step number overlay */}
        <div style={{ position: "absolute", top: 12, left: 14, display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ padding: "3px 10px", borderRadius: "9999px", backgroundColor: hovered ? "var(--primary)" : "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)", transition: "background 0.3s" }}>
            <span style={{ fontSize: "0.7rem", fontWeight: 900, color: hovered ? "#0a0a0a" : "#fff" }}>Step {step}</span>
          </div>
        </div>
      </div>
      {/* content */}
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

// ── Why card ──
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