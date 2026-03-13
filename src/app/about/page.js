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

const ALL_CLIENTS = [
  "Triplanet International FZC",
  "Robust Contracting Company (LLC)",
  "Dubai Insurance",
  "Yateem Optician",
  "Al Naboodah",
  "Apollo Worldwide",
  "Alshaya Enterprise",
  "Emarat",
  "Lulu Group International",
];

const MARQUEE_CLIENTS = [...ALL_CLIENTS, ...ALL_CLIENTS];

const TIMELINE = [
  { year: "2004", label: "Founded",  desc: "Established as Virgo Computers Consultancy — delivering hardware, networking and IT support." },
  { year: "2010", label: "Growth",   desc: "Expanded our managed services to cover infrastructure, data security and database operations." },
  { year: "2019", label: "Rebrand",  desc: "Renamed to Cloud Computing Consultancy, reflecting our position as a leading cloud service provider." },
  { year: "Now",  label: "Today",    desc: "Serving dozens of SMBs across the UAE with cloud, network, digital marketing, and app development services." },
];

const BELIEFS = [
  {
    icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
    title: "Profitability & Productivity",
    body: "We help different firms become profitable, making each day productive and stress-free by creating a healthy, reliable IT system that simply works.",
    img: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&q=80",
  },
  {
    icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
    title: "Innovation Without Hesitation",
    body: "A healthy working environment means solving problems with innovation, not hesitation. We become a helping hand for the right person at exactly the right time.",
    img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80",
  },
  {
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
    title: "A Team That Thrives",
    body: "Our team prospers on solving your problems and bringing your excitement back. We treat every client engagement as a partnership, not a transaction.",
    img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80",
  },
];

const GALLERY = [
  { label: "Our Office",      img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=700&q=80", span: 1 },
  { label: "Team at Work",    img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=700&q=80", span: 2 },
  { label: "Infrastructure",  img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=700&q=80", span: 2 },
  { label: "Client Meetings", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=700&q=80", span: 1 },
];

const STATS = [
  { val: "20+",  label: "Years of Experience" },
  { val: "50+",  label: "SMBs Served" },
  { val: "UAE",  label: "Headquarters" },
  { val: "360°", label: "IT Coverage" },
];

const TIMELINE_IMGS = [
  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&q=80",
  "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=500&q=80",
  "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500&q=80",
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&q=80",
];

const CLIENT_BG_IMGS = [
  "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=60",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=60",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=60",
  "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=400&q=60",
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&q=60",
  "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&q=60",
  "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&q=60",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&q=60",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=60",
];

export default function About() {
  const heroTagRef      = useRef(null);
  const heroHeadRef     = useRef(null);
  const heroParaRef     = useRef(null);
  const statsRef        = useRef(null);
  const storyRef        = useRef(null);
  const timelineRef     = useRef(null);
  const galleryHeadRef  = useRef(null);
  const galleryRef      = useRef(null);
  const believeHeadRef  = useRef(null);
  const believeCardsRef = useRef(null);
  const clientsHeadRef  = useRef(null);
  const clientGridRef   = useRef(null);

  useGSAP((gsap) => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(heroTagRef.current,  { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5 })
      .fromTo(heroHeadRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.2")
      .fromTo(heroParaRef.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7 }, "-=0.4")
      .fromTo(statsRef.current?.children ?? [], { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.1, duration: 0.6 }, "-=0.3");
  });

  useGSAP((gsap, ST) => {
    gsap.fromTo(storyRef.current?.children ?? [],
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: "power2.out",
        scrollTrigger: { trigger: storyRef.current, start: "top 80%" } });
    gsap.fromTo(timelineRef.current?.children ?? [],
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, stagger: 0.2, duration: 0.7, ease: "power2.out",
        scrollTrigger: { trigger: timelineRef.current, start: "top 80%" } });
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
    gsap.fromTo(believeHeadRef.current, { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power2.out",
        scrollTrigger: { trigger: believeHeadRef.current, start: "top 85%" } });
    gsap.fromTo(believeCardsRef.current?.children ?? [],
      { opacity: 0, y: 50, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, stagger: 0.12, duration: 0.7, ease: "back.out(1.4)",
        scrollTrigger: { trigger: believeCardsRef.current, start: "top 80%" } });
  });

  useGSAP((gsap, ST) => {
    gsap.fromTo(clientsHeadRef.current, { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power2.out",
        scrollTrigger: { trigger: clientsHeadRef.current, start: "top 85%" } });
    gsap.fromTo(clientGridRef.current?.children ?? [],
      { opacity: 0, y: 30, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, stagger: 0.07, duration: 0.55, ease: "back.out(1.3)",
        scrollTrigger: { trigger: clientGridRef.current, start: "top 80%" } });
  });

  return (
    <div style={{ backgroundColor: "var(--background)", color: "var(--foreground)", fontFamily: "var(--font-sans)", minHeight: "100vh" }}>
      <Header />
      <main style={{ paddingTop: "var(--nav-height)" }}>

        {/* ══════════════════════════════════════
            HERO  (dark)
        ══════════════════════════════════════ */}
        <section style={{ position: "relative", overflow: "hidden", padding: "7rem 0 5rem", backgroundColor: "var(--background)" }}>
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
            <div style={{ position: "absolute", top: "-15%", left: "-5%",  width: "45%", height: "50%", background: "var(--primary-10)", filter: "blur(130px)", borderRadius: "9999px" }} />
            <div style={{ position: "absolute", bottom: "-10%", right: "-5%", width: "35%", height: "40%", background: "var(--primary-05-bg)", filter: "blur(100px)", borderRadius: "9999px" }} />
          </div>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(129,194,63,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(129,194,63,0.04) 1px, transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />

          <div style={{ position: "relative", zIndex: 10, maxWidth: "var(--max-width)", margin: "0 auto", padding: "0 1.5rem", textAlign: "center" }}>
            <div ref={heroTagRef} style={{ opacity: 0, display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 14px", borderRadius: "9999px", border: "1px solid var(--primary-30-border)", backgroundColor: "var(--primary-05-bg)", color: "var(--primary)", fontSize: "0.72rem", fontWeight: 700, marginBottom: 28, letterSpacing: "0.14em", textTransform: "uppercase" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "var(--primary)", display: "inline-block" }} />
              Est. 2004 · Renamed 2019
            </div>
            <h1 ref={heroHeadRef} style={{ opacity: 0, fontSize: "clamp(2.8rem, 6vw, 5rem)", fontWeight: 700, lineHeight: 1.05, marginBottom: 28, color: "var(--foreground)" }}>
              Your IT Partner{" "}
              <span style={{ color: "var(--primary)" }}>Since Day One</span>
            </h1>
            <p ref={heroParaRef} style={{ opacity: 0, fontSize: "1.2rem", color: "var(--text-muted)", maxWidth: 680, margin: "0 auto 56px", lineHeight: 1.8 }}>
              Cloudcompcon is your one-stop solution for complete backup support to your business operations — connecting systems, people, and information through an extensive number of channels.
            </p>

            {/* Stats bar */}
            <div ref={statsRef} style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 0, borderRadius: "1rem", border: "1px solid var(--border-subtle)", overflow: "hidden", maxWidth: 720, margin: "0 auto", backgroundColor: "rgba(255,255,255,0.03)", backdropFilter: "blur(8px)" }}>
              {STATS.map((s, i) => (
                <div key={i} style={{ flex: "1 1 120px", padding: "24px 20px", borderRight: i < STATS.length - 1 ? "1px solid var(--border-subtle)" : "none", textAlign: "center" }}>
                  <p style={{ fontSize: "1.8rem", fontWeight: 900, color: "var(--primary)", lineHeight: 1, marginBottom: 6 }}>{s.val}</p>
                  <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 500 }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            STORY + TIMELINE  (white)
        ══════════════════════════════════════ */}
        <section style={{ padding: "6rem 0", backgroundColor: "#ffffff", borderTop: "1px solid #e5e7eb" }}>
          <div style={{ maxWidth: "var(--max-width)", margin: "0 auto", padding: "0 1.5rem" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 64, alignItems: "flex-start" }}>

              {/* Left — story */}
              <div ref={storyRef} style={{ flex: 1, minWidth: 280 }}>
                <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--primary)", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 10 }}>Our Story</p>
                <h2 style={{ fontSize: "clamp(1.75rem, 3vw, 2.3rem)", fontWeight: 700, color: "#111", marginBottom: 24, lineHeight: 1.2 }}>
                  From Virgo Computers to Cloud Computing Consultancy
                </h2>
                <p style={{ color: "#555", lineHeight: 1.85, marginBottom: 20, fontSize: "1rem" }}>
                  Established in <strong style={{ color: "#111" }}>2004</strong> as Virgo Computers Consultancy, we spent 15 years building a reputation for reliable IT support across the region. In <strong style={{ color: "#111" }}>2019</strong>, we rebranded to Cloud Computing Consultancy — a name that better reflects our evolution into a full-spectrum Cloud Computing Service Provider.
                </p>
                <p style={{ color: "#555", lineHeight: 1.85, marginBottom: 20, fontSize: "1rem" }}>
                  Whether you are shifting your existing environment, contemplating new technology, or migrating your existing systems into the cloud, we will help you swiftly steer through the challenges — resulting in enhanced IT productivity, service quality, and an increased end-to-end user experience.
                </p>
                <p style={{ color: "#555", lineHeight: 1.85, marginBottom: 36, fontSize: "1rem" }}>
                  We are not only in networking but also looking forward to designing and developing websites — supporting small businesses to step confidently into the digital city. Today the company serves dozens of small and medium sized businesses, predominantly across the UAE.
                </p>

                {/* Story photo */}
                <div style={{ position: "relative", borderRadius: "1rem", overflow: "hidden", boxShadow: "0 16px 48px rgba(0,0,0,0.1)" }}>
                  <img
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80"
                    alt="Cloud Computing Consultancy Office"
                    style={{ width: "100%", height: 260, objectFit: "cover", display: "block" }}
                  />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(129,194,63,0.3) 0%, transparent 60%)" }} />
                  <div style={{ position: "absolute", bottom: 20, left: 20, padding: "10px 16px", borderRadius: "0.6rem", backgroundColor: "rgba(10,10,10,0.8)", backdropFilter: "blur(8px)", border: "1px solid rgba(129,194,63,0.25)" }}>
                    <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--primary)" }}>Ajman Media City, Dubai</p>
                    <p style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.65)" }}>AMC Boulevard-B Building</p>
                  </div>
                </div>
              </div>

              {/* Right — timeline */}
              <div style={{ flex: "0 0 320px", minWidth: 260 }}>
                <div ref={timelineRef} style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                  {TIMELINE.map((item, i, arr) => (
                    <div key={i} style={{ display: "flex", gap: 20, position: "relative" }}>
                      {i < arr.length - 1 && (
                        <div style={{ position: "absolute", left: 19, top: 40, width: 2, height: "calc(100% - 8px)", backgroundColor: "#e5e7eb" }} />
                      )}
                      <div style={{ flexShrink: 0, width: 40, height: 40, borderRadius: "50%", backgroundColor: item.year === "Now" ? "var(--primary)" : "#e8f7d4", border: `2px solid ${item.year === "Now" ? "var(--primary)" : "#b5e07a"}`, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1 }}>
                        <span style={{ fontSize: "0.6rem", fontWeight: 800, color: item.year === "Now" ? "#fff" : "var(--primary)", letterSpacing: "0.02em" }}>{item.year}</span>
                      </div>
                      <div style={{ paddingBottom: i < arr.length - 1 ? 8 : 0, flex: 1 }}>
                        <p style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--primary)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>{item.label}</p>
                        <p style={{ fontSize: "0.9rem", color: "#555", lineHeight: 1.65, marginBottom: 14 }}>{item.desc}</p>
                        {/* Timeline photo */}
                        <div style={{ borderRadius: "0.75rem", overflow: "hidden", height: 100, marginBottom: i < arr.length - 1 ? 24 : 0 }}>
                          <img
                            src={TIMELINE_IMGS[i]}
                            alt={item.label}
                            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", filter: item.year === "Now" ? "none" : "saturate(0.65)" }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            PHOTO GALLERY  (dark)
        ══════════════════════════════════════ */}
        <section style={{ padding: "6rem 0", backgroundColor: "var(--background)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(129,194,63,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(129,194,63,0.03) 1px, transparent 1px)", backgroundSize: "50px 50px", pointerEvents: "none" }} />
          <div style={{ position: "relative", zIndex: 10, maxWidth: "var(--max-width)", margin: "0 auto", padding: "0 1.5rem" }}>
            <div ref={galleryHeadRef} style={{ opacity: 0, textAlign: "center", marginBottom: 48 }}>
              <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--primary)", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 10 }}>A Glimpse Inside</p>
              <h2 style={{ fontSize: "clamp(1.875rem, 3vw, 2.75rem)", fontWeight: 700, color: "var(--foreground)", marginBottom: 14 }}>
                The People &amp; Places Behind the Work
              </h2>
              <div style={{ width: 72, height: 5, backgroundColor: "var(--primary)", margin: "0 auto", borderRadius: 9999 }} />
            </div>
            <div ref={galleryRef} style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridAutoRows: "260px", gap: 16 }}>
              {GALLERY.map((item, i) => (
                <GalleryTile key={i} {...item} />
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            WE BELIEVE IN  (light grey)
        ══════════════════════════════════════ */}
        <section style={{ padding: "6rem 0", backgroundColor: "#f9fafb", borderTop: "1px solid #e5e7eb" }}>
          <div style={{ maxWidth: "var(--max-width)", margin: "0 auto", padding: "0 1.5rem" }}>
            <div ref={believeHeadRef} style={{ opacity: 0, textAlign: "center", marginBottom: 64 }}>
              <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--primary)", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 10 }}>Our Values</p>
              <h2 style={{ fontSize: "clamp(1.875rem, 3vw, 2.4rem)", fontWeight: 700, color: "#111", marginBottom: 16 }}>We Believe In</h2>
              <p style={{ color: "#555", maxWidth: 560, margin: "0 auto", lineHeight: 1.75 }}>
                We believe in helping firms become profitable, making each day productive and stress-free by creating a healthy IT system. Running a successful business is exciting — IT problems shouldn't slow that down.
              </p>
              <div style={{ width: 72, height: 5, backgroundColor: "var(--primary)", margin: "22px auto 0", borderRadius: 9999 }} />
            </div>
            <div ref={believeCardsRef} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
              {BELIEFS.map((card, i) => <BeliefCard key={i} {...card} />)}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            CLIENTS & PARTNERS  (white)
        ══════════════════════════════════════ */}
        <section style={{ padding: "5rem 0 6rem", backgroundColor: "#ffffff", borderTop: "1px solid #e5e7eb", overflow: "hidden" }}>
          <div style={{ maxWidth: "var(--max-width)", margin: "0 auto", padding: "0 1.5rem" }}>
            <div ref={clientsHeadRef} style={{ opacity: 0, textAlign: "center", marginBottom: 48 }}>
              <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--primary)", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 10 }}>
                Clients &amp; Partners
              </p>
              <h2 style={{ fontSize: "clamp(1.875rem, 3vw, 2.4rem)", fontWeight: 700, color: "#111", marginBottom: 16 }}>
                Trusted by Businesses Across the UAE
              </h2>
              <p style={{ color: "#6b7280", maxWidth: 520, margin: "0 auto", lineHeight: 1.75 }}>
                From insurance and retail to contracting and logistics — organisations across the UAE trust Cloud CompCon to keep their operations running.
              </p>
              <div style={{ width: 72, height: 5, backgroundColor: "var(--primary)", margin: "22px auto 0", borderRadius: 9999 }} />
            </div>

            {/* Client grid */}
            <div ref={clientGridRef} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: 16, marginBottom: 56 }}>
              {ALL_CLIENTS.map((name, i) => (
                <ClientCard key={i} name={name} index={i} />
              ))}
            </div>
          </div>

          {/* Marquee strip */}
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 120, background: "linear-gradient(to right, #ffffff, transparent)", zIndex: 10, pointerEvents: "none" }} />
            <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 120, background: "linear-gradient(to left, #ffffff, transparent)", zIndex: 10, pointerEvents: "none" }} />
            <div style={{ display: "flex", gap: 0, width: "max-content", animation: "marquee 32s linear infinite" }}>
              {MARQUEE_CLIENTS.map((name, i) => (
                <ClientChip key={i} name={name} />
              ))}
            </div>
          </div>

          <style>{`
            @keyframes marquee {
              0%   { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
          `}</style>
        </section>

        {/* ══════════════════════════════════════
            BOTTOM CTA  (dark)
        ══════════════════════════════════════ */}
        <section style={{ position: "relative", overflow: "hidden", padding: "7rem 0", backgroundColor: "var(--background)" }}>
          <div style={{ position: "absolute", inset: 0 }}>
            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&q=80" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.07 }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, var(--background) 0%, transparent 40%, var(--background) 100%)" }} />
          </div>
          <div style={{ position: "relative", zIndex: 10, maxWidth: 720, margin: "0 auto", padding: "0 1.5rem", textAlign: "center" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 14px", borderRadius: "9999px", border: "1px solid var(--primary-30-border)", backgroundColor: "var(--primary-05-bg)", color: "var(--primary)", fontSize: "0.72rem", fontWeight: 700, marginBottom: 24, letterSpacing: "0.14em", textTransform: "uppercase" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "var(--primary)", display: "inline-block" }} />
              Work with us
            </div>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "var(--foreground)", marginBottom: 20, lineHeight: 1.15 }}>
              Let's Build Something Together
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: "1.05rem", lineHeight: 1.8, marginBottom: 40 }}>
              Whether you need cloud solutions, a new website, or a complete IT overhaul — we're the team that shows up, solves it, and keeps you running.
            </p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="/contact"
                style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "16px 36px", backgroundColor: "var(--primary)", color: "#0a0a0a", borderRadius: "var(--radius)", fontWeight: 700, fontSize: "1.05rem", textDecoration: "none", transition: "box-shadow 0.2s, transform 0.15s" }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 0 28px rgba(129,194,63,0.5)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}>
                Get in Touch
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
        </section>

      </main>
      <Footer />
    </div>
  );
}

// ══════════════════════════════════════
// SUBCOMPONENTS
// ══════════════════════════════════════

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

function BeliefCard({ icon, title, body, img }) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef(null);
  const onMove = (e) => {
    const r = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width  - 0.5) * 8;
    const y = ((e.clientY - r.top)  / r.height - 0.5) * 8;
    cardRef.current.style.transform = `perspective(600px) rotateX(${-y}deg) rotateY(${x}deg) scale(1.02)`;
  };
  const onLeave = () => {
    setHovered(false);
    cardRef.current.style.transform = "perspective(600px) rotateX(0) rotateY(0) scale(1)";
  };
  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        borderRadius: "var(--radius)", overflow: "hidden", cursor: "default", willChange: "transform",
        backgroundColor: hovered ? "var(--primary)" : "#ffffff",
        border: `1px solid ${hovered ? "var(--primary)" : "#e5e7eb"}`,
        boxShadow: hovered ? "0 16px 40px rgba(129,194,63,0.22)" : "0 1px 4px rgba(0,0,0,0.06)",
        transition: "background-color 0.3s, border-color 0.3s, box-shadow 0.3s, transform 0.15s ease-out",
      }}
    >
      <div style={{ position: "relative", height: 150, overflow: "hidden" }}>
        <img src={img} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s", transform: hovered ? "scale(1.07)" : "scale(1)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 60%)" }} />
        <div style={{ position: "absolute", bottom: 14, right: 14, width: 40, height: 40, borderRadius: 10, backgroundColor: hovered ? "#0a0a0a" : "rgba(0,0,0,0.55)", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.3s", backdropFilter: "blur(6px)" }}>
          <svg style={{ width: 20, height: 20, color: "var(--primary)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d={icon} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div style={{ padding: "24px 28px 28px" }}>
        <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: 12, color: hovered ? "#fff" : "#111" }}>{title}</h3>
        <p style={{ color: hovered ? "rgba(255,255,255,0.85)" : "#555", lineHeight: 1.75, fontSize: "0.9rem" }}>{body}</p>
      </div>
    </div>
  );
}

function ClientCard({ name, index }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative", overflow: "hidden", borderRadius: "0.875rem",
        border: `1px solid ${hovered ? "var(--primary)" : "#e5e7eb"}`,
        boxShadow: hovered ? "0 12px 32px rgba(129,194,63,0.18)" : "0 1px 4px rgba(0,0,0,0.05)",
        transition: "all 0.3s", transform: hovered ? "translateY(-3px)" : "translateY(0)",
        cursor: "default", minHeight: 110, backgroundColor: "#fff",
      }}
    >
      {/* Subtle bg image texture */}
      <div style={{ position: "absolute", inset: 0 }}>
        <img
          src={CLIENT_BG_IMGS[index % CLIENT_BG_IMGS.length]}
          alt=""
          style={{ width: "100%", height: "100%", objectFit: "cover", opacity: hovered ? 0.12 : 0.05, transition: "opacity 0.3s" }}
        />
      </div>
      {/* Green top accent */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, backgroundColor: "var(--primary)", transform: hovered ? "scaleX(1)" : "scaleX(0)", transformOrigin: "left", transition: "transform 0.3s ease" }} />
      <div style={{ position: "relative", zIndex: 1, padding: "22px 20px", display: "flex", flexDirection: "column", gap: 10 }}>
        {/* Initials badge */}
        <div style={{ width: 38, height: 38, borderRadius: 9, backgroundColor: hovered ? "#e8f7d4" : "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.3s" }}>
          <span style={{ fontSize: "0.78rem", fontWeight: 800, color: "var(--primary)" }}>
            {name.split(" ").slice(0, 2).map(w => w[0]).join("")}
          </span>
        </div>
        <p style={{ fontSize: "0.85rem", fontWeight: 700, color: hovered ? "#111" : "#374151", lineHeight: 1.4, transition: "color 0.2s" }}>{name}</p>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <span style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: "var(--primary)" }} />
          <span style={{ fontSize: "0.68rem", color: "#9ca3af", fontWeight: 500 }}>UAE Partner</span>
        </div>
      </div>
    </div>
  );
}

function ClientChip({ name }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex", alignItems: "center", gap: 12,
        padding: "18px 40px",
        borderRight: "1px solid #e5e7eb",
        cursor: "default", whiteSpace: "nowrap",
        transition: "background 0.25s",
        backgroundColor: hovered ? "#f0fce8" : "transparent",
      }}
    >
      <span style={{ width: 8, height: 8, borderRadius: 2, backgroundColor: "var(--primary)", flexShrink: 0, transform: hovered ? "rotate(225deg)" : "rotate(45deg)", transition: "transform 0.3s" }} />
      <span style={{ fontSize: "1rem", fontWeight: 600, color: hovered ? "var(--primary)" : "#333", transition: "color 0.25s", letterSpacing: "0.01em" }}>
        {name}
      </span>
    </div>
  );
}