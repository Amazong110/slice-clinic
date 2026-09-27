"use client";

import { useEffect, useState } from "react";
import { PrismicNextLink } from "@prismicio/next";

export default function Header({ brandName, links = [] }) {
  const [open, setOpen] = useState(false);
  const name = brandName || "Northvale Clinic";

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="clinic-nav">
      <div className="clinic-nav__inner">
        <a href="/" className="clinic-nav__brand">
          {name}
        </a>

        <nav className="clinic-nav__links" aria-label="Primary">
          {links.map((item, i) => (
            <PrismicNextLink key={i} field={item.button_link}>
              {item.button_text || "Link"}
            </PrismicNextLink>
          ))}
        </nav>

        <a href="#appoint" className="clinic-btn clinic-btn--primary clinic-nav__cta">
          Book an appointment
        </a>

        <button
          type="button"
          className="clinic-nav__menu"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          {open ? "✕" : "☰"}
        </button>
      </div>

      {open ? (
        <div id="mobile-nav" className="clinic-drawer md:hidden">
          {links.map((item, i) => (
            <PrismicNextLink
              key={i}
              field={item.button_link}
              onClick={() => setOpen(false)}
            >
              {item.button_text || "Link"}
            </PrismicNextLink>
          ))}
          <a
            href="#appoint"
            className="clinic-btn clinic-btn--primary mt-2"
            onClick={() => setOpen(false)}
          >
            Book an appointment
          </a>
        </div>
      ) : null}
    </header>
  );
}
