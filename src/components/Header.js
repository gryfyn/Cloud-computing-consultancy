"use client";
import Image from "next/image";

import next from "next";
import { useState, useRef, use } from "react";

const NAV_LINKS = ["Home", "About", "Contact Us"];

const NETWORK_SERVICES = [
  "IT Cloud Solutions",
  "Wireless Solution",
  "CCTV Surveillance",
  "Firewall Installation",
  "Video Door Phones",
  "Computer / Laptop / Printer Maintenance",
  "Smart Parking Solution",
];

const SOFTWARE_SERVICES = [
  "Website Development",
  "Digital Marketing",
  "Mobile App Development",
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [networkOpen, setNetworkOpen] = useState(false);
  const [softwareOpen, setSoftwareOpen] = useState(false);
  const [mobileNetworkOpen, setMobileNetworkOpen] = useState(false);
  const [mobileSoftwareOpen, setMobileSoftwareOpen] = useState(false);

  // Hover-intent timers — prevent menu snapping shut when the cursor
  // travels from the trigger button into the dropdown panel
  const networkTimer  = useRef(null);
  const softwareTimer = useRef(null);

  const openNetwork   = () => { clearTimeout(networkTimer.current);  setNetworkOpen(true);   };
  const closeNetwork  = () => { networkTimer.current  = setTimeout(() => setNetworkOpen(false),  150); };

  const openSoftware  = () => { clearTimeout(softwareTimer.current); setSoftwareOpen(true);  };
  const closeSoftware = () => { softwareTimer.current = setTimeout(() => setSoftwareOpen(false), 150); };

  return (
    <>
      <style>{`
        .nav-desktop-links { display: flex; }
        .nav-burger { display: none; }
        .nav-mobile-menu { display: none !important; }
        @media (max-width: 767px) {
          .nav-desktop-links { display: none !important; }
          .nav-burger { display: flex !important; }
          .nav-mobile-menu { display: block !important; }
        }
        .dropdown-menu {
          position: absolute;
          top: calc(100% + 8px);
          left: 50%;
          transform: translateX(-50%);
          background: var(--surface);
          border: 1px solid var(--border-soft);
          border-radius: var(--radius);
          box-shadow: 0 8px 24px rgba(0,0,0,0.25);
          min-width: 240px;
          z-index: 100;
          padding: 6px 0;
          animation: ddFadeIn 0.18s ease;
        }
        @keyframes ddFadeIn {
          from { opacity: 0; transform: translateX(-50%) translateY(6px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0);   }
        }
        .dropdown-item {
          display: block;
          padding: 10px 18px;
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--text-nav);
          text-decoration: none;
          white-space: nowrap;
          transition: background 0.15s, color 0.15s;
        }
        .dropdown-item:hover {
          background: var(--primary);
          color: var(--primary-dark);
        }
        .mobile-sub-item {
          display: block;
          padding: 10px 8px 10px 24px;
          font-size: 0.9rem;
          color: var(--text-nav);
          text-decoration: none;
          border-bottom: 1px solid var(--border-subtle);
          transition: color 0.2s;
        }
        .mobile-sub-item:hover { color: var(--primary); }
        .mobile-dropdown-toggle {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          background: none;
          border: none;
          cursor: pointer;
          padding: 12px 8px;
          font-size: 1rem;
          font-weight: 500;
          color: var(--text-nav);
          border-bottom: 1px solid var(--border-subtle);
          text-align: left;
          font-family: var(--font-sans);
        }
        .chevron {
          display: inline-block;
          transition: transform 0.25s;
          font-size: 0.75rem;
        }
      `}</style>

      <nav
        className="glass-effect"
        style={{
          position: "fixed", top: 0, width: "100%", zIndex: 50,
          borderBottom: "1px solid var(--border-soft)",
        }}
      >
        <div style={{ maxWidth: "var(--max-width)", margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", height: "var(--nav-height)", alignItems: "center" }}>

            {/* Logo */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
              <Image
                src="/assets/logocompcon.png"
                alt="Cloud Computing Consultancy"
                style={{ height: 48, width: "auto", objectFit: "contain" }}
                width={70}
                height={48}
              />
              <span style={{ fontWeight: 700, fontSize: "1.25rem", letterSpacing: "-0.025em" }}>
                Cloud Computing <span style={{ color: "var(--primary)" }}>Consultancy</span>
              </span>
            </div>

            {/* Desktop Links */}
            <div className="nav-desktop-links" style={{ gap: 32, alignItems: "center" }}>

              {/* Home */}
              <a
                href="/"
                style={{ fontSize: "0.875rem", fontWeight: 500, color: "var(--text-nav)", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => e.target.style.color = "var(--primary)"}
                onMouseLeave={e => e.target.style.color = "var(--text-nav)"}
              >
                Home
              </a>

              {/* About */}
              <a
                href="/about"
                style={{ fontSize: "0.875rem", fontWeight: 500, color: "var(--text-nav)", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => e.target.style.color = "var(--primary)"}
                onMouseLeave={e => e.target.style.color = "var(--text-nav)"}
              >
                About
              </a>

              {/* ── Network Services Dropdown ── */}
              <div
                style={{ position: "relative" }}
                onMouseEnter={openNetwork}
                onMouseLeave={closeNetwork}
              >
                <button
                  style={{
                    background: "none", border: "none", cursor: "pointer",
                    fontSize: "0.875rem", fontWeight: 500,
                    color: networkOpen ? "var(--primary)" : "var(--text-nav)",
                    display: "flex", alignItems: "center", gap: 5, padding: 0,
                    fontFamily: "var(--font-sans)",
                    transition: "color 0.2s",
                  }}
                >
                  Network Services
                  <span className="chevron" style={{ transform: networkOpen ? "rotate(180deg)" : "none" }}>▾</span>
                </button>

                {networkOpen && (
                  <div
                    className="dropdown-menu"
                    onMouseEnter={openNetwork}
                    onMouseLeave={closeNetwork}
                  >
                    {NETWORK_SERVICES.map((item, i) => (
                      <a
                        key={i}
                        href={`/${item.toLowerCase().replace(/[\s/]+/g, "-")}`}
                        className="dropdown-item"
                      >
                        {item}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* ── Software Services Dropdown ── */}
              <div
                style={{ position: "relative" }}
                onMouseEnter={openSoftware}
                onMouseLeave={closeSoftware}
              >
                <button
                  style={{
                    background: "none", border: "none", cursor: "pointer",
                    fontSize: "0.875rem", fontWeight: 500,
                    color: softwareOpen ? "var(--primary)" : "var(--text-nav)",
                    display: "flex", alignItems: "center", gap: 5, padding: 0,
                    fontFamily: "var(--font-sans)",
                    transition: "color 0.2s",
                  }}
                >
                  Software Services
                  <span className="chevron" style={{ transform: softwareOpen ? "rotate(180deg)" : "none" }}>▾</span>
                </button>

                {softwareOpen && (
                  <div
                    className="dropdown-menu"
                    onMouseEnter={openSoftware}
                    onMouseLeave={closeSoftware}
                  >
                    {SOFTWARE_SERVICES.map((item, i) => (
                      <a
                        key={i}
                        href={`/${item.toLowerCase().replace(/[\s/]+/g, "-")}`}
                        className="dropdown-item"
                      >
                        {item}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* Contact Us */}
              <a
                href="/contact"
                style={{
                  backgroundColor: "var(--primary)", color: "var(--primary-dark)",
                  padding: "10px 24px", borderRadius: "var(--radius)", fontWeight: 700,
                  textDecoration: "none", transition: "all 0.2s", display: "inline-block",
                }}
                onMouseEnter={e => { e.target.style.opacity = "0.9"; e.target.style.transform = "scale(1.05)"; }}
                onMouseLeave={e => { e.target.style.opacity = "1"; e.target.style.transform = "scale(1)"; }}
              >
                Contact Us
              </a>
            </div>

            {/* Burger Button — mobile only */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
              className="nav-burger"
              style={{
                background: "none", border: "none", cursor: "pointer",
                color: "var(--text-nav)", padding: 4,
                flexDirection: "column", justifyContent: "center",
                alignItems: "center", gap: 5, width: 32, height: 32,
              }}
            >
              <span style={{
                display: "block", width: 22, height: 2,
                backgroundColor: "var(--text-nav)", borderRadius: 2,
                transition: "transform 0.3s, opacity 0.3s",
                transform: mobileMenuOpen ? "translateY(7px) rotate(45deg)" : "none",
              }} />
              <span style={{
                display: "block", width: 22, height: 2,
                backgroundColor: "var(--text-nav)", borderRadius: 2,
                transition: "opacity 0.3s",
                opacity: mobileMenuOpen ? 0 : 1,
              }} />
              <span style={{
                display: "block", width: 22, height: 2,
                backgroundColor: "var(--text-nav)", borderRadius: 2,
                transition: "transform 0.3s, opacity 0.3s",
                transform: mobileMenuOpen ? "translateY(-7px) rotate(-45deg)" : "none",
              }} />
            </button>

          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <div
          className="nav-mobile-menu"
          style={{
            overflow: "hidden",
            maxHeight: mobileMenuOpen ? "800px" : "0px",
            transition: "max-height 0.35s ease",
            borderTop: mobileMenuOpen ? "1px solid var(--border-subtle)" : "none",
            backgroundColor: "var(--surface)",
          }}
        >
          <div style={{ padding: "1rem 1.5rem 1.5rem", display: "flex", flexDirection: "column", gap: 4 }}>

            {/* Home */}
            <a href="/" onClick={() => setMobileMenuOpen(false)} className="mobile-sub-item" style={{ paddingLeft: 8 }}>Home</a>

            {/* About */}
            <a href="/about" onClick={() => setMobileMenuOpen(false)} className="mobile-sub-item" style={{ paddingLeft: 8 }}>About</a>

            {/* Network Services */}
            <button
              className="mobile-dropdown-toggle"
              onClick={() => setMobileNetworkOpen(!mobileNetworkOpen)}
            >
              Network Services
              <span className="chevron" style={{ transform: mobileNetworkOpen ? "rotate(180deg)" : "none" }}>▾</span>
            </button>
            <div style={{ overflow: "hidden", maxHeight: mobileNetworkOpen ? "600px" : "0px", transition: "max-height 0.3s ease" }}>
              {NETWORK_SERVICES.map((item, i) => (
                <a
                  key={i}
                  href={`/${item.toLowerCase().replace(/[\s/]+/g, "-")}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="mobile-sub-item"
                >
                  {item}
                </a>
              ))}
            </div>

            {/* Software Services */}
            <button
              className="mobile-dropdown-toggle"
              onClick={() => setMobileSoftwareOpen(!mobileSoftwareOpen)}
            >
              Software Services
              <span className="chevron" style={{ transform: mobileSoftwareOpen ? "rotate(180deg)" : "none" }}>▾</span>
            </button>
            <div style={{ overflow: "hidden", maxHeight: mobileSoftwareOpen ? "200px" : "0px", transition: "max-height 0.3s ease" }}>
              {SOFTWARE_SERVICES.map((item, i) => (
                <a
                  key={i}
                  href={`/${item.toLowerCase().replace(/[\s/]+/g, "-")}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="mobile-sub-item"
                >
                  {item}
                </a>
              ))}
            </div>

            {/* Contact Us */}
            <a
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                marginTop: 12,
                backgroundColor: "var(--primary)", color: "var(--primary-dark)",
                padding: "14px 24px", borderRadius: "var(--radius)", fontWeight: 700,
                textDecoration: "none", textAlign: "center", display: "block",
                fontSize: "1rem",
              }}
            >
              Contact Us
            </a>
          </div>
        </div>

      </nav>
    </>
  );
}