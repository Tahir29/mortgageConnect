"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks, WaIcon } from "@/lib/helper";
import { Menu, X } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    // Check on mount immediately
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const closeMenu = () => setIsMenuOpen(false);

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <header
        className={isScrolled
          ? "fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-foreground shadow-gold py-3"
          : "fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-transparent py-5"}
        suppressHydrationWarning
      >
        <div className="container-site flex items-center justify-between">

          {/* Logo */}
          <Link href="/" onClick={closeMenu} className="flex items-center gap-3 group shrink-0">
            <div className="relative w-10 h-10 shrink-0">
              <div className="absolute inset-0 rotate-45 rounded-sm border-2 border-accent group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute inset-1.5 rotate-45 rounded-sm bg-accent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="absolute inset-0 flex items-center justify-center text-foreground font-bold text-sm">MC</span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-white font-semibold text-base tracking-wide">Mortgage</span>
              <span className="text-accent text-[11px] tracking-[0.2em] uppercase">Connect</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={isActive(link.href)
                  ? "relative px-4 py-2 text-sm font-medium tracking-wide text-accent after:absolute after:bottom-0 after:left-4 after:right-4 after:h-0.5 after:rounded-full after:bg-accent"
                  : "relative px-4 py-2 text-sm font-medium tracking-wide text-white/80 hover:text-white transition-colors duration-200"}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-white/80 text-sm font-medium hover:border-white/50 hover:text-white transition-all duration-200"
            >
              <WaIcon />
              WhatsApp
            </a>
            <Link
              href="/our-agents"
              className="px-5 py-2.5 rounded-full text-sm font-semibold tracking-wide bg-accent text-foreground hover:bg-brand-gold-light shadow-[0_4px_20px_rgba(201,168,76,0.35)] hover:shadow-[0_4px_28px_rgba(201,168,76,0.55)] transition-all duration-300"
            >
              Find an Agent
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsMenuOpen((v) => !v)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full border border-white/20 text-white hover:border-accent hover:text-accent transition-all duration-200"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Overlay */}
      <div
        onClick={closeMenu}
        aria-hidden="true"
        className={isMenuOpen
          ? "fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden opacity-100 transition-opacity duration-300"
          : "fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden opacity-0 pointer-events-none transition-opacity duration-300"}
      />

      {/* Mobile Drawer */}
      <div
        className={isMenuOpen
          ? "fixed top-0 right-0 bottom-0 z-50 w-75 lg:hidden bg-foreground flex flex-col translate-x-0 transition-transform duration-300 ease-in-out"
          : "fixed top-0 right-0 bottom-0 z-50 w-75 lg:hidden bg-foreground flex flex-col translate-x-full transition-transform duration-300 ease-in-out"}
        suppressHydrationWarning
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <span className="text-white font-semibold text-lg">Menu</span>
          <button
            onClick={closeMenu}
            aria-label="Close menu"
            className="w-9 h-9 flex items-center justify-center rounded-full border border-white/20 text-white hover:border-accent hover:text-accent transition-all duration-200"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex flex-col px-4 py-6 gap-1 flex-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className={isActive(link.href)
                ? "flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium bg-accent/10 text-accent border border-accent/30"
                : "flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 transition-all duration-200"}
            >
              <span className={isActive(link.href)
                ? "w-1.5 h-1.5 rounded-full bg-accent shrink-0"
                : "w-1.5 h-1.5 rounded-full bg-white/20 shrink-0"} />
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="px-4 py-6 border-t border-white/10 flex flex-col gap-3">
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-white/20 text-white text-sm font-medium hover:border-whatsapp hover:text-whatsapp transition-all duration-200"
          >
            <WaIcon />
            WhatsApp Us
          </a>
          <Link
            href="/our-agents"
            onClick={closeMenu}
            className="flex items-center justify-center w-full py-3 rounded-xl text-sm font-semibold bg-accent text-foreground hover:bg-brand-gold-light transition-all duration-200"
          >
            Find an Agent
          </Link>
        </div>
      </div>
    </>
  );
}
