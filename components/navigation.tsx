"use client";

import { useEffect, useState } from "react";
import { Close, Menu } from "./icons";

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
      <a className="brand" href="#top" aria-label="Ahmed Soliman, home"><span>AS</span><b>Ahmed Soliman</b></a>
      <nav className={`nav-links ${open ? "is-open" : ""}`} aria-label="Primary navigation">
        {links.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}
        <a className="nav-cta" href="#contact" onClick={() => setOpen(false)}>Let&apos;s talk</a>
      </nav>
      <button className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? "Close navigation" : "Open navigation"}>
        {open ? <Close /> : <Menu />}
      </button>
    </header>
  );
}
