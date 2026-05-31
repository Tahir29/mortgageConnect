"use client";

import { useState, useEffect } from "react";

export default function WhatsAppFloat() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <a
        href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        style={{
          position: "fixed",
          bottom: "100px",
          right: "32px",
          zIndex: 9999,
          width: "40px",
          height: "40px",
          borderRadius: "9999px",
          backgroundColor: "#25D366",
          display: window.innerWidth >= 1024 ? "none" : "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 24px rgba(37,211,102,0.45)",
          transition: "opacity 0.3s ease, transform 0.3s ease",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          pointerEvents: visible ? "auto" : "none",
          textDecoration: "none",
        }}
      >
        <span
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "9999px",
            backgroundColor: "#25D366",
            animation: "wa-ping 2s cubic-bezier(0,0,0.2,1) infinite",
            opacity: 0.35,
          }}
        />
        <svg
          style={{ width: "20px", height: "20px", color: "#fff", position: "relative", zIndex: 1 }}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.558 4.122 1.532 5.855L.057 23.215a.75.75 0 00.92.921l5.424-1.461A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.699 9.699 0 01-4.951-1.355l-.355-.211-3.678.99.999-3.598-.232-.371A9.699 9.699 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
        </svg>
      </a>

      <style>{`
        @keyframes wa-ping {
          0%   { transform: scale(1);   opacity: 0.35; }
          70%  { transform: scale(1.7); opacity: 0; }
          100% { transform: scale(1.7); opacity: 0; }
        }
      `}</style>
    </>
  );
}
