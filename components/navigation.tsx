"use client";

import { useEffect, useState } from "react";
import { Close, Menu } from "./icons";
import { ThemeToggle } from "./theme-toggle";

const links = [
  ["Expertise", "#expertise"],
  ["Experience", "#experience"],
  ["Stack", "#stack"],
  ["Credentials", "#credentials"],
];

export function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 16);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <a className="brand" href="#top" aria-label="Ahmed Soliman, home" data-track="navigation.clicked" data-track-target="top"><span>AS</span><b>Ahmed Soliman</b></a>
      <nav className={`nav-links ${open ? "is-open" : ""}`} aria-label="Primary navigation">
        {links.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)} data-track="navigation.clicked" data-track-target={href.slice(1)}>{label}</a>)}
        <a className="nav-cta" href="#contact" onClick={() => setOpen(false)} data-track="contact.clicked" data-track-target="navigation">Let&apos;s talk</a>
      </nav>
      <div className="nav-controls">
        <ThemeToggle />
        <button className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? "Close navigation" : "Open navigation"}>
          {open ? <Close /> : <Menu />}
        </button>
      </div>
    </header>
  );
}
