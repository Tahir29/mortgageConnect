import Link from "next/link";
import { navLinks, WaIcon } from "@/lib/helper";
import { MapPin, Phone, Mail, ArrowRight } from "lucide-react";

const emirates = ["Dubai","Abu Dhabi","Sharjah","Ajman","Ras Al Khaimah","Fujairah"];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[#060e1f] text-white">
      <div className="h-px bg-linear-to-r from-transparent via-accent to-transparent opacity-40" />
      <div className="container-site pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">

          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-3 group mb-5 w-fit">
              <div className="relative w-9 h-9 shrink-0">
                <div className="absolute inset-0 rotate-45 rounded-sm border-2 border-accent" />
                <div className="absolute inset-1.25 rotate-45 rounded-sm bg-accent opacity-80" />
                <span className="absolute inset-0 flex items-center justify-center text-[#0A1628] font-bold text-xs">MC</span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-white font-semibold text-sm tracking-wide">Mortgage</span>
                <span className="text-accent text-[10px] tracking-[0.2em] uppercase">Connect</span>
              </div>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed mb-6 max-w-xs">
              Connecting you with verified, commission-free mortgage professionals across the UAE — fast, transparent, and free to use.
            </p>
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-whatsapp/30 text-whatsapp text-xs font-medium hover:bg-whatsapp/10 transition-colors duration-200"
            >
              <WaIcon />
              Chat on WhatsApp
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wide mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="group flex items-center gap-2 text-white/40 text-sm hover:text-accent transition-colors duration-200">
                    <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Emirates */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wide mb-5">Emirates We Cover</h4>
            <ul className="space-y-3">
              {emirates.map((e) => (
                <li key={e} className="flex items-center gap-2 text-white/40 text-sm">
                  <span className="w-1 h-1 rounded-full bg-accent/50 shrink-0" />
                  {e}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wide mb-5">Contact</h4>
            <ul className="space-y-4">
              <li>
                <a href={`tel:${process.env.NEXT_PUBLIC_PHONE}`} className="flex items-start gap-3 text-white/40 text-sm hover:text-white transition-colors duration-200 group">
                  <Phone size={14} className="mt-0.5 shrink-0 text-accent" />
                  +971 50 564 9126
                </a>
              </li>
              <li>
                <a href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`} className="flex items-start gap-3 text-white/40 text-sm hover:text-white transition-colors duration-200 group">
                  <Mail size={14} className="mt-0.5 shrink-0 text-accent" />
                  info@mortgageconnect.ae
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-white/40 text-sm">
                  <MapPin size={14} className="mt-0.5 shrink-0 text-accent" />
                  <span>Floor 2, Office 18, Aspen Commercial Tower, Sheikh Zayed Road, Dubai, UAE</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/25 text-xs">© {year} Mortgage Connect. All rights reserved.</p>
          <div className="flex items-center gap-6">
            {["Privacy Policy","Terms of Use"].map((item) => (
              <Link key={item} href="#" className="text-white/25 text-xs hover:text-white/60 transition-colors duration-200">{item}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
